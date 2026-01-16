import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import VerificationEmail from "../../../../emails/auth/verification";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { link, name } = req.query;

  if (!link || typeof link !== "string" || !name || typeof name !== "string") {
    return res.status(400).json({ error: "Parametri mancanti o non validi" });
  }

  const html = render(<VerificationEmail link={link} name={name} />);

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
