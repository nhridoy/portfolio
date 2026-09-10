import assert from 'node:assert/strict';
const origin = process.env.TEST_SITE_URL || 'http://localhost:3000';
const paths = ['/', '/blog', '/blog/understanding-react-state-management', '/tags/React'];
for (const path of paths) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  assert.ok(canonical, `Canonical missing: ${path}`);
  assert.ok(new URL(canonical[1]).pathname === path, `Wrong canonical: ${canonical[1]}`);
  assert.ok(html.includes('property="og:title"'), `Open Graph missing: ${path}`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  if (!path.startsWith('/tags/')) assert.ok(graphs.length, `JSON-LD missing: ${path}`);
  if (path === '/') {
    for (const id of ['about', 'experience', 'selected-works', 'contact']) assert.ok(html.includes(`id="${id}"`), `SSR content missing: ${id}`);
    assert.ok(html.includes('toolname="prepare_project_enquiry"'), 'WebMCP form annotation missing');
    assert.ok(html.includes('name="services"'), 'Service parameters missing');
    assert.ok(!html.includes('toolautosubmit'), 'Contact must require review');
  }
  console.log(`PASS ${path}: canonical, metadata, structured data/content`);
}
for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/feed.xml', '/opengraph-image']) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  if (path === '/robots.txt') assert.ok(!(await response.text()).includes('Disallow: /_next/'));
  console.log(`PASS ${path}`);
}

