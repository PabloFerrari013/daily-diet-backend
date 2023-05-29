import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

const envSchemaResponse = envSchema.safeParse(process.env);

if (!envSchemaResponse.success) {
  console.log("❌ ENV ERROR ❌");
  throw new Error(`${envSchemaResponse.error}`);
}

export const env = envSchemaResponse.data;
