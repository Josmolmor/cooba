'use server'

import { jwtVerify, SignJWT } from 'jose'

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

export async function signIdForInvite(payload: { id: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('3 days from now')
        .sign(key)
}

export async function verifyInviteId(input: string) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload as { id: string }
    } catch (err) {
        console.error(err)
        return null
    }
}
