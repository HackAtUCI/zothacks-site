import { NextRequest, NextResponse } from "next/server";

const IH = process.env.IH_API_BASE!; 
const HACKATHON_NAME = process.env.HACKATHON_NAME!;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "");
    const return_to = String(form.get("return_to"));

    const body = new URLSearchParams({ email, return_to });

    const beRes = await fetch(`${IH}/guest/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Hackathon-Name": HACKATHON_NAME, 
      },
      body,
      redirect: "manual",
    });

    const setCookie = beRes.headers.get("set-cookie");

    const { origin } = new URL(req.url);
    const redirectUrl = new URL("/login", origin);
    redirectUrl.searchParams.set("step", "passphrase");
    redirectUrl.searchParams.set("email", email);
    redirectUrl.searchParams.set("return_to", return_to);

    const res = NextResponse.redirect(redirectUrl, 303);
    if (setCookie) res.headers.set("set-cookie", setCookie);
    return res;
  } catch (err) {
    console.error("Proxy error /api/guest/login:", err);
    return NextResponse.json({ error: "proxy failed", detail: String(err) }, { status: 500 });
  }
}
