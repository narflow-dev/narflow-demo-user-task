import { db } from '@src/db';
import { users } from '@src/db/models/users';
import type { createUser } from '@src/zod/types/user';
import { createUserSchema } from '@src/zod/checks/user';

export const resolvers = {
    Mutation: {
        create_user: async (_: unknown, { input }: { input: createUser }) => {
            // Ensure input matches required schema
            const parsedInput = await createUserSchema.parseAsync(input);

            // Insert record and return new row
            const [createdRow] = await db
                .insert(users)
                .values(parsedInput)
                .returning();

            return createdRow;
        }
    }
};
