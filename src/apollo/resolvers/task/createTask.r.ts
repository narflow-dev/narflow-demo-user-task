import { db } from '@src/db';
import { tasks } from '@src/db/models/tasks';
import type { createTask } from '@src/zod/types/task';
import { createTaskSchema } from '@src/zod/checks/task';

export const resolvers = {
    Mutation: {
        create_task: async (_: unknown, { input }: { input: createTask }) => {
            // Ensure input matches required schema
            const parsedInput = await createTaskSchema.parseAsync(input);

            // Insert record and return new row
            const [createdRow] = await db
                .insert(tasks)
                .values(parsedInput)
                .returning();

            return createdRow;
        }
    }
};
