'use server'

import { z } from 'zod'
import { validatedActionWithUser } from '@/lib/auth/middleware'
import { User, users } from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'
import { eq } from 'drizzle-orm'

const editUserSchema = z.object({
    id: z.string(),
    name: z.string(),
})

export const editUser = validatedActionWithUser(
    editUserSchema,
    async (data, _, user) => {
        const { id, name } = data

        try {
            // Create a new event
            const [user]: User[] = await db
                .update(users)
                .set({
                    name,
                })
                .where(eq(users.id, +id))
                .returning()

            return {
                success: 'User edited successfully',
                user,
            }
        } catch (error) {
            return { error: `Failed to edit user: ${error}` }
        }
    }
)
