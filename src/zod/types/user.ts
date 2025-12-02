import { z } from 'zod';
import type { createUserSchema, updateUserSchema } from '../checks/user';

// Type inferred from Zod schema for creating users
export type createUser = z.infer<typeof createUserSchema>;
// Type inferred from Zod schema for updating users
export type updateUser = z.infer<typeof updateUserSchema>;
