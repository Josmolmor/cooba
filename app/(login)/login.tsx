'use client'

import { signIn, signUp } from './actions'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionState } from '@/lib/auth/middleware'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState, useState } from 'react'

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
    const searchParams = useSearchParams()
    const from = searchParams.get('from')
    const payload = searchParams.get('payload')
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        mode === 'signin' ? signIn : signUp,
        { error: '' }
    )
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <Logo size={64} />
                    </Link>
                </div>
                <h2 className="mt-4 text-center text-3xl font-extrabold">
                    {mode === 'signin'
                        ? 'Sign in to your account'
                        : 'Create your account'}
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                    And keep track of all your expenses
                </p>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                <form className="flex flex-col gap-6" action={formAction}>
                    <input
                        type="hidden"
                        name="from"
                        id="from"
                        value={from || ''}
                    />
                    <input
                        type="hidden"
                        name="payload"
                        id="payload"
                        value={payload || ''}
                    />
                    <div>
                        <Label
                            htmlFor="email"
                            className="block text-sm font-medium text-muted-foreground"
                        >
                            Email
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                maxLength={50}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-sm font-medium text-muted-foreground"
                        >
                            Password
                        </Label>
                        <div className="mt-1 relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete={
                                    mode === 'signin'
                                        ? 'current-password'
                                        : 'new-password'
                                }
                                required
                                minLength={8}
                                maxLength={100}
                                placeholder="Enter your password"
                            />
                            {showPassword ? (
                                <EyeOff
                                    onClick={() => setShowPassword(false)}
                                    className="h-5 w-5 absolute right-10 bottom-2 right-3 text-gray-400 z-10"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setShowPassword(true)}
                                    className="h-5 w-5 absolute bottom-2 right-3 text-gray-400 z-1 z-10"
                                />
                            )}
                        </div>
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={pending}
                            className="sm:w-full"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Loading...
                                </>
                            ) : mode === 'signin' ? (
                                'Sign in'
                            ) : (
                                'Sign up'
                            )}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background text-muted-foreground">
                                {mode === 'signin'
                                    ? 'New to Cooba?'
                                    : 'Already have an account?'}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <Button disabled={pending} asChild variant="outline">
                            <Link
                                className="sm:w-full"
                            
                                aria-disabled={pending}
                                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                                    from ? `?from=${from}` : ''
                                }${payload ? `&payload=${payload}` : ''}`}
                            >
                                {mode === 'signin'
                                    ? 'Create an account'
                                    : 'Sign in to existing account'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
