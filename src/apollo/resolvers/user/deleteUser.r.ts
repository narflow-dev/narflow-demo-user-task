import { eq } from 'drizzle-orm';
import { db } from '@src/db';
import { users } from '@src/db/models/users';

export const resolvers = {
    Mutation: {
        delete_user: async (_: unknown, { id }: { id: string }) => {
            // Delete record and return success
            await db.delete(users).where(eq(users.id, id)).returning();

            return true;
        }
    }
};
