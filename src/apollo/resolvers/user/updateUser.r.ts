import { eq } from 'drizzle-orm';
import { db } from '@src/db';
import { users } from '@src/db/models/users';
import type { updateUser } from '@src/zod/types/user';
import { updateUserSchema } from '@src/zod/checks/user';

export const resolvers = {
    Mutation: {
        update_user: async (
            _: unknown,
            { id, input }: { id: string; input: updateUser }
        ) => {
            // Ensure input matches required schema
            const parsedInput = await updateUserSchema.parseAsync(input);

            // Update record and return updated row
            const [updatedRow] = await db
                .update(users)
                .set(parsedInput)
                .where(eq(users.id, id))
                .returning();

            return updatedRow;
        }
    }
};
