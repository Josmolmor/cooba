'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarDays, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateForInputDatetimeLocal, isObjectEmpty } from '@/lib/utils'
import { Event } from '@/lib/db/schema'
import { useModal } from '@/context/modal'

export default function EventHeadline({
    id,
    title,
    date,
    totalsByCurrency,
}: {
    id: Event['id']
    title: Event['title']
    date: Event['date']
    totalsByCurrency: Record<string, string>
}) {
    const { openModal } = useModal()

    const handleClickEditButton = () => {
        openModal('edit_event', {
            id,
            title,
            date: formatDateForInputDatetimeLocal(new Date(date)),
        })
    }

    return (
        <>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <Link
                    href="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 self-start"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Events
                </Link>
                <Button onClick={handleClickEditButton} className="sm:w-auto">
                    <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit event
                    </>
                </Button>
            </div>

            <Card className="mb-4">
                <CardHeader className="pb-6">
                    <div className="flex justify-between items-start flex-wrap gap-8">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-2xl">{title}</CardTitle>
                            <div className="text-sm flex items-center">
                                <CalendarDays className="mr-1 h-4 w-4" />
                                {new Date(date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:text-right">
                            <div className="text-sm">Total Expenses</div>
                            <div className="text-2xl font-bold">
                                {isObjectEmpty(totalsByCurrency)
                                    ? 0
                                    : Object.entries(totalsByCurrency)
                                          .map(([currency, total]) => {
                                              return `${(+total).toFixed(2)} ${currency}`
                                          })
                                          .join(' + ')}
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </>
    )
}
