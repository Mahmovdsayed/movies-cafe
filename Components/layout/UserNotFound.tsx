import { Button, Link } from "@nextui-org/react";

interface IProps {

}
const UserNotFound = ({ }: IProps) => {
    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>User Not Found</h2>
            <p className="my-2">Please check if the user ID is correct.</p>
            <Button as={Link} showAnchorIcon href="/" size="sm" radius="sm" color="secondary">Home</Button>
        </div>
    </>;
};

export default UserNotFound;