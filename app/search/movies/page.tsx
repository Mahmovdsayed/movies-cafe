import Search from "@/components/pages/Search";

const page = () => {
    return <>
        <div className="my-8">
            <Search
                type="movie"
                queryKey="movies"
            />
        </div>
    </>;
};

export default page;