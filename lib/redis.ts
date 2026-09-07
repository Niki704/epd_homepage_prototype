import { Redis } from "@upstash/redis";

// The ONE real backend touchpoint in this project (see 03-architecture.md).
// Everything else is hardcoded/static. Requires UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN in .env.local (never committed).
export const redis = Redis.fromEnv();

const TOTAL_VIEWS_KEY = "total_views";
const TOTAL_DOWNLOADS_KEY = "total_downloads";

function todayKey(): string {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `views:${today}`;
}

/** Increments total + today's view counters. Call from a page-load API hit. */
export async function incrementViews(): Promise<{ totalViews: number; todayViews: number }> {
  const [totalViews, todayViews] = await Promise.all([
    redis.incr(TOTAL_VIEWS_KEY),
    redis.incr(todayKey()),
  ]);
  return { totalViews, todayViews };
}

/** Increments the total downloads counter. Call from a download-click action. */
export async function incrementDownloads(): Promise<{ totalDownloads: number }> {
  const totalDownloads = await redis.incr(TOTAL_DOWNLOADS_KEY);
  return { totalDownloads };
}

/** Reads current counter values without incrementing (for initial page render). */
export async function getCounters(): Promise<{
  totalViews: number;
  totalDownloads: number;
  todayViews: number;
}> {
  const [totalViews, totalDownloads, todayViews] = await Promise.all([
    redis.get<number>(TOTAL_VIEWS_KEY),
    redis.get<number>(TOTAL_DOWNLOADS_KEY),
    redis.get<number>(todayKey()),
  ]);
  return {
    totalViews: totalViews ?? 0,
    totalDownloads: totalDownloads ?? 0,
    todayViews: todayViews ?? 0,
  };
}
