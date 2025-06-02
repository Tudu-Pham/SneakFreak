import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().trim().min(1, { message: "please input model name" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "please input valid price",
        }),
    detailDesc: z.string().trim().min(1, { message: "please input detail description" }),
    shortDesc: z.string().trim().min(1, { message: "please input short description" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "please input valid quantity",
        }),
    brand: z.string().trim().min(1, { message: "please input brand" }),
    condition: z.string().trim().min(1, { message: "please input condition" })
});

export type TproductSchema = z.infer<typeof productSchema>;
