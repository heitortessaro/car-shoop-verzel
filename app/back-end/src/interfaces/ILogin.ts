import { z } from 'zod';

const LoginZodSchema = z.object({

  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be 6 or more characters long' }),
});

type ILogin = z.infer<typeof LoginZodSchema>;

export { LoginZodSchema, ILogin };