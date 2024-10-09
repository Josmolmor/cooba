'use server'

import { validatedAction, validatedActionWithUser } from '@/lib/auth/middleware'
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session'
import { db } from '@/lib/db/drizzle'
import { users, type NewUser } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getUsernameFromEmail } from '@/lib/utils'

const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100),
    from: z.string().optional(),
    payload: z.string().optional(),
})

export const signIn = validatedAction(signInSchema, async (data, formData) => {
    const { email, password, from, payload } = data

    const user = await db
        .select({
            user: users,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

    if (user.length === 0) {
        return { error: 'Invalid email or password. Please try again.' }
    }

    const { user: foundUser } = user[0]

    const isPasswordValid = await comparePasswords(
        password,
        foundUser.passwordHash
    )

    if (!isPasswordValid) {
        return { error: 'Invalid email or password. Please try again.' }
    }

    await setSession(foundUser)
    if (from === 'invite' && payload) {
        return redirect(`/join/${payload}`)
    }
    redirect('/events')
})

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    from: z.string().optional(),
    payload: z.string().optional(),
})

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
    const { email, password, from, payload } = data

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

    if (existingUser.length > 0) {
        return {
            error: 'Failed to create user: Email is already in use. Please try with a different one.',
        }
    }

    const passwordHash = await hashPassword(password)

    const newUser: NewUser = {
        email,
        name: getUsernameFromEmail(email),
        passwordHash,
    }

    const [createdUser] = await db.insert(users).values(newUser).returning()

    if (!createdUser) {
        return { error: 'Failed to create user. Please try again.' }
    }

    await setSession(createdUser)
    if (from === 'invite' && payload) {
        return redirect(`/join/${payload}`)
    }
    redirect('/events')
})

export async function signOut() {
    // const user = (await getUser()) as User;
    cookies().delete('session')
}

const updatePasswordSchema = z
    .object({
        currentPassword: z.string().min(8).max(100),
        newPassword: z.string().min(8).max(100),
        confirmPassword: z.string().min(8).max(100),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export const updatePassword = validatedActionWithUser(
    updatePasswordSchema,
    async (data, _, user) => {
        const { currentPassword, newPassword } = data

        const isPasswordValid = await comparePasswords(
            currentPassword,
            user.passwordHash
        )

        if (!isPasswordValid) {
            return { error: 'Current password is incorrect.' }
        }

        if (currentPassword === newPassword) {
            return {
                error: 'New password must be different from the current password.',
            }
        }

        const newPasswordHash = await hashPassword(newPassword)

        await Promise.all([
            db
                .update(users)
                .set({ passwordHash: newPasswordHash })
                .where(eq(users.id, user.id)),
        ])

        return { success: 'Password updated' }
    }
)

const deleteAccountSchema = z.object({
    password: z.string().min(8).max(100),
})

export const deleteAccount = validatedActionWithUser(
    deleteAccountSchema,
    async (data, _, user) => {
        const { password } = data

        const isPasswordValid = await comparePasswords(
            password,
            user.passwordHash
        )
        if (!isPasswordValid) {
            return { error: 'Incorrect password. Account deletion failed.' }
        }
        // Soft delete
        await db
            .update(users)
            .set({
                deletedAt: sql`CURRENT_TIMESTAMP`,
                email: sql`CONCAT(email, '-', id, '-deleted')`, // Ensure email uniqueness
            })
            .where(eq(users.id, user.id))

        cookies().delete('session')
        redirect('/sign-in')
    }
)

const updateAccountSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
})

export const updateAccount = validatedActionWithUser(
    updateAccountSchema,
    async (data, _, user) => {
        const { name, email } = data

        try {
            await Promise.all([
                db
                    .update(users)
                    .set({ name, email })
                    .where(eq(users.id, user.id)),
            ])

            return { success: 'Account updated' }
        } catch (error) {
            console.error('Error updating account:', error) // Log the error for debugging
            return {
                error: 'Failed to update account. Please try again later.',
            }
        }
    }
)
