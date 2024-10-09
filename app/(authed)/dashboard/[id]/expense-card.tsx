'use client'

import { type Expense } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import {
    Banknote,
    BookOpen,
    Briefcase,
    Car,
    Coffee,
    CreditCard,
    Dumbbell,
    Edit,
    Film,
    Gift,
    Heart,
    Home,
    Minus,
    Pizza,
    Plane,
    Plus,
    ShoppingCart,
    Smartphone,
    User,
    Utensils,
} from 'lucide-react'
import { useModal } from '@/context/modal'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useUser } from '@/lib/auth'
import { formatCurrency } from '@/lib/utils/currency'
import {
    Category,
    categoryColors,
    detectCategory,
} from '@/lib/utils/expense-categories'

const categoryIcons: Record<Category, typeof Banknote> = {
    general: Banknote,
    shopping: ShoppingCart,
    travel: Plane,
    food: Pizza,
    coffee: Coffee,
    transport: Car,
    home: Home,
    dining: Utensils,
    work: Briefcase,
    health: Heart,
    tech: Smartphone,
    education: BookOpen,
    fitness: Dumbbell,
    entertainment: Film,
    gifts: Gift,
}

const slideInClassnames = (index: number) =>
    `slide-in-from-bottom-${index * 16}`

export default function ExpenseCard({
    id,
    description,
    amount,
    currency,
    userName,
    userId,
    index,
}: {
    id: Expense['id']
    index: number
    description: Expense['description']
    amount: Expense['amount']
    currency: Expense['currency']
    userId: Expense['user_id']
    userName: string
}) {
    const { user } = useUser()
    const isUser = user?.name === userName

    const { openModal } = useModal()

    const handleClickEditButton = () => {
        openModal('edit_expense', undefined, {
            id,
            description,
            amount,
            currency,
            user_id: userId,
        })
    }

    const category = detectCategory(description)

    const Icon = categoryIcons[category] || categoryIcons['general']
    const colorClass =
        categoryColors[category] ||
        'bg-foreground text-background dark:bg-foreground dark:text-background'

    return (
        <Card
            className={`animate-in duration-700 ${slideInClassnames(index + 1)} fade-in-0`}
        >
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold flex gap-1 items-baseline">
                        <span className={`flex items-center gap-1`}>
                            {isUser ? <Plus size={14} /> : <Minus size={14} />}
                            <span>
                                {formatCurrency(Math.abs(+amount), currency)}
                            </span>
                        </span>
                    </CardTitle>
                    <div className={`p-2 rounded-full ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <CardDescription>
                    <p>{description}</p>
                    <div className={`flex justify-between items-baseline mt-2`}>
                        <div className={`flex items-center text-sm`}>
                            <User className="h-3 w-3 mr-2" />
                            {userName ? <span>{userName}</span> : null}
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
