import { NextResponse } from "next/server";
import { incrementDownloads } from "@/lib/redis";

export async function POST() {
  try {
    const counts = await incrementDownloads();
    return NextResponse.json(counts);
  } catch (error) {
    console.error("Failed to increment download counter:", error);
    return NextResponse.json(
      { error: "Failed to increment download counter" },
      { status: 500 }
    );
  }
}
