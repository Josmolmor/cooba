import { db } from '../drizzle'
import { events, user_events } from '../schema'
import { and, desc, eq } from 'drizzle-orm'
import { getUser } from '@/lib/db/queries/users'

export async function fetchEvents() {
    const user = await getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }
    return await db
        .select({
            id: events.id,
            title: events.title,
            date: events.date,
        })
        .from(events)
        .innerJoin(user_events, eq(events.id, user_events.event_id))
        .where(eq(user_events.user_id, user.id))
        .orderBy(desc(events.updatedAt))
}

export async function fetchEvent(eventId: string) {
    const user = await getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }
    const [event] = await db
        .select({
            id: events.id,
            title: events.title,
            date: events.date,
        })
        .from(events)
        .innerJoin(user_events, eq(events.id, user_events.event_id))
        .where(and(eq(user_events.user_id, user.id), eq(events.id, eventId)))
        .orderBy(desc(events.updatedAt))

    return event
}
