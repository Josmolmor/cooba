import { db } from '../drizzle'
import { events, user_events, Event, User, users } from '../schema'
import { and, desc, eq, isNull } from 'drizzle-orm'
import { getUser } from '@/lib/db/queries/users'

export async function fetchEvents(): Promise<
    {
        id: Event['id']
        title: Event['title']
        date: Event['date']
        ownerId: Event['owner_id']
        creatorName: User['name']
    }[]
> {
    const user = await getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }
    return await db
        .select({
            id: events.id,
            title: events.title,
            date: events.date,
            ownerId: events.owner_id,
            creatorName: users.name, // Select the creator's name
        })
        .from(events)
        .innerJoin(user_events, eq(events.id, user_events.event_id))
        .innerJoin(users, eq(events.owner_id, users.id)) // Join users table with events using owner_id
        .where(and(eq(user_events.user_id, user.id), isNull(events.deletedAt)))
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
            ownerId: events.owner_id,
            creatorName: users.name, // Select the creator's name
        })
        .from(events)
        .innerJoin(user_events, eq(events.id, user_events.event_id))
        .innerJoin(users, eq(events.owner_id, users.id)) // Join users table with events using owner_id
        .where(and(eq(user_events.user_id, user.id), eq(events.id, +eventId)))
        .orderBy(desc(events.updatedAt))

    return event
}

export async function fetchPublicEvent(eventId: string): Promise<{
    id: number
    title: string
    description: string | null
    date: Date
    creatorName: string | null
}> {
    const [event] = await db
        .select({
            id: events.id,
            title: events.title,
            description: events.description,
            date: events.date,
            creatorName: users.name, // Select the creator's name
        })
        .from(events)
        .innerJoin(users, eq(events.owner_id, users.id)) // Join users table with events using owner_id
        .where(eq(events.id, +eventId))

    return event
}
