import { db } from '@src/db';
import { users } from '@src/db/models/users';

export const resolvers = {
    Query: {
        get_user: async () => {
            // Fetch all records
            const pulledRecords = await db.select().from(users);

            return pulledRecords;
        }
    }
};
