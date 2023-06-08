import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  EXPRESS_SESSION_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
});

const envSchemaResponse = envSchema.safeParse(process.env);

if (!envSchemaResponse.success) {
  console.log("❌ ENV ERROR ❌");
  throw new Error(`${envSchemaResponse.error}`);
}

export const env = envSchemaResponse.data;
