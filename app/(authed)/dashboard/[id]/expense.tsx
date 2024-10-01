'use client'

import { Expense } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Banknote,
    CalendarDays,
    Coffee,
    CreditCard,
    DollarSign,
    Edit,
    Edit2,
    HandCoins,
    Icon,
    MoreVertical,
    Pencil,
    Plane,
    ShoppingCart,
    User,
} from 'lucide-react'
import { useModal } from '@/context/modal'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const categoryIcons = {
    general: Banknote,
    shopping: ShoppingCart,
    travel: Plane,
    food: Coffee,
}

const categoryColors = {
    general:
        'bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300',
    shopping:
        'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300',
    travel: 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300',
    food: 'bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300',
}

export default function Expense({
    id,
    description,
    amount,
    currency,
}: Pick<Expense, 'id' | 'description' | 'amount' | 'currency'>) {
    const { openModal } = useModal()

    const handleClickEditButton = () => {
        openModal('edit_expense', undefined, {
            id,
            description,
            amount,
            currency,
        })
    }

    const category = 'general'

    const Icon = categoryIcons[category] || CreditCard
    const colorClass =
        categoryColors[category] ||
        'bg-foreground text-background dark:bg-foreground dark:text-background'

    return (
        <Card className="">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold flex gap-1 items-baseline">
                        {(+amount).toFixed(2)}
                        <span className="text-sm">{currency}</span>
                    </CardTitle>
                    <div className={`p-2 rounded-full ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <CardDescription>
                    {description}
                    <div className="flex justify-between items-baseline">
                        <div className="flex items-center text-sm">
                            <User className="h-3 w-3 mr-1" />
                            <span>You</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClickEditButton}
                            className="px-2"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                </CardDescription>
            </CardContent>
        </Card>
    )
}
