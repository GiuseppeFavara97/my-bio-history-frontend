import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import WelcomeEmail from "../../../../emails/auth/welcome";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Parametri mancanti o non validi" });
  }

  const html = render(<WelcomeEmail name={name} />);

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
