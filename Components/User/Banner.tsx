'use client'
import { BreadcrumbItem, Breadcrumbs, Button, Image } from "@nextui-org/react";

interface IProps {
    BannerColor: string,
    username: string,
    image: string,
}
const Banner = ({ BannerColor, username, image }: IProps) => {
    return <>
        <div className="container mx-auto px-4   mt-6 ">
            <div className="my-6">
                <Breadcrumbs size="sm" radius="full" variant={"solid"}>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {username}
                    </BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div style={{ backgroundColor: BannerColor }} className={`relative w-full h-[100px] md:h-[200px] rounded-xl`}>
                <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full absolute z-20  bottom-[-75px] left-[60px] md:bottom-[-150px] md:left-[130px] transform -translate-x-1/2 -translate-y-1/2">
                    <Image
                        removeWrapper
                        alt="test"

                        className="w-[80px] h-[80px]  md:w-[150px] md:h-[150px] object-cover rounded-2xl"
                        src={image}
                    />
                   
                </div>

            </div>
        </div>
    </>;
};

export default Banner;