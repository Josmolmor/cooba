import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    integer,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
})

export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    date: timestamp('date').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
})

export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    event_id: integer('event_id').references(() => events.id),
    user_id: integer('user_id').references(() => users.id),
    description: text('description').notNull(),
    amount: integer('amount').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
})

export const user_events = pgTable('user_events', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id, {
        onDelete: 'cascade',
    }),
    event_id: integer('event_id').references(() => events.id, {
        onDelete: 'cascade',
    }),
    joined_at: timestamp('joined_at').notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert
export type UserEvent = typeof user_events.$inferSelect
export type NewUserEvent = typeof user_events.$inferInsert
