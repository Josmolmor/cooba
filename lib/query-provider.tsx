'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetchng immediately on the client
                        staleTime: 6 * 1000,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            {children}
        </QueryClientProvider>
    )
}
