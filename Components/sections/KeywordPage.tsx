"use client";

import { Card, Image, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface IProps {}
const KeywordPage = ({}: IProps) => {
  const moviesKeyword = [
    {
      title: "Action Movies",
      description: "Experience adrenaline-pumping excitement with these action-packed movies.",
      id: 322496,
    },

    {
      title: "Comedy Movies",
      description: "Enjoy a good laugh with these comedy movies.",
      id: 322268,
    },
    {
      title: "Drama Movies",
      description: "Experience powerful storytelling with these drama movies.",
      id: 316421,
    },
    {
      title: "Thriller Movies",
      description: "Get your heart racing with these thrilling movies.",
      id: 316362,
    },
    {
      title: "Horror Movies",
      description: "Experience terror and suspense with these horror movies.",
      id: 315058,
    },
    {
      title: "Romance Movies",
      description: "Indulge in love stories with these romantic movies.",
      id: 9840,
    },
    {
      title: "Sci-Fi Movies",
      description: "Embark on futuristic adventures with these sci-fi movies.",
      id: 321730,
    },
    {
      title: "Fantasy Movies",
      description: "Escape into magical realms with these fantasy movies.",
      id: 293198,
    },
    {
      title: "Animated Movies",
      description:
        "Experience wonder and imagination with these animated movies.",
      id: 297442,
    },
    {
      title: "Documentary Films",
      description:
        "Learn about real-world events and people with these documentaries.",
      id: 282080,
    },
    {
      title: "Crime Movies",
      description: "Explore the dark side of humanity with these crime movies.",
      id: 323114,
    },
    {
      title: "Adventure Movies",
      description: "Embark on thrilling journeys with these adventure movies.",
      id: 322942,
    },
    {
      title: "Mystery Movies",
      description: "Unravel the enigmas with these mystery movies.",
      id: 316332,
    },
    {
      title: "Western Movies",
      description: "Saddle up for some classic western action.",
      id: 305941,
    },
    {
      title: "War Movies",
      description: "Experience the intensity of battle with these war movies.",
      id: 273967,
    },
    {
      title: "Biography Movies",
      description:
        "Learn about remarkable individuals with these biography movies.",
      id: 5565,
    },
    {
      title: "Historical Movies",
      description: "Travel back in time with these historical movies.",
      id: 15126,
    },
    {
      title: "Musical Movies",
      description: "Get ready to sing along with these musical movies.",
      id: 4344,
    },
    {
      title: "Family Movies",
      description: "Enjoy wholesome entertainment for the whole family.",
      id: 18035,
    },
    {
      title: "Sports Movies",
      description:
        "Experience the thrill of victory and the agony of defeat with these sports movies.",
      id: 280150,
    },
  ];
  const router = useRouter();
  function handleButtonClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1000,
      position: "top-center",
    });
    router.push(`/keyword/${id}`);
  }
  return (
    <>
      <div className="min-h-[100vh] container mx-auto px-6">
        <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-1 ">
          {moviesKeyword.map((keyword) => (
            <div className="overflow-hidden   relative ">
              <Card
                isPressable
                
                onClick={() => handleButtonClick(keyword.id)}
                className="w-full h-full relative  col-span-12 sm:col-span-5"
              >
                <CardFooter className="  bg-gray-200 dark:bg-[#18181B]   justify-between">
                  <div>
                    <p className="text-start font-bold text-lg">{keyword.title}</p>
                    <p className="text-start text-tiny dark:text-white/60">
                      {keyword.description}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KeywordPage;
