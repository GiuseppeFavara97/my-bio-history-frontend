import { render } from "@react-email/render";
import VerificationEmail from "../../../../../emails/auth/verification";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const link = searchParams.get("link");
  const name = searchParams.get("name");

  if (!link || !name) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  const html = await render(VerificationEmail({ link, name }));

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
