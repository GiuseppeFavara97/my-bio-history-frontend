import { render } from "@react-email/render";
import ForgotPasswordEmail from "../../../../../emails/auth/forgot-password";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const name = searchParams.get("name");

  if (!token || !name) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  const html = await render(ForgotPasswordEmail({ token, name }));

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
