import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const VehicleZodSchema = z.object({
  model: z.string().min(3, { message: 'Model must be 3 or more characters long' }),
  brand: z.string().min(3, { message: 'Brand must be 3 or more characters long' }),
  description: z.string().optional(),
  year: z.number()
    .int({ message: 'Year must be an integer' })
    .gte(1900, { message: 'Year must be greater equal 1900' })
    .lte(2022, { message: 'Year must be smaller equal 2022' }),
  color: z.string().min(3, { message: 'Color must be 3 or more characters long' }),
  buyValue: z.number().positive({ message: 'BuyValue must be greater then 0' }),
  image: z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});

type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema, IVehicle };
