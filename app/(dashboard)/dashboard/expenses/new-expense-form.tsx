'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useParams, useSearchParams } from 'next/navigation'

export default function NewExpenseForm({
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                    className="max-h-[20dvh]"
                    id="description"
                    name="description"
                    placeholder="Enter a description for the expense"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    required
                />
            </div>
            <Input
                type="hidden"
                id="event_id"
                name="event_id"
                defaultValue={params.id}
            />
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
                    'Add expense'
                )}
            </Button>
        </form>
    )
}
