'use client'

import Link from 'next/link'
import {
    ArrowLeft,
    CalendarDays,
    Edit,
    User2,
    Users,
    Text,
    Check,
    Copy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateForInputDatetimeLocal, isObjectEmpty } from '@/lib/utils'
import { Event } from '@/lib/db/schema'
import { useModal } from '@/context/modal'
import AnimatedCounter from '@/components/animated-counter'
import { EventMembers } from '@/lib/db/queries/users'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export default function EventHeadline({
    id,
    title,
    description,
    date,
    ownerName,
    ownerId,
    totals,
    eventMembers,
}: {
    id: Event['id']
    title: Event['title']
    description: Event['description']
    date: Event['date']
    ownerName: string
    ownerId: Event['ownerId']
    totals: {
        totalsWithDeleted: { [key: string]: number }
        totalsWithoutDeleted: { [key: string]: number }
    }
    eventMembers: EventMembers[]
}) {
    const { openModal } = useModal()

    const handleClickEditButton = () => {
        openModal('edit_event', {
            id,
            title,
            date: formatDateForInputDatetimeLocal(new Date(date)),
        })
    }

    const displayEventMembers = () => {
        openModal('view_event_members', null, null, {
            ownerId,
            initialMembers: eventMembers,
        })
    }

    return (
        <>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <Button variant="link" asChild className="group">
                    <Link href="/events" className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                        All events
                    </Link>
                </Button>
                <div className="flex gap-4 flex-wrap">
                    <Button
                        onClick={handleClickEditButton}
                        className="sm:w-auto"
                    >
                        <>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit event
                        </>
                    </Button>
                    <Button variant="secondary" onClick={displayEventMembers}>
                        <Users className="mr-2 h-4 w-4" />
                        View members
                    </Button>
                </div>
            </div>

            <Card className="mb-4">
                <CardHeader className="pb-6">
                    <div className="flex justify-between items-start flex-wrap gap-8">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-3xl font-semibold">
                                {title}
                            </CardTitle>
                            <div className="text-sm flex items-center text-muted-foreground gap-4 flex-wrap">
                                <span className="flex items-center">
                                    <CalendarDays className="mr-2" size={12} />
                                    {new Date(date).toLocaleDateString(['en'])}
                                </span>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="flex items-center">
                                            <User2
                                                className="mr-1.5"
                                                size={12}
                                            />
                                            {ownerName}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Event owner</p>
                                    </TooltipContent>
                                </Tooltip>
                                {description ? (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span className="flex items-center">
                                                <Text
                                                    className="mr-1.5"
                                                    size={12}
                                                />
                                                {description}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Event description</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : null}
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="flex items-center">
                                            <Users
                                                className="mr-1.5"
                                                size={12}
                                            />
                                            {eventMembers.length}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Number of users</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:text-right">
                            <div className="text-sm">Total Expenses</div>
                            <div className="text-2xl font-bold flex gap-2 sm:gap-4 flex-wrap">
                                {isObjectEmpty(totals) ||
                                Object.entries(totals.totalsWithoutDeleted)
                                    .length === 0
                                    ? 0
                                    : Object.entries(
                                          totals.totalsWithoutDeleted
                                      ).map(([currency, total]) => (
                                          <div
                                              key={total}
                                              className="flex gap-1 items-baseline"
                                          >
                                              <AnimatedCounter
                                                  targetValue={+total}
                                              />
                                              <span className="text-muted-foreground text-sm font-normal">
                                                  {currency}
                                              </span>
                                          </div>
                                      ))}
                            </div>
                            {JSON.stringify(
                                Object.entries(totals.totalsWithDeleted)
                            ) !==
                            JSON.stringify(
                                Object.entries(totals.totalsWithoutDeleted)
                            ) ? (
                                <div>
                                    <span className="text-xs text-muted-foreground">
                                        (Including inactive users)
                                    </span>

                                    <span className="flex gap-2 sm:gap-4 flex-wrap text-2xl font-bold">
                                        {Object.entries(
                                            totals.totalsWithDeleted
                                        ).map(([currency, total]) => (
                                            <div
                                                key={total}
                                                className="flex gap-1 items-baseline"
                                            >
                                                <AnimatedCounter
                                                    targetValue={+total}
                                                />
                                                <span className="text-muted-foreground text-sm font-normal">
                                                    {currency}
                                                </span>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </>
    )
}
