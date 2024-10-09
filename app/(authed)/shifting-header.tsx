'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ShiftingHeader() {
    const shiftingPhrases = [
        'daily expenses',
        'dinner bill',
        'couple expenses',
        'monthly rent',
        'next vacation',
        'grocery shopping',
        'group trip',
        'birthday gifts',
    ]

    return (
        <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-background">
            <div className="container max-w-7xl mx-auto px-6 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2 mb-6">
                        <div className="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-align-center">
                            Effortlessly split your{' '}
                            <span className="text-primary inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                                <ul className="block animate-text-slide-8 text-left leading-tight [&_li]:block">
                                    {shiftingPhrases.map((words) => (
                                        <li>{words}</li>
                                    ))}
                                    <li aria-hidden="true">
                                        {shiftingPhrases[0]}
                                    </li>
                                </ul>
                            </span>
                        </div>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Cooba allows you to track, manage, and organize
                            expenses across multiple events and currencies with
                            unparalleled ease and speed.
                        </p>
                    </div>
                    <Button size="lg" asChild>
                        <Link href="/events">Get started</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
