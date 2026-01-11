import { Text } from "@react-email/components";

export default function Footer() {
  return (
    <Text className="text-xs text-gray-500 mt-8 text-center">
      © {new Date().getFullYear()} MyBioHistory — Tutti i diritti riservati.
    </Text>
  );
}
