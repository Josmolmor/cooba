'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function NewEventForm({
    formAction,
    state,
    pending,
    className,
}: {
    formAction: any
    state: any
    pending: boolean
    className?: string
}) {
    return (
        <form action={formAction} className={className}>
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    className=""
                    type="text"
                    placeholder="Event title"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    required
                    className=""
                />
            </div>
            {state?.error && (
                <p className="text-red-500 text-sm">{state.error}</p>
            )}
            <Button type="submit" disabled={pending}>
                {pending ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Loading...
                    </>
                ) : (
                    'Add event'
                )}
            </Button>
        </form>
    )
}
