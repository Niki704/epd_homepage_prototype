import { z } from "zod";

const serverSchema = z.object({
  SITE_URL: z.string().url(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export const envServer = serverSchema.parse({
  SITE_URL: process.env.SITE_URL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const envClient = clientSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});