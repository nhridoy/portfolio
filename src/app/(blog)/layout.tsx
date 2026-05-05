import { Container } from "@/components/ui/container";
import Header from "@/components/ui/header";

export default function MyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container className="max-w-265">
      <Header />
      {children}
    </Container>
  );
}
