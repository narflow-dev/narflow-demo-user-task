import { eq } from 'drizzle-orm';
import { db } from '@src/db';
import { tasks } from '@src/db/models/tasks';
import type { updateTask } from '@src/zod/types/task';
import { updateTaskSchema } from '@src/zod/checks/task';

export const resolvers = {
    Mutation: {
        update_task: async (
            _: unknown,
            { id, input }: { id: string; input: updateTask }
        ) => {
            // Ensure input matches required schema
            const parsedInput = await updateTaskSchema.parseAsync(input);

            // Update record and return updated row
            const [updatedRow] = await db
                .update(tasks)
                .set(parsedInput)
                .where(eq(tasks.id, id))
                .returning();

            return updatedRow;
        }
    }
};
