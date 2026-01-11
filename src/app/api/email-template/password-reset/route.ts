import { render } from "@react-email/render";
import ResetPasswordEmail from "../../../../../emails/auth/reset-password";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const otp = searchParams.get("otp");
  const name = searchParams.get("name");

  if (!otp || !name) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  const html = await render(ResetPasswordEmail({ otp, name }));

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
