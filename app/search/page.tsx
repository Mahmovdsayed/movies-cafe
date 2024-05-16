'use client'
import SearchSection from "@/Components/sections/SearchSection";

interface IProps {}
const page = ({}: IProps) => {
  return (
    <>
      <div className="container mx-auto px-4 min-h-screen">
        <SearchSection />
      </div>
    </>
  );
};

export default page;
