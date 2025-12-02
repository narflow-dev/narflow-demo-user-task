import { z } from 'zod';
import type { PageInputSchema } from '../checks/pagination';

export type PageInput = z.infer<typeof PageInputSchema>;
