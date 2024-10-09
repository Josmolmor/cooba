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
