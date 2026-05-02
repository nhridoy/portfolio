import { Container } from "@/components/ui/container";

export default function MyLayout({ children }) {
  return <Container className="max-w-265">{children}</Container>;
}
