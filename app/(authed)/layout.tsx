'use client'

import { signOut } from '@/app/(login)/actions'
import Logo from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUser } from '@/lib/auth'
import { CirclePlus, Home, LogOut, UserCog } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useModal } from '@/context/modal'
import DarkModeToggle from '@/components/dark-mode-toggle'

function Header() {
    const { openModal } = useModal()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user } = useUser()

    const params = useParams()
    const { push } = useRouter()

    async function handleSignOut() {
        await signOut()
        push('/')
    }

    return (
        <header className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Logo />
                    <span className="ml-2 text-xl font-semibold">Cooba</span>
                </Link>
                <div
                    className="flex items-center gap-4
                    border bg-card py-2 px-2 pr-3 fixed bottom-6 left-[50%] translate-x-[-50%] rounded-full
                    sm:pr-auto sm:border-0 sm:bg-transparent sm:relative sm:bottom-auto sm:left-auto sm:translate-x-0"
                >
                    {user ? (
                        <DropdownMenu
                            open={isMenuOpen}
                            onOpenChange={setIsMenuOpen}
                        >
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer size-9">
                                    <AvatarImage alt={user.name || ''} />
                                    <AvatarFallback>
                                        {user.email
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex flex-col gap-1">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link
                                        href="/dashboard"
                                        className="flex w-full items-center"
                                    >
                                        <Home className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link
                                        href="/profile"
                                        className="flex w-full items-center"
                                    >
                                        <UserCog className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <form action={handleSignOut} className="w-full">
                                    <button
                                        type="submit"
                                        className="flex w-full"
                                    >
                                        <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </button>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild className="px-4 py-2 rounded-full">
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    )}
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    )
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <section className="flex flex-col min-h-screen">
            <Header />
            {children}
        </section>
    )
}
