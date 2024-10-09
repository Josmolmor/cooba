import CopyInvitationLinkToClipboardButton from '@/components/copy-to-clipboard-button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { ReceiptText, ArrowUp, ArrowDown } from 'lucide-react'
import DeleteEventButton from './(interactions)/events/delete-event-button'
import { getEventExpenses } from '@/lib/db/queries/expenses'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils/currency'
import { getUser } from '@/lib/db/queries/users'

export async function EventCard({
    id,
    title,
    ownerId,
    creatorName,
    date,
}: {
    id: number
    title: string
    ownerId: number | null
    creatorName: string | null
    date: Date
}) {
    const currentUser = await getUser()
    const { expenses, currencyTotals, userBalances } =
        await getEventExpenses(id)

    return (
        <Card>
            <CardHeader className="pb-4 space-y-0">
                <CardTitle className="flex items-start justify-between h-9 text-2xl mb-4 sm:mb-2">
                    {title}
                    <DeleteEventButton ownerId={ownerId} eventId={id} />
                </CardTitle>
                {currencyTotals.length > 0 || userBalances.length > 0 ? (
                    <CardDescription className="flex items-center gap-4">
                        <div className="flex flex-col gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                                {currencyTotals.length > 0 ? (
                                    currencyTotals.map(
                                        ({ currency, total }, i) => (
                                            <p
                                                key={currency}
                                                className="flex items-center gap-2 flex-wrap"
                                            >
                                                Total ({currency}):{' '}
                                                {formatCurrency(
                                                    total,
                                                    currency
                                                )}
                                                {i <
                                                currencyTotals.length - 1 ? (
                                                    <span className="hidden sm:block">
                                                        |
                                                    </span>
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        )
                                    )
                                ) : (
                                    <p className="flex items-center gap-2 flex-wrap">
                                        No expenses registered
                                    </p>
                                )}
                            </div>
                            {userBalances.length > 0 ? (
                                <div className="flex items-center gap-3 flex-wrap">
                                    {userBalances
                                        .find(
                                            (user) =>
                                                user.id === currentUser?.id
                                        )
                                        ?.balances.map(
                                            ({ currency, balance }) => {
                                                if (balance !== 0) {
                                                    const isOwed = balance > 0
                                                    return (
                                                        <div
                                                            key={currency}
                                                            className={`flex items-center gap-1 ${isOwed ? 'text-green-500' : 'text-red-500'}`}
                                                        >
                                                            {isOwed ? (
                                                                <ArrowUp
                                                                    size={16}
                                                                />
                                                            ) : (
                                                                <ArrowDown
                                                                    size={16}
                                                                />
                                                            )}
                                                            <span>
                                                                {currency}:{' '}
                                                                {formatCurrency(
                                                                    Math.abs(
                                                                        balance
                                                                    ),
                                                                    currency
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }
                                        )}
                                </div>
                            ) : null}
                        </div>
                    </CardDescription>
                ) : null}
            </CardHeader>
            <CardContent className="flex gap-4 flex-col">
                <div className="flex gap-4 flex-wrap">
                    <CopyInvitationLinkToClipboardButton
                        eventId={id.toString()}
                        buttonLabel="Copy invite link"
                    />
                    <Link
                        href={`/events/${id}`}
                        key={id}
                        className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 self-start w-full sm:w-auto"
                    >
                        <ReceiptText className="h-4 w-4" />
                        View Details
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
