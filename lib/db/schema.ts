import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    integer,
    decimal,
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
    title: text('title').notNull(),
    description: text('description'),
    date: timestamp('date').notNull(),
    ownerId: integer('owner_id').references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
})

export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    eventId: integer('event_id').references(() => events.id),
    userId: integer('user_id').references(() => users.id, {
        onDelete: 'cascade',
    }),
    description: text('description').notNull(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    currency: text('currency').notNull().default('EUR'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
})

export const user_events = pgTable('user_events', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
        onDelete: 'cascade',
    }),
    eventId: integer('event_id').references(() => events.id, {
        onDelete: 'cascade',
    }),
    joinedAt: timestamp('joined_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert
export type UserEvent = typeof user_events.$inferSelect
export type NewUserEvent = typeof user_events.$inferInsert
