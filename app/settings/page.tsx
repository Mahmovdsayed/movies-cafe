import Setting from "@/Components/Settings/Setting";
import AuthMiddleware from "../../authMiddleware";

interface IProps {

}
const page = ({ }: IProps) => {
  return <>
    <AuthMiddleware>
      <main className="min-h-screen">
        <Setting />
      </main>
    </AuthMiddleware>


  </>;
};

export default page;