import { parseInviteUrl } from '@/app/(invites)/join/[id]/actions'

export default async function JoinPage({ params }: { params: { id: string } }) {
    const decryptedEventId = await parseInviteUrl(params.id)

    return <h1>{decryptedEventId}</h1>
}
