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
  Text
} from 'jsx-email';

interface TemplateProps {
  email: string;
  name: string;
}

const BLUE = '#1D7CD3';
const BG = '#244673';
const WHITE = '#ffffff';

const main = {
  backgroundColor: BG,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0'
};

const container = {
  backgroundColor: WHITE,
  margin: '0 auto',
  padding: '32px',
  width: '420px',
  borderRadius: '8px',
  boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
};

const title = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#333',
  textAlign: 'center' as const,
  marginBottom: '16px'
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#333',
  marginBottom: '18px',
  textAlign: 'left' as const
};

const anchor = {
  color: BLUE,
  fontWeight: 600
};

const footer = {
  fontSize: '12px',
  color: '#666',
  marginTop: '24px',
  textAlign: 'center' as const
};

export const previewProps: TemplateProps = {
  email: 'Utente@gmail.com',
  name: 'Dottore'
};

export const templateName = 'email';

export const Template = ({ email, name }: TemplateProps) => (
  <Html>
    <Head />
    <Preview>Messaggio importante per {name}</Preview>

    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Img
            src="https://your-logo.png"
            width="80"
            alt="My Bio History"
            style={{ marginBottom: '12px' }}
          />
        </Section>

        <Text style={title}>My Bio History – Notifica</Text>

        <Text style={paragraph}>
          Ciao {name},<br />
          questo è un aggiornamento riguardante il tuo profilo su
          <strong> My Bio History</strong>.  
          Se non hai richiesto questa operazione puoi ignorare questo messaggio.
        </Text>

        <Text style={paragraph}>
          Link diretto:<br />
          <Link href="https://example.com" style={anchor}>
            https://example.com
          </Link>
        </Text>

        <Hr style={{ margin: '24px 0', borderColor: '#e6ebf1' }} />

        <Text style={footer}>
          Per assistenza scrivi a:{' '}
          <Link href={`mailto:${email}`} style={anchor}>
            {email}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);