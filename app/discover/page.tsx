import ContainerLayout from "@/components/layout/ContainerLayout";
import CreatePost from "@/components/ui/post/CreatePost";
import PostCard from "@/components/ui/post/PostCard";
import RepostCard from "@/components/ui/post/RepostCard";
import { getUserData } from "@/helpers/fetcher";
import { Repost } from "@/types/repost.types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Discover",
    description: "Discover new movies, tv shows, actors, and posts from other users.",
    keywords: "movies, tv shows, actors, posts, discover, movies cafe",
    openGraph: {
        title: "Discover - Movies Cafe",
        description: "Discover new movies, tv shows, actors, and posts from other users.",
        url: "https://movies-cafe.vercel.app/discover",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Discover - Movies Cafe",
        description: "Discover new movies, tv shows, actors, and posts from other users.",
    },
};

const page = async () => {
    const posts = await getUserData('/reposts', "discover");
    return (
        <ContainerLayout isDiscover={true}>
            <div className="lg:w-1/2 mx-auto mt-0">
                <div className="mx-auto w-full xl:w-3/4 h-full z-0">

                    <div className="border-x border-b border-divider p-2">
                        <CreatePost />
                    </div>

                    {posts?.map((post: Repost) => (
                        <div
                            key={post._id}
                            className={`border-x border-b border-divider px-2 py-4 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-default-50/70 transition-all`}
                        >
                            {post?.type === "repost" ? <RepostCard post={post} /> : <PostCard post={post} />}
                        </div>
                    ))}
                </div>
            </div>
        </ContainerLayout>
    );
};

export default page;
