'use client'

import { type Expense } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import {
    Banknote,
    BookOpen,
    Briefcase,
    Car,
    Coffee,
    Drama,
    Dumbbell,
    Edit,
    Film,
    Gift,
    Heart,
    Home,
    Minus,
    Music,
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
import { Category, detectCategory } from '@/lib/utils/expense-categories'
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'
import { EventMembers } from '@/lib/db/queries/users'

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
    acts: Drama,
    music: Music,
}

const slideInClassnames = (index: number) =>
    `slide-in-from-bottom-${index * 16}`

export const categoryColors: Record<Category, string> = {
    general:
        'bg-purple-100 text-purple-600 dark:bg-purple-800/70 dark:text-purple-300',
    shopping:
        'bg-green-100 text-green-600 dark:bg-green-800/70 dark:text-green-300',
    travel: 'bg-blue-100 text-blue-600 dark:bg-blue-800/70 dark:text-blue-300',
    food: 'bg-orange-100 text-orange-600 dark:bg-orange-800/70 dark:text-orange-300',
    transport:
        'bg-yellow-100 text-yellow-600 dark:bg-yellow-800/70 dark:text-yellow-300',
    home: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-800/70 dark:text-indigo-300',
    dining: 'bg-red-100 text-red-600 dark:bg-red-800/70 dark:text-red-300',
    work: 'bg-gray-100 text-gray-600 dark:bg-gray-800/70 dark:text-gray-300',
    health: 'bg-pink-100 text-pink-600 dark:bg-pink-800/70 dark:text-pink-300',
    tech: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-800/70 dark:text-cyan-300',
    education:
        'bg-teal-100 text-teal-600 dark:bg-teal-800/70 dark:text-teal-300',
    fitness: 'bg-lime-100 text-lime-600 dark:bg-lime-800/70 dark:text-lime-300',
    gifts: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-800/70 dark:text-emerald-300',
    coffee: 'bg-amber-100 text-amber-600 dark:bg-amber-800/70 dark:text-amber-300',
    entertainment:
        'bg-rose-100 text-rose-600 dark:bg-rose-800/70 dark:text-rose-300',
    acts: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-800/70 dark:text-fuchsia-300',
    music: 'bg-violet-100 text-violet-600 dark:bg-violet-800/70 dark:text-violet-300',
}

export default function ExpenseCard({
    id,
    description,
    amount,
    currency,
    userName,
    userId,
    deletedAt,
    index,
    members,
}: {
    id: Expense['id']
    index: number
    description: Expense['description']
    amount: Expense['amount']
    currency: Expense['currency']
    userId: Expense['userId']
    userName: string
    deletedAt: Expense['deletedAt']
    members: EventMembers[]
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
            userId,
            members,
        })
    }

    const category = detectCategory(description)

    const Icon = categoryIcons[category] || categoryIcons['general']
    const colorClass =
        categoryColors[category] ||
        'bg-foreground text-background dark:bg-foreground dark:text-background'

    return (
        <Card
            className={`animate-in duration-700 ${slideInClassnames(index + 1)} fade-in-0 ${deletedAt ? 'opacity-50' : ''}`}
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
                        {deletedAt ? null : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={!!deletedAt}
                                        variant="ghost"
                                        size="sm"
                                        onClick={
                                            deletedAt
                                                ? undefined
                                                : handleClickEditButton
                                        }
                                        className="px-2"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit expense</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </CardDescription>
            </CardContent>
        </Card>
    )
}
