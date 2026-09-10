import Header from "@/components/ui/header";

export default function MyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dark bg-background">
      <div className="theme-container">
        <Header />
        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}
