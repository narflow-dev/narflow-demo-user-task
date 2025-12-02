import { eq } from 'drizzle-orm';
import { db } from '@src/db';
import { tasks } from '@src/db/models/tasks';

export const resolvers = {
    Mutation: {
        delete_task: async (_: unknown, { id }: { id: string }) => {
            // Delete record and return success
            await db.delete(tasks).where(eq(tasks.id, id)).returning();

            return true;
        }
    }
};
