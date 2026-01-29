import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "../../../../emails/auth/forgot-password";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, name } = req.query;

  if (!token || typeof token !== "string" || !name || typeof name !== "string") {
    return res.status(400).json({ error: "Parametri mancanti o non validi" });
  }

  const html = render(<ForgotPasswordEmail token={token} name={name} />);

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
