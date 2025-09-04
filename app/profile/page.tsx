import EditProfile from "@/components/forms/EditProfile";
import Banner from "@/components/layout/Banner";
import { getUserData } from "@/helpers/fetcher";
import { Profile } from "@/types/profile.types";


const page = async () => {
    const userInfo: Profile = await getUserData("/profile", "user-info");
    return <>
        <div className="mt-6">
            <Banner
                title="Update Profile"
                description="Make changes to your profile information and settings."
            />
        </div>
        <div className="mt-6">
            <EditProfile profile={userInfo} />
        </div>
    </>;
};

export default page;