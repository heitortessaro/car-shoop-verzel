import { z } from 'zod';

const UserZodSchema = z.object({
  name: z.string().min(3, { message: 'Name must be 3 or more characters long' }),
  lastName: z.string().min(3, { message: 'Last Name must be 3 or more characters long' }),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be 6 or more characters long' }),
});

type IUser = z.infer<typeof UserZodSchema>;

export { UserZodSchema, IUser };
