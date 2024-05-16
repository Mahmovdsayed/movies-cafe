import Login from "@/Components/auth/login/Login";

interface IProps {

}
const page = ({ }: IProps) => {
  return <>
    <main className="min-h-[100vh]">
      <Login />
    </main>
  </>;
};

export default page;