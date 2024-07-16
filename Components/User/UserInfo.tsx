'use client'
import { formatCreatedAt } from "@/functions/formatCreatedAt";
import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import { MdVerified, MdAccessTimeFilled } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";

interface IProps {
    username: string,
    firstName: string,
    secondName: string,
    gender: string,
    verifed: boolean,
    createdAt: any
}

const UserInfo = ({ username, firstName, secondName, gender, verifed, createdAt }: IProps) => {
    return <>
        <div className="container mx-auto px-4  mt-6  md:mt-20">
            <div className="relative left-[20px]  md:left-[60px] text-start py-6">
                <h4 className="text-sm text-default-400"><span className="font-bold">@</span>{username}</h4>
                <h1 className="capitalize font-semibold text-lg md:text-2xl flex items-center">{firstName} {" "} {secondName}  <span className={verifed == true ? "text-blue-600 text-md md:text-2xl ms-1 md:ms-2" : "hidden"}>
                    {" "}
                    <MdVerified />
                </span></h1>
                <div className="flex flex-col">
                    <Chip startContent={<MdAccessTimeFilled />} className="text-tiny my-2" radius="sm" variant="flat" color="danger">Member since: <span className="font-bold">{formatCreatedAt(createdAt)}</span></Chip>
                    {/* <Chip startContent={<FaUserLarge />} className="text-tiny mb-2" radius="sm" variant="flat" color="secondary">Gender: <span className="font-bold capitalize">{gender}</span></Chip> */}
                </div>
            </div>
            <Divider />

        </div>
    </>;
};

export default UserInfo;