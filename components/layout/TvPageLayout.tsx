import { chipsTvShows } from "@/constant/statics";
import Banner from "./Banner";
import ContainerLayout from "./ContainerLayout";
import SectionsChips from "./SectionsChips";
import { TvShowsTypes } from "@/types/tv.types";
import TvsLayout from "./TvsLayout";

interface IProps {
    title: string;
    description: string;
    apiFunc: (page: number) => Promise<{ results: TvShowsTypes[]; total_pages: number }>;
    queryKey: string
    isPages?: boolean
}
const TvPageLayout = ({ title, description, apiFunc, queryKey, isPages = true }: IProps) => {
    return <>
        <ContainerLayout>
            <Banner
                title={title}
                description={description}
            />
            <div className="my-4">
                <SectionsChips data={chipsTvShows} />
                <TvsLayout
                    queryFn={apiFunc}
                    queryKey={queryKey}
                    isPages={isPages}
                />
            </div>
        </ContainerLayout>
    </>;
};

export default TvPageLayout;