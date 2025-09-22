import { NextRequest, NextResponse } from "next/server";

const IH = process.env.IH_API_BASE!;
const HACKATHON_NAME = process.env.HACKATHON_NAME!;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "");
    const passphrase = String(form.get("passphrase") || "");
    const return_to = String(form.get("return_to") || "/apply-mentor");

    const body = new URLSearchParams({ email, passphrase, return_to }).toString();
    const cookieHeader = req.headers.get("cookie") ?? "";

    const guestConfirmation = cookieHeader
      .split(";")
      .map(c => c.trim())
      .find(c => c.startsWith("guest_confirmation="));

    const beRes = await fetch(`${IH}/guest/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Hackathon-Name": HACKATHON_NAME,
        ...(guestConfirmation ? { Cookie: guestConfirmation } : {}),
      },
      body,
      redirect: "manual",
    });

    if (beRes.status === 401) {
      const { origin } = new URL(req.url);
      const redirectUrl = new URL("/login", origin);
      redirectUrl.searchParams.set("step", "passphrase");
      redirectUrl.searchParams.set("email", email);
      redirectUrl.searchParams.set("return_to", return_to);
      redirectUrl.searchParams.set("error", "invalid");

      return NextResponse.redirect(redirectUrl, 303);
    }

    const setCookie = beRes.headers.get("set-cookie");

    const { origin } = new URL(req.url);
    const redirectUrl = new URL(return_to, origin);

    const res = NextResponse.redirect(redirectUrl, 303);
    if (setCookie) res.headers.set("set-cookie", setCookie);
    return res;
  } catch (err) {
    console.error("Proxy error /api/guest/verify:", err);
    return NextResponse.json({ error: "proxy failed", detail: String(err) }, { status: 500 });
  }
}
