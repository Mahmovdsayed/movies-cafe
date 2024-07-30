interface IProps {

}
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

const Reviews = ({ }: IProps) => {
    const rev = [{
        id: '1',
        username: "@mahmoudsaayed",
        Name: "Mahmoud Sayed",
        desc: "As a huge TV show fan, I find Movies Cafe to be an invaluable resource. The updates on the latest shows and the ability to track what I've watched is a game-changer. Great site!",
        image: "https://i.pinimg.com/564x/7c/18/0a/7c180abcd16fc89c34268125381343a9.jpg"
    },
    {
        id: '1',
        username: "@mostafaayman_t",
        Name: "Mustafa Ayman",
        desc: "The user reviews and ratings on Movies Cafe have helped me discover so many great films. I trust the community's opinions and love being part of this movie-loving community.",
        image: "https://i.pinimg.com/564x/00/fe/99/00fe99adf643569617afbceb63b346f3.jpg"
    },
    {
        id: '1',
        username: "@farahtelebx",
        Name: "Farah Teleb",
        desc: "Movies Cafe has completely transformed my movie-watching experience. The detailed information about each movie and actor is fantastic, and I love being able to save my favorites. Highly recommend it!",
        image: "https://i.pinimg.com/564x/b8/0a/d9/b80ad9fd48f0b1e8d404775c495633be.jpg"
    },
    {
        id: '1',
        username: "@_tarikk_jr",
        Name: "Georg Tarik",
        desc: "The design of Movies Cafe is so user-friendly and visually appealing. Browsing through movies and TV shows is a joy, and I appreciate all the detailed information provided.",
        image: "https://i.pinimg.com/564x/ef/46/bc/ef46bc360c2ee12b2bf6a04698874e57.jpg"
    },
    ]
    return <>
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rev.map((re) =>
                    <Card className="bg-gray-200 dark:bg-[#181818]" key={re.id} shadow="none">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt={re.username}
                                height={40}
                                radius="sm"
                                src={re.image}
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">{re.Name}</p>
                                <p className="text-small text-default-500">{re.username}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{re.desc}</p>
                        </CardBody>
                    </Card>
                )}

            </div>
        </div>


    </>;
};

export default Reviews;