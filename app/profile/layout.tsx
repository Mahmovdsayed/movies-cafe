import ContainerLayout from "@/components/layout/ContainerLayout";
import SectionsChips from "@/components/layout/SectionsChips";
import ProfileHeader from "@/components/sections/ProfileHeader";
import { chipsProfile } from "@/constant/statics";
import { getUserData } from "@/helpers/fetcher";
import { Profile } from "@/types/profile.types";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
    const userInfo: Profile = await getUserData("/profile", "user-info");

    return <>
        <ProfileHeader profile={userInfo} />
        <ContainerLayout>
            <div className="my-4">
                <SectionsChips data={chipsProfile} />
                {children}
            </div>
        </ContainerLayout>
    </>

}
