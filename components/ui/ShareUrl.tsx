'use client'

import { useState } from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WeiboShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    XIcon,
    BlueskyShareButton,
    // icons
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    RedditIcon,
    TumblrIcon,
    PinterestIcon,
    OKIcon,
    ViberIcon,
    PocketIcon,
    InstapaperIcon,
} from "react-share";

interface ShareUrlProps {
    url: string;
}

const ShareUrl = ({ url }: ShareUrlProps) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: "Check this out!",
                    url: url,
                });
                setError(null);
            } catch (err) {
                setError("Share cancelled or failed.");
            }
        } else {
            setError("Sharing not supported on this browser.");
        }
    };
    const [error, setError] = useState<string | null>(null);

    return (
        <div>
            <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Share
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        // <div className="flex items-center justify-start gap-2">
        //     <FacebookShareButton url={url}>
        //         <FacebookIcon size={32} round />
        //     </FacebookShareButton>

        //     <TwitterShareButton url={url}>
        //         <XIcon size={32} round />
        //     </TwitterShareButton>

        //     <WhatsappShareButton url={url}>
        //         <WhatsappIcon size={32} round />
        //     </WhatsappShareButton>

        //     <FacebookMessengerShareButton url={url} appId="YOUR_APP_ID">
        //         <FacebookMessengerIcon size={32} round />
        //     </FacebookMessengerShareButton>

        //     <LinkedinShareButton url={url}>
        //         <LinkedinIcon size={32} round />
        //     </LinkedinShareButton>

        //     <RedditShareButton url={url}>
        //         <RedditIcon size={32} round />
        //     </RedditShareButton>

        //     <TumblrShareButton url={url}>
        //         <TumblrIcon size={32} round />
        //     </TumblrShareButton>

        //     <PinterestShareButton url={url} media={url}>
        //         <PinterestIcon size={32} round />
        //     </PinterestShareButton>

        //     <OKShareButton url={url}>
        //         <OKIcon size={32} round />
        //     </OKShareButton>

        //     <ViberShareButton url={url}>
        //         <ViberIcon size={32} round />
        //     </ViberShareButton>

        //     <PocketShareButton url={url}>
        //         <PocketIcon size={32} round />
        //     </PocketShareButton>

        //     <InstapaperShareButton url={url}>
        //         <InstapaperIcon size={32} round />
        //     </InstapaperShareButton>
        // </div>


    );
};

export default ShareUrl;
