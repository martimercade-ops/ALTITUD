import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

const serverSchema = z.object({
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  CONTACT_ENDPOINT: z.url().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_TO: z.string().optional(),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

let cachedServerEnv: z.infer<typeof serverSchema> | undefined;

export function getServerEnv() {
  cachedServerEnv ??= serverSchema.parse({
    CONTACT_ENDPOINT: process.env.CONTACT_ENDPOINT || undefined,
    SMTP_HOST: process.env.SMTP_HOST || undefined,
    SMTP_PORT: process.env.SMTP_PORT || undefined,
    SMTP_USER: process.env.SMTP_USER || undefined,
    SMTP_PASS: process.env.SMTP_PASS || undefined,
    CONTACT_TO: process.env.CONTACT_TO || undefined,
    VERCEL_PROJECT_PRODUCTION_URL:
      process.env.VERCEL_PROJECT_PRODUCTION_URL || undefined,
  });
  return cachedServerEnv;
}
