import { z } from 'zod';

const UserZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be 6 or more characters long' }),
});

type IUser = z.infer<typeof UserZodSchema>;

export { UserZodSchema, IUser };
