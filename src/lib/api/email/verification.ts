import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import VerificationEmail from "../../../../emails/auth/verification";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "Token mancante o non valido" });
  }

  const html = render(<VerificationEmail token={token} />);

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
