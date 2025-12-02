import { db } from '@src/db';
import { tasks } from '@src/db/models/tasks';

export const resolvers = {
    Query: {
        get_task: async () => {
            // Fetch all records
            const pulledRecords = await db.select().from(tasks);

            return pulledRecords;
        }
    }
};
