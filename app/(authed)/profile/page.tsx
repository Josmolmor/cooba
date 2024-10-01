import ProfileForm from './form'
import SecuritySection from '@/app/(authed)/profile/security'

export default function Profile() {
    return (
        <div className="max-w-7xl w-full mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-8">
            <ProfileForm className="" />
            <SecuritySection />
        </div>
    )
}
