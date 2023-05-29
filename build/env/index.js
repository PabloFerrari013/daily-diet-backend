"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3333),
});
const envSchemaResponse = envSchema.safeParse(process.env);
if (!envSchemaResponse.success) {
    console.log("❌ ENV ERROR ❌");
    throw new Error(`${envSchemaResponse.error}`);
}
exports.env = envSchemaResponse.data;
