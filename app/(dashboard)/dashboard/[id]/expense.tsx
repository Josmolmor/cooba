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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const categoryIcons = {
    general: DollarSign,
    shopping: ShoppingCart,
    travel: Plane,
    food: Coffee,
}

const categoryColors = {
    general: 'bg-purple-100 text-purple-600',
    shopping: 'bg-green-100 text-green-600',
    travel: 'bg-blue-100 text-blue-600',
    food: 'bg-orange-100 text-orange-600',
}

export default function Expense({
    id,
    description,
    amount,
    currency,
}: Pick<Expense, 'id' | 'description' | 'amount' | 'currency'>) {
    const { isOpen, openModal, modalVariant, closeModal } = useModal()

    const handleClick = () => {
        openModal('edit_expense', { id, description, amount, currency })
    }

    const category = 'shopping'

    const Icon = categoryIcons[category] || CreditCard
    const colorClass = categoryColors[category] || 'bg-gray-100 text-gray-600'

    return (
        <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-full ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClick}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
                <div className="space-y-2">
                    <h3 className="font-medium text-base truncate text-gray-600">
                        {description}
                    </h3>
                    <div className="flex items-baseline justify-between">
                        <div className="space-x-1">
                            <span className="text-2xl font-bold text-gray-800">
                                {(+amount).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">
                                {currency}
                            </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            <span>You</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
