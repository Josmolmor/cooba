import { db } from '../drizzle'
import { events, user_events } from '../schema'
import { desc, eq } from 'drizzle-orm'
import { getUser } from '@/lib/db/queries/users'

export async function fetchEvents() {
    const user = await getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }
    return await db
        .select({
            id: events.id,
            name: events.name,
            date: events.date,
        })
        .from(events)
        .innerJoin(user_events, eq(events.id, user_events.event_id))
        .where(eq(user_events.user_id, user.id))
        .orderBy(desc(events.updatedAt))
}
