import { NextResponse } from "next/server";
import { getCounters } from "@/lib/redis";

export async function GET() {
  try {
    const counts = await getCounters();
    return NextResponse.json(counts);
  } catch (error) {
    console.error("Failed to read counters:", error);
    return NextResponse.json(
      { error: "Failed to read counters" },
      { status: 500 }
    );
  }
}
