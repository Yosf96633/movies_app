import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: `Please enter valid email` }),
  password: z
    .string()
    .min(8, { message: `Password must be greater than 8 characters` })
    .max(16, { message: `Password must be lesser than 16 characters` }),
});
