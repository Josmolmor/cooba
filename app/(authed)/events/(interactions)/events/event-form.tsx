'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { formatDateForInputDatetimeLocal } from '@/lib/utils'

export default function EventForm({
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
    const params = useParams()

    return (
        <form action={formAction} className={className}>
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Event title"
                    required
                    defaultValue={state.payload?.title ?? ''}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    className="max-h-[30dvh]"
                    id="description"
                    name="description"
                    placeholder="Event description"
                    required
                    defaultValue={state.payload?.description ?? ''}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    required
                    defaultValue={
                        formatDateForInputDatetimeLocal(
                            new Date(state.payload?.date)
                        ) ?? ''
                    }
                />
            </div>
            <Input type="hidden" id="id" name="id" defaultValue={params.id} />
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
                    `${state.payload ? 'Edit' : 'Add'} event`
                )}
            </Button>
        </form>
    )
}
