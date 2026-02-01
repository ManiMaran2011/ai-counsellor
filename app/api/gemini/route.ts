import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // 🔒 SAFE FALLBACK (NO API KEY REQUIRED YET)
  return NextResponse.json({
    text: `This task improves your application strength and increases acceptance probability.`,
  });
}
