import { db } from '../drizzle'
import { User, users } from '../schema'
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
