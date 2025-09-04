import Search from "@/components/pages/Search";

const page = () => {
    return <>
        <div className="my-8">
            <Search
                type="tv"
                queryKey="tvs"
            />
        </div>
    </>;
};

export default page;