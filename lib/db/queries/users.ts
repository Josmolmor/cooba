import { db } from '../drizzle'
import { User, user_events, UserEvent, users } from '../schema'
import { verifyToken } from '@/lib/auth/session'
import { and, eq, isNull } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function getUser(): Promise<User | null> {
    const sessionCookie = cookies().get('session')

    if (!sessionCookie || !sessionCookie.value) {
        return null
    }

    const sessionData = await verifyToken(sessionCookie.value)

    if (
        !sessionData ||
        !sessionData.user ||
        typeof sessionData.user.id !== 'number'
    ) {
        return null
    }

    if (new Date(sessionData.expires) < new Date()) {
        return null
    }

    const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
        .limit(1)

    if (!user) {
        return null
    }

    return user
}

export async function getAllUsersEventsByEventId(
    id: string
): Promise<
    | {
          eventId: UserEvent['event_id']
          userId: User['id']
          userName: User['name']
          userEmail: User['email']
      }[]
    | null
> {
    const usersEventsList = await db
        .select({
            eventId: user_events.event_id,
            userId: user_events.user_id,
            userName: users.name, // Adjust fields as needed
            userEmail: users.email, // Example additional field from the users table
        })
        .from(user_events)
        .innerJoin(users, eq(user_events.user_id, users.id)) // Join user_events with users table
        .where(eq(user_events.event_id, +id))

    if (!usersEventsList) {
        return null
    }

    return usersEventsList
}

export async function getUserById(id: string): Promise<User | null> {
    const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.id, id), isNull(users.deletedAt)))
        .limit(1)

    if (!user) {
        return null
    }

    return user
}
