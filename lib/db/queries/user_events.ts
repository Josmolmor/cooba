'use server'

import { users, user_events } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '../drizzle'

export type FetchEventUsers = { id: number; name: string | null }[]

export async function getEventUsers(eventId: string): Promise<FetchEventUsers> {
    const eventUsers = await db
        .select({
            id: users.id,
            name: (users.name || users.email) ?? '',
        })
        .from(users)
        .innerJoin(user_events, eq(users.id, user_events.user_id))
        .where(eq(user_events.event_id, +eventId))

    return eventUsers
}
