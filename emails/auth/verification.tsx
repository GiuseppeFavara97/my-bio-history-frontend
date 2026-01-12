import { Text, Button } from "@react-email/components";
import EmailLayout from "../components/email-layout";
import Footer from "../components/footer";

export default function VerificationEmail({ link, name }: { link: string; name: string }) {
  return (
    <EmailLayout>
      <Text className="text-2xl font-bold">Ciao {name}, benvenuto in My Bio History!</Text>

      <Text className="text-gray-700 mt-2">
        Grazie per esserti registrato. Per completare la creazione del tuo account e iniziare a utilizzare la piattaforma, è necessario confermare il tuo indirizzo email.
      </Text>

      <Text className="text-gray-700 mt-2">
        Clicca sul pulsante qui sotto per verificare il tuo account:
      </Text>

      <Button
        href={link}
        className="bg-blue-600 text-white px-5 py-3 rounded-md mt-6 inline-block"
      >
        Conferma la mia Email
      </Button>

      <Text className="text-gray-500 text-sm mt-6">
        Se non hai creato un account su My Bio History, puoi tranquillamente ignorare questa email.
      </Text>

      <Footer />
    </EmailLayout>
  );
}
