import { verifyToken, signToken } from './lib/auth/session'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = '/dashboard'
const inviteRoute = '/join'
const authRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl
    const sessionCookie = request.cookies.get('session')
    const isProtectedRoute = pathname.startsWith(protectedRoutes)
    const isInviteRoute = pathname.startsWith(inviteRoute)
    const isAuthRoute = authRoutes.includes(pathname)

    // Check if 'from' and 'payload' exist, and if 'from' is 'invite'
    const hasFrom = searchParams.has('from')
    const hasPayload = searchParams.has('payload')
    const isFromInvite = searchParams.get('from') === 'invite'

    if (sessionCookie && hasFrom && hasPayload && isFromInvite && isAuthRoute) {
        return NextResponse.redirect(
            new URL(`/join/${searchParams.get('payload')}`, request.url)
        )
    }

    if (sessionCookie && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (isInviteRoute && !sessionCookie) {
        return NextResponse.redirect(
            new URL(
                `/sign-in?from=invite&payload=${pathname.split('/join/').pop()}`,
                `${request.url}`
            )
        )
    }

    let res = NextResponse.next()

    if (sessionCookie) {
        try {
            const parsed = await verifyToken(sessionCookie.value)
            const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)

            res.cookies.set({
                name: 'session',
                value: await signToken({
                    ...parsed,
                    expires: expiresInOneDay.toISOString(),
                }),
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: expiresInOneDay,
            })
        } catch (error) {
            console.error('Error updating session:', error)
            res.cookies.delete('session')
            if (isProtectedRoute) {
                return NextResponse.redirect(new URL('/sign-in', request.url))
            }
        }
    }

    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
