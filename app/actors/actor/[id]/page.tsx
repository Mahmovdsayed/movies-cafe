import ContainerLayout from "@/components/layout/ContainerLayout";
import Credits from "@/components/ui/Actor/Credits";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <>
        <ContainerLayout>
            <div className="my-8">
                <Credits
                    type="movie_credits"
                    id={id}
                />
            </div>
            <div className="my-8">
                <Credits
                    type="tv_credits"
                    id={id}
                />
            </div>
        </ContainerLayout>
    </>;
};

export default Page;
