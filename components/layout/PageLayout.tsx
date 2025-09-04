import { chipsMoviesData } from "@/constant/statics";
import Banner from "./Banner";
import ContainerLayout from "./ContainerLayout";
import SectionsChips from "./SectionsChips";
import MoviesLayout from "./MoviesLayout";
import { MovieType } from "@/types/movie.type";

interface IProps {
    title: string;
    description: string;
    apiFunc: (page: number) => Promise<{ results: MovieType[]; total_pages: number }>;
    queryKey: string
    isPages?: boolean

}

const PageLayout = ({ title, description, apiFunc, queryKey, isPages = true }: IProps) => {
    return <>
        <ContainerLayout>
            <Banner
                title={title}
                description={description}
            />
            <div className="my-4">
                <SectionsChips data={chipsMoviesData} />
                <MoviesLayout
                    queryFn={apiFunc}
                    queryKey={queryKey}
                    isPages={isPages}
                />
            </div>
        </ContainerLayout>
    </>;
};

export default PageLayout;