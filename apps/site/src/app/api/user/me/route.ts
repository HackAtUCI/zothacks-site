import { NextRequest, NextResponse } from "next/server";

const IH = process.env.IH_API_BASE!;
const HACKATHON_NAME = process.env.HACKATHON_NAME!;

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";

  const beRes = await fetch(`${IH}/user/me`, {
    headers: {
      "X-Hackathon-Name": HACKATHON_NAME,
      "Cookie": cookieHeader,
    },
    credentials: "include",
  });

  const data = await beRes.json();
  return NextResponse.json(data, { status: beRes.status });
}
