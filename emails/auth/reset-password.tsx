import { Text, Button } from "@react-email/components";
import EmailLayout from "../components/email-layout";
import Footer from "../components/footer";

export default function ResetPasswordEmail({ otp, name }: { otp: string; name: string }) {
  return (
    <EmailLayout>
      <Text className="text-2xl font-bold">Ciao {name}, reimposta la tua password</Text>

      <Text className="text-gray-700 mt-2">
        Hai richiesto il reset della password. Usa il seguente codice OTP per procedere:
      </Text>

      <div className="bg-gray-100 p-4 rounded-md mt-4 text-center">
        <Text className="text-3xl font-mono font-bold tracking-widest text-blue-600">
          {otp}
        </Text>
      </div>

      <Text className="text-gray-500 text-sm mt-6">
        Questo codice scadrà tra 10 minuti. Se non hai richiesto tu il reset, ignora questa email.
      </Text>

      <Footer />
    </EmailLayout>
  );
}
