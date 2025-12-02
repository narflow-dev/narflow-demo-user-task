import { z } from 'zod';

// Zod schema for create task
export const createTaskSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    parent_task_id: z.string().uuid().optional(),
    title: z.string().min(3, { message: 'Minimum length is 3' }),
    description: z
        .string()
        .min(3, { message: 'Minimum length is 3' })
        .max(2000, { message: 'Maximum length is 2000' })
        .optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
});

// Zod schema for update task
export const updateTaskSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid().optional(),
    parent_task_id: z.string().uuid().optional(),
    title: z.string().min(3, { message: 'Minimum length is 3' }).optional(),
    description: z
        .string()
        .min(3, { message: 'Minimum length is 3' })
        .max(2000, { message: 'Maximum length is 2000' })
        .optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
});
