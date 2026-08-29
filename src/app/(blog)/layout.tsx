import Header from "@/components/ui/header";

export default function MyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dark bg-background">
      <div className="theme-container">
        <Header />
        {children}
      </div>
    </div>
  );
}
