import { formatCreatedAt } from "@/functions/formatCreatedAt";
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Link } from "@nextui-org/react";
import { MdAccessTimeFilled, MdVerified } from "react-icons/md";

interface IProps {

}
const page = async ({ }: IProps) => {
    const url = process.env.ALLUSER_URL || "";
    const post = await fetch(url, { cache: "no-store" })
    const postData = await post.json()
    return <>
        <main className="container mx-auto px-6 my-6 min-h-screen overflow-hidden">
            <div className="flex justify-between">
                <div className="font-semibold uppercase text-3xl text-default-600">Total Users</div>
                <div className="font-semibold uppercase text-3xl text-default-600">{postData.count}</div>
            </div>
            <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-1  sm:grid-cols-2 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                {postData.data.map((user: any) =>
                    <Card key={user._id}>
                        <CardHeader className="p-0 m-0 relative">
                            <div style={{ backgroundColor: user.banner }} className="w-full h-[170px]"></div>
                            <div className="absolute top-28 px-6">
                                <Image className="w-20 h-20 object-cover " src={user.image} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="mt-5">
                                <span className="text-default-500 font-bold text-tiny">@{user.username}</span>
                                <h2 className="capitalize font-semibold text-md md:text-xl flex items-center">{user.firstName} {" "} {user.secondName}  <span className={user.verifed == true ? " text-md md:text-xl ms-1 md:ms-2" : "hidden"}>
                                    {" "}
                                    <MdVerified />
                                </span></h2>
                                <Chip startContent={<MdAccessTimeFilled />} className="text-tiny my-2" radius="sm" variant="flat" color="primary">Member since: <span className="font-bold">{formatCreatedAt(user?.createdAt)}</span></Chip>

                            </div>
                        </CardBody>
                        <CardFooter> <Button href={`/user/${user._id}`} as={Link} showAnchorIcon size="sm" radius="sm" color="primary" className="w-full">View Profile</Button></CardFooter>
                    </Card>
                )}
            </div>
        </main>
    </>;
};

export default page;
