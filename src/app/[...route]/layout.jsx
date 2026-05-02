import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function MyLayout({ children, ...props }) {
  return (
    <Section>
      <Container>{children}</Container>
    </Section>
  );
}
