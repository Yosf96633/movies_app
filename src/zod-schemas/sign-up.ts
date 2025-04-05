import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(4, { message: `Name must be greater than 4 characters` })
    .max(20, { message: `Name must be lesser than 20 characters` }),
  email: z.string().email({ message: `Please enter valid email` }),
  password: z
    .string()
    .min(8, { message: `Password must be greater than 8 characters` })
    .max(16, { message: `Password must be lesser than 16 characters` }),
});
