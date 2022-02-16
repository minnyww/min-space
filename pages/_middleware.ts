import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const { nextUrl: url, geo } = req as any;

  const country = geo?.country || "TH";
  url.searchParams.set("country", country);

  const isNewUser = JSON.parse(req.cookies["isNewUser"]);
  console.log("isNewUser : ", isNewUser);
  url.searchParams.set("welcomeMsg", isNewUser ? "Welcome!" : "Welcome back!");

  return NextResponse.rewrite(url);
}
