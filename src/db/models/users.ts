import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tasks } from './tasks';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    username: varchar('username').unique().notNull(),
    email: varchar('email').unique().notNull(),
    password: varchar('password'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
    // users must have multiple tasks
    tasks: many(tasks)
}));
