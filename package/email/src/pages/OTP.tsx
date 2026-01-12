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

interface OTPTemplateProps {
  email: string;
  name?: string;
  code: string; // il codice OTP
}

export const previewProps: OTPTemplateProps = {
  email: 'utente@gmail.com',
  name: 'Mario Rossi',
  code: '123456',
};

export const templateName = 'otpEmail';

export const OTPTemplate = ({ email, name, code }: OTPTemplateProps) => {
  const safeName = name?.trim() || 'Utente';

  return (
    <Html>
      <Head />
      <Preview>Il tuo codice OTP per My Bio History</Preview>

      <Body style={emailStyles.layout.main}>
        <Container style={emailStyles.layout.container}>
          <Section style={{ ...emailStyles.layout.center, marginBottom: '20px' }}>
            <Img
              src="https://your-logo.png"
              width="80"
              alt="My Bio History"
              style={emailStyles.components.logo}
            />
          </Section>

          <Text style={emailStyles.typography.title}>
            My Bio History – Codice OTP
          </Text>

          <Text style={emailStyles.typography.paragraph}>
            Ciao {safeName},
            <br />
            Il tuo codice OTP per completare l'accesso è:
          </Text>

          <Text
            style={{
              ...emailStyles.typography.title,
              textAlign: 'center',
              fontSize: '24px',
              margin: '16px 0',
              color: emailStyles.colors.primary,
            }}
          >
            {code}
          </Text>

          <Text style={emailStyles.typography.paragraph}>
            Inserisci questo codice nell’app entro pochi minuti.
          </Text>

          <Hr style={emailStyles.components.divider} />

          <Text style={emailStyles.typography.footer}>
            Per assistenza scrivi a{' '}
            <Link
              href={`mailto:${email}`}
              style={emailStyles.components.link}
            >
              {email}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
