export type Category =
    | 'general'
    | 'shopping'
    | 'travel'
    | 'food'
    | 'transport'
    | 'home'
    | 'dining'
    | 'work'
    | 'health'
    | 'tech'
    | 'education'
    | 'fitness'
    | 'entertainment'
    | 'gifts'
    | 'coffee'

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
    entertainment:
        'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-800/70 dark:text-fuchsia-300',
    gifts: 'bg-rose-100 text-rose-600 dark:bg-rose-800/70 dark:text-rose-300',
    coffee: 'bg-amber-100 text-amber-600 dark:bg-amber-800/70 dark:text-amber-300',
}

export const categoryKeywords: Record<Category, string[]> = {
    coffee: ['coffee', 'stabucks'],
    shopping: [
        'shop',
        'buy',
        'purchase',
        'mall',
        'store',
        'market',
        'supermarket',
        'amazon',
        'ebay',
    ],
    travel: [
        'flight',
        'hotel',
        'vacation',
        'trip',
        'tour',
        'booking',
        'airbnb',
        'hostel',
        'resort',
        'airport',
    ],
    food: [
        'grocery',
        'groceries',
        'food',
        'snack',
        'fruit',
        'vegetable',
        'meat',
        'dairy',
    ],
    transport: [
        'uber',
        'lyft',
        'taxi',
        'car',
        'bus',
        'train',
        'subway',
        'metro',
        'gas',
        'fuel',
        'parking',
    ],
    home: [
        'rent',
        'mortgage',
        'utilities',
        'electricity',
        'water',
        'gas',
        'internet',
        'furniture',
        'decor',
    ],
    dining: [
        'restaurant',
        'cafe',
        'bar',
        'dinner',
        'lunch',
        'breakfast',
        'takeout',
        'delivery',
    ],
    work: [
        'office',
        'supplies',
        'business',
        'conference',
        'seminar',
        'workshop',
        'networking',
    ],
    health: [
        'doctor',
        'hospital',
        'medicine',
        'pharmacy',
        'medical',
        'dental',
        'vision',
        'therapy',
    ],
    tech: [
        'phone',
        'computer',
        'laptop',
        'tablet',
        'software',
        'app',
        'subscription',
        'gadget',
    ],
    education: [
        'tuition',
        'school',
        'college',
        'university',
        'course',
        'book',
        'textbook',
        'tutorial',
    ],
    fitness: [
        'gym',
        'workout',
        'exercise',
        'sports',
        'yoga',
        'pilates',
        'swimming',
        'running',
    ],
    entertainment: [
        'movie',
        'concert',
        'theater',
        'show',
        'music',
        'streaming',
        'netflix',
        'spotify',
    ],
    gifts: [
        'present',
        'gift',
        'birthday',
        'anniversary',
        'wedding',
        'celebration',
    ],
    general: ['payment', 'bill', 'misc', 'other', 'general', 'expense'],
}

export function detectCategory(description: string): Category {
    const lowerDesc = description.toLowerCase()
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some((keyword) => lowerDesc.includes(keyword))) {
            return category as Category
        }
    }
    return 'general'
}
