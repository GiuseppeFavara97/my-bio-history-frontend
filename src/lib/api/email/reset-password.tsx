import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import ResetPasswordEmail from "../../../../emails/auth/reset-password";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { otp, name } = req.query;

  if (!otp || typeof otp !== "string" || !name || typeof name !== "string") {
    return res.status(400).json({ error: "Parametri mancanti o non validi" });
  }

  const html = render(<ResetPasswordEmail otp={otp} name={name} />);

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
