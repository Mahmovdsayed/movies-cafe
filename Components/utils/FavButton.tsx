import { Button, Image, Link, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

interface IProps {
    title: string,
    className: string,
    imgUrl: string,
    date: string,
    type: string,
    slug: number,
}

const FavButton = ({ title, imgUrl, date, className, slug, type }: IProps) => {
    const router = useRouter()

    const token = useSelector((state: any) => state.token)
    const user = useSelector((state: any) => state.user)

    const handleSubmit = async (mainTitle: any, id: any, image: any, typeF: any) => {
        const auth = "accesstoken_"
        const allData = {
            title: mainTitle,
            slug: id,
            imageUrl: image,
            type: typeF
        }
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accesstoken': `${auth}${token}`,
            },
            body: JSON.stringify(allData)

        }

        const res = await fetch('/api/v1/post/add', options)
        const resData = await res.json()

        if (resData.data.success == true) {
            router.prefetch(`/user/${user?._id}`)
            toast.success(resData.data.message,
                {
                    duration: 3000,
                }
            )

        } else if (token == null) {
            toast.error('please login first', { duration: 3000 })

        } else {
            toast.error(resData.data.message, { duration: 3000 })

        }



    }
    return <>
        <Tooltip color="danger" size="md" content='Add to favourite'>
            <Button
                isIconOnly
                className={`text-tiny bg-gradient-to-r ${className}  from-blue-700/20 via-blue-800/20  to-gray-600/20 backdrop-blur-md `}
                onClick={() => handleSubmit(title, slug, imgUrl, type)}
                size="md"
                radius="md"
                startContent={<BsBookmarkHeartFill />}
            >

            </Button>
        </Tooltip>
    </>;
};

export default FavButton;