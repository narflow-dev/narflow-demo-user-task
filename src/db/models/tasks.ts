import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    user_id: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    parent_task_id: uuid('parent_task_id'),
    title: varchar('title').notNull(),
    description: varchar('description'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
    // tasks must belongs to a single user
    user: one(users, {
        fields: [tasks.user_id],
        references: [users.id]
    }),
    // tasks can belongs to a single parent_task (self-referencing)
    parent_task: one(tasks, {
        fields: [tasks.parent_task_id],
        references: [tasks.id]
    }),
    // tasks must have multiple subtasks (self-referencing)
    subtasks: many(tasks)
}));
