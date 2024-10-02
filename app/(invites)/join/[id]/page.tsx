import { parseInviteUrl } from '@/app/(invites)/join/[id]/actions'

export default async function JoinPage({ params }: { params: { id: string } }) {
    await parseInviteUrl(params.id)
    return <></>
}
