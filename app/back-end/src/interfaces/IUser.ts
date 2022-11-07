import { z } from 'zod';
import { LoginZodSchema } from './ILogin';

const UserZodSchema = LoginZodSchema.extend({
  name: z.string().min(3, { message: 'Name must be 3 or more characters long' }),
  lastName: z.string().min(3, { message: 'Last Name must be 3 or more characters long' }),
});

type IUser = z.infer<typeof UserZodSchema>;

export { UserZodSchema, IUser };
