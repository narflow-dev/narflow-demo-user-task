import { z } from 'zod';
import type { createTaskSchema, updateTaskSchema } from '../checks/task';

// Type inferred from Zod schema for creating tasks
export type createTask = z.infer<typeof createTaskSchema>;
// Type inferred from Zod schema for updating tasks
export type updateTask = z.infer<typeof updateTaskSchema>;
