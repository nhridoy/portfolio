import { Layout } from "nextra-theme-blog";

export default function MyLayout({ children, ...props }) {
  return (
    <Layout
      sidebar={{ autoCollapse: true }}
      navigation={{ prev: true, next: true }}
    >
      {children}
    </Layout>
  );
}
