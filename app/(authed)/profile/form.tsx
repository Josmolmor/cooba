'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Edit, Loader2, Lock } from 'lucide-react'
import { useActionState } from 'react'
import { ActionState } from '@/lib/auth/middleware'
import { useUser } from '@/lib/auth'
import { Card } from '@/components/ui/card'
import { deleteAccount, updatePassword } from '@/app/(login)/actions'
import { editUser } from '@/lib/db/actions/users'

const ProfileForm = ({ className }: { className?: string }) => {
    const { user } = useUser()
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        editUser,
        { error: '' }
    )
    const [passwordState, passwordAction, isPasswordPending] = useActionState<
        ActionState,
        FormData
    >(updatePassword, { error: '', success: '' })

    const [deleteState, deleteAction, isDeletePending] = useActionState<
        ActionState,
        FormData
    >(deleteAccount, { error: '', success: '' })

    return (
        <div>
            <h1 className="text-lg lg:text-2xl font-medium bold text-foreground/90 mb-4">
                Profile
            </h1>
            <Card className="p-6">
                {user ? (
                    <form
                        action={formAction}
                        className={`${className} flex flex-col gap-4 self-start`}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <div className="space-y-2 w-full sm:w-auto flex-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    defaultValue={user.name ?? ''}
                                />
                            </div>
                            <div className="space-y-2 w-full sm:w-auto flex-1">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    disabled
                                    defaultValue={user.email ?? ''}
                                />
                            </div>
                        </div>
                        <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={user.id}
                        />
                        {state?.error && (
                            <p className="text-red-500 text-sm">
                                {state.error}
                            </p>
                        )}
                        <Button
                            type="submit"
                            disabled={pending}
                            className="self-start sm:w-auto"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit user
                                </>
                            )}
                        </Button>
                    </form>
                ) : (
                    <p className="text-red-500 text-sm">
                        Unable to retrieve user data
                    </p>
                )}
            </Card>
        </div>
    )
}

export default ProfileForm
