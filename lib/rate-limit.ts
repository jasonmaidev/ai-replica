import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function rateLimit(identifier: string) {
  const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(25, "24 h"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });

  return await rateLimit.limit(identifier);
}
