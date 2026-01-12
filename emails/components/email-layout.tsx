import { Html, Head, Body, Container } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export default function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 p-6">
          <Container className="bg-white p-8 rounded-xl shadow-lg max-w-lg">
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
