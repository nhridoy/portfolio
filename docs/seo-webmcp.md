# SEO and WebMCP operations

## Configuration
- `NEXT_PUBLIC_SITE_URL`: canonical production origin (defaults to https://iamnahid.com). Use the same origin in hosting redirects.
- `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`: optional ownership tokens. Obtain these in the respective webmaster consoles.
- `WEBMCP_ORIGIN_TRIAL_TOKEN`: optional Chrome origin-trial token for the production origin. Local testing can use chrome://flags/#enable-webmcp-testing.

## Implemented
- Server-rendered homepage sections, page-specific canonical URLs, concise metadata, Open Graph and Twitter cards with a generated 1200x630 image.
- schema-dts typed Person, WebSite, ProfilePage, BlogPosting, CollectionPage, and BreadcrumbList JSON-LD, safely escaped for script embedding.
- Sitemap covers articles and tag pages; no synthetic last-modified dates. robots.txt allows rendering assets and excludes API endpoints.
- RSS at /feed.xml, llms.txt, English document language, skip link, and a single content H1 on homepage/blog pages.
- Contact WebMCP declarative tool: prepare_project_enquiry. Native named service checkboxes and labelled required fields provide the browser-generated input schema. No toolautosubmit; user reviews the form. Submission requests an email draft, not delivery.

## Verification after deployment
1. Inspect homepage and one article with JavaScript disabled: main content, canonical and JSON-LD should be in the HTML.
2. Fetch /robots.txt, /sitemap.xml, /feed.xml, /llms.txt and /opengraph-image; confirm successful responses and canonical URLs.
3. Run Google Rich Results Test on a published article and Schema.org Validator on the homepage. Schema typing does not guarantee a search rich result.
4. Submit the sitemap to Google Search Console and Bing Webmaster Tools; verify host redirects (HTTP and www variants) at the hosting provider.
5. In Chrome with WebMCP enabled, inspect prepare_project_enquiry and its parameters. Fill dummy fields, verify the schema, then cancel. Do not send test email to the owner.
6. Run PageSpeed on production desktop/mobile. This change does not claim a performance score or ranking improvement.

WebMCP is experimental and requires a compatible enabled browser. llms.txt is an informational convention, not a crawler permission system or ranking guarantee. Third-party embedded forms are owned by their providers. The existing /api/contact endpoint only logs a payload and is not used by the draft form; it is not an email delivery service.
