import CreateNewAccount from "@/Components/auth/register/CreateNewAccount";

interface IProps {

}
const page = ({ }: IProps) => {
    return <>
        <main className="min-h-[100vh]">
            <CreateNewAccount />
        </main>
    </>;
};

export default page;