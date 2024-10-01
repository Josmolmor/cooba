'use server'

import { verifyInviteId } from '@/lib/utils/crypto'

export async function parseInviteUrl(encodedEventId: string) {
    const { id } = await verifyInviteId(encodedEventId)
    return id
}
