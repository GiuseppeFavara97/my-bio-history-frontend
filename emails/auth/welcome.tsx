import { Text } from "@react-email/components";
import EmailLayout from "../components/email-layout";
import Footer from "../components/footer";

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <EmailLayout>
      <Text className="text-2xl font-bold">Benvenuto {name}!</Text>

      <Text className="text-gray-700 mt-2">
        Il tuo account è stato verificato con successo. Siamo felici di averti con noi.
      </Text>

      <Footer />
    </EmailLayout>
  );
}
