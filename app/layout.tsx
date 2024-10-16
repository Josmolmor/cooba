import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { UserProvider } from '@/lib/auth'
import { getUser } from '@/lib/db/queries/users'
import { ReactNode } from 'react'
import { ModalProvider } from '@/context/modal'
import ModalWrapper from '@/context/modal/wrapper'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cookies } from 'next/headers'
import Providers from '@/lib/query-provider'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Cooba',
    description: 'Effortlessly split your expenses',
    keywords: 'expenses, split, budgeting, finance, cooba',
    authors: [
        {
            name: 'Jose M Molina - https://molina.digital',
        },
    ],
    openGraph: {
        title: 'Cooba - Split Your Expenses Effortlessly',
        description:
            'Effortlessly split your expenses with Cooba. Manage your finances with ease.',
        url: 'https://cooba-six.vercel.app/',
        siteName: 'Cooba',
        images: [
            {
                url: 'images/cooba-meta-img.jpg',
                width: 800,
                height: 600,
                alt: 'Cooba - Split Your Expenses',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image', // or 'summary' for a smaller card
        title: 'Cooba - Split Your Expenses Effortlessly',
        description:
            'Effortlessly split your expenses with Cooba. Manage your finances with ease.',
        images: ['images/cooba-meta-img.jpg'],
        site: '@cooba',
        creator: '@josmolmor',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const storedTheme = cookies().get('cooba-theme')?.value
    let userPromise = getUser()

    return (
        <html lang="en">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                              (function() {
                                if (${storedTheme === 'dark'} || (${!storedTheme} && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                  document.documentElement.classList.add('dark')
                                  document.documentElement.style.setProperty('color-scheme', 'dark')
                                }
                              })();
                            `,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh]`}
            >
                <Providers>
                    <TooltipProvider delayDuration={200}>
                        <ModalProvider>
                            <UserProvider userPromise={userPromise}>
                                {children}
                                <ModalWrapper />
                            </UserProvider>
                        </ModalProvider>
                    </TooltipProvider>
                </Providers>
            </body>
        </html>
    )
}
