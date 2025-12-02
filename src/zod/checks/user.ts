import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Zod schema for create user
export const createUserSchema = z.object({
    id: z.string().uuid().optional(),
    username: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(
            z
                .string()
                .min(3, { message: 'Minimum length is 3' })
                .max(15, { message: 'Maximum length is 15' })
        ),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
        .string()
        .transform((val: string) => bcrypt.hashSync(val, 12))
        .optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
});

// Zod schema for update user
export const updateUserSchema = z.object({
    id: z.string().uuid().optional(),
    username: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(
            z
                .string()
                .min(3, { message: 'Minimum length is 3' })
                .max(15, { message: 'Maximum length is 15' })
        )
        .optional(),
    email: z.string().email({ message: 'Invalid email' }).optional(),
    password: z
        .string()
        .transform((val: string) => bcrypt.hashSync(val, 12))
        .optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
});
