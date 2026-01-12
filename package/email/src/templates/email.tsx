import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'jsx-email';

import { emailStyles } from '../styles/email.global';

interface TemplateProps {
  email: string;
  name: string;
}

export const Template = ({ email, name }: TemplateProps) => {
  const safeName = name?.trim() || 'Utente';

  return (
    <Html>
      <Head />
      <Preview>Messaggio importante per {safeName}</Preview>

      <Body style={emailStyles.layout.main}>
        <Container style={emailStyles.layout.container}>
          <Section style={{ ...emailStyles.layout.center, marginBottom: '20px' }}>
            <Img
              src="logo.png"
              width="80"
              alt="My Bio History"
              style={emailStyles.components.logo}
            />
          </Section>

          <Text style={emailStyles.typography.title}>
            My Bio History
          </Text>

          <Text style={emailStyles.typography.paragraph}>
            Ciao {safeName}, questo è un messaggio importante.
          </Text>

          <Hr style={emailStyles.components.divider} />

          <Text style={emailStyles.typography.footer}>
            Contattaci a{' '}
            <Link href={`mailto:${email}`} style={emailStyles.components.link}>
              {email}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
