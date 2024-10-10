'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'
import { currencyList } from '@/lib/utils/currency'
import { useUser } from '@/lib/auth'
import { ExpensePayload, NewExpensePayload } from '@/context/modal'

const isEditExpense = (
    value: ExpensePayload | NewExpensePayload
): value is ExpensePayload | null => false

export default function ExpenseForm({
    formAction,
    state,
    pending,
    className,
}: {
    formAction: any
    state: {
        payload?: ExpensePayload
        error?: string
        success?: string
    }
    pending: boolean
    className?: string
}) {
    const { user } = useUser()
    const params = useParams()

    return (
        <form action={formAction} className={className}>
            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue={state.payload?.amount ?? ''}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    className="max-h-[20dvh]"
                    id="description"
                    name="description"
                    defaultValue={state.payload?.description ?? ''}
                    placeholder="Enter a description for the expense"
                    required
                />
            </div>
            <Input
                type="hidden"
                id="id"
                name="id"
                defaultValue={state.payload?.id ?? ''}
            />
            <div className="space-y-2 max-w-full">
                <Label htmlFor="currency">Currency</Label>
                <select
                    name="currency"
                    id="currency"
                    defaultValue={state.payload?.currency ?? 'EUR'}
                    className="appearance-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {currencyList.map(({ name, short, symbol }) => (
                        <option key={short} value={short}>
                            {name} ({symbol})
                        </option>
                    ))}
                </select>
            </div>
            <div className="space-y-2 max-w-full">
                <Label htmlFor="user_id">Paid by</Label>
                <select
                    name="user_id"
                    id="user_id"
                    required
                    defaultValue={state.payload?.userId ?? `${user?.id}`}
                    className="appearance-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {(state.payload as NewExpensePayload)?.members?.map(
                        ({ userId, userName }) => (
                            <option key={userId} value={userId}>
                                {userName}
                            </option>
                        )
                    )}
                </select>
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
                    `${state.payload ? 'Edit' : 'Add'} expense`
                )}
            </Button>
        </form>
    )
}
