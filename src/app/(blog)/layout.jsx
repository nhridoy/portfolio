import { Container } from "@/components/ui/container";
import Header from "@/components/ui/header";

export default function MyLayout({ children }) {
  return (
    <Container className="max-w-265">
      <Header />
      {children}
    </Container>
  );
}
