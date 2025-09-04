import Search from "@/components/pages/Search";

const page = () => {
    return <>
        <div className="my-8">
            <Search
                type="person"
                queryKey="people"
            />
        </div>
    </>;
};

export default page;