import { NextResponse } from "next/server";
import { incrementViews } from "@/lib/redis";

export async function POST() {
  try {
    const counts = await incrementViews();
    return NextResponse.json(counts);
  } catch (error) {
    console.error("Failed to increment view counters:", error);
    return NextResponse.json(
      { error: "Failed to increment view counters" },
      { status: 500 }
    );
  }
}
