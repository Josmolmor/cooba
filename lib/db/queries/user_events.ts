'use server'

import { users, user_events } from '@/lib/db/schema'
import { eq, and, isNull } from 'drizzle-orm'
import { db } from '../drizzle'

export type FetchEventUsers = { id: number; name: string | null }[]

export async function getActiveEventUsers(
    eventId: string
): Promise<FetchEventUsers> {
    const eventUsers = await db
        .select({
            id: users.id,
            name: (users.name || users.email) ?? '',
        })
        .from(users)
        .innerJoin(user_events, eq(users.id, user_events.userId))
        .where(
            and(
                eq(user_events.eventId, +eventId),
                isNull(user_events.deletedAt)
            )
        )

    return eventUsers
}

export async function getAllEventUsers(
    eventId: string
): Promise<FetchEventUsers> {
    const eventUsers = await db
        .select({
            id: users.id,
            name: (users.name || users.email) ?? '',
        })
        .from(users)
        .innerJoin(user_events, eq(users.id, user_events.userId))
        .where(and(eq(user_events.eventId, +eventId)))

    return eventUsers
}
