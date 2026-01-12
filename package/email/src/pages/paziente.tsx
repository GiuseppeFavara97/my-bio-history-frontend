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
  name?: string;
}

export const previewProps: TemplateProps = {
  email: 'utente@gmail.com',
  name: 'Paziente Rossi',
};

export const templateName = 'email';

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
              src="https://your-logo.png"
              width="80"
              alt="My Bio History"
              style={emailStyles.components.logo}
            />
          </Section>

          <Text style={emailStyles.typography.title}>
            My Bio History – Notifica
          </Text>

          <Text style={emailStyles.typography.paragraph}>
            Ciao {safeName},
            <br />
            questo è un aggiornamento riguardante il tuo profilo su
            <strong> My Bio History</strong>.
            <br />
            Se non hai richiesto questa operazione puoi ignorare questo messaggio.
          </Text>

          <Text style={emailStyles.typography.paragraph}>
            Link diretto:
            <br />
            <Link
              href="https://example.com"
              style={emailStyles.components.link}
            >
              https://example.com
            </Link>
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
