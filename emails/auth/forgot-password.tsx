import { Text, Button } from "@react-email/components";
import EmailLayout from "../components/email-layout";
import Footer from "../components/footer";

export default function ForgotPasswordEmail({ token, name }: { token: string; name: string }) {
  const link = `http://localhost:3000/reset-password?token=${token}`;

  return (
    <EmailLayout>
      <Text className="text-2xl font-bold">Ciao {name}, hai dimenticato la password?</Text>

      <Text className="text-gray-700 mt-2">
        Abbiamo ricevuto una richiesta di reimpostazione della password per il tuo account.
        Se non hai richiesto tu la modifica, puoi ignorare questa email.
      </Text>

      <Text className="text-gray-700 mt-2">
        Per procedere con la reimpostazione, clicca il pulsante qui sotto:
      </Text>

      <Button
        href={link}
        className="bg-blue-600 text-white px-5 py-3 rounded-md mt-6 inline-block"
      >
        Reimposta Password
      </Button>

      <Footer />
    </EmailLayout>
  );
}
