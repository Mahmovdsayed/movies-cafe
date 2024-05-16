"use client";
import { Button, Card, CardFooter, Input, Pagination, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/react";
interface IProps { }
const SearchSection = ({ }: IProps) => {
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("s") ?? "";
  useEffect(() => {
    getStaticProps();
  }, [currentPage, pageNumber]);
  const [movies, setmovies] = useState<any[]>([]);
  const [tv, setTV] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [language, setlanguage] = useState("en-US");

  const url = `https://api.themoviedb.org/3/search/movie?query=${pageNumber}&include_adult=false&language=${language}&page=${currentPage}`;
  const TVurl = `https://api.themoviedb.org/3/search/tv?query=${pageNumber}&include_adult=false&language=${language}&page=${currentPage}`;
  const actorsURL = `https://api.themoviedb.org/3/search/person?query=${pageNumber}&include_adult=false&language=${language}&page=${currentPage}`;
  const options = {
    method: "GET",

    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`,
    },
  };

  const getStaticProps = async () => {
    const res = await fetch(url, options);
    const data = await res.json();
    const tvshows = await fetch(TVurl, options);
    const tvData = await tvshows.json();
    const actorsd = await fetch(actorsURL, options);
    const actorsData = await actorsd.json();
    setActors(actorsData.results);
    setmovies(data.results);
    setTV(tvData.results);
  };
  const router = useRouter();
  const defaultContent =
    "";
  function handleSubmit(e: any) {
    router.replace(`/search?s=${value}`);
    e.preventDefault();
  }
  function onClear() {
    router.replace(`/search`);
  }
  return (
    <>
      <div className="w-full flex mt-6  items-center">
        <form
          className="w-full flex mt-6  items-center"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder={pageNumber || "Search..."}
            value={value}
            size="sm"
            isClearable
            onClear={onClear}
            onValueChange={setValue}
            startContent={
              <BsFillSearchHeartFill className="text-zinc-500" size={16} />
            }
          />
          <Button
            onClick={() => router.replace(`/search?s=${value}`)}
            radius="sm"
            size="lg"
            type="submit"
            isIconOnly
            startContent={<BsFillSearchHeartFill />}
            color="secondary"
            className="ms-1"
          ></Button>
        </form>
      </div>
      <p className="text-sm text-zinc-500 mt-2 text-start">
        Discover the magic of cinema at your fingertips! Search for movies,
        series, or actors effortlessly.🎬🔍
      </p>
      <div className="mt-8">
        {pageNumber == "" ? (
          <Accordion isDisabled variant="splitted">
            <AccordionItem
              key="1"
              subtitle="Press to expand"
              aria-label="Movies"
              title="Movies"
            ></AccordionItem>
            <AccordionItem
              key="2"
              subtitle="Press to expand"
              aria-label="Tv Shows"
              title="Tv Shows"
            ></AccordionItem>
            <AccordionItem
              key="3"
              subtitle="Press to expand"
              aria-label="Actors"
              title="Actors"
            >
              {defaultContent}
            </AccordionItem>
          </Accordion>
        ) : (

          <Accordion variant="splitted">
            <AccordionItem
              key="1"
              subtitle="Press to expand"
              aria-label="Movies"
              title="Movies"
            >
              {movies.length == 0 ? <div className="text-sm text-center">not found</div> : <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                {movies.map((movie) => (
                  <div key={movie.id}>
                    <Card
                      isPressable
                      onClick={() => router.push(`/movies/${movie.id}`)}
                      className="w-[250px] relative"
                    >


                      <Image
                        alt={movie.title}
                        draggable={false}
                        isZoomed
                        className="z-0 w-full h-full  translate-y-[-20px] object-cover"
                        src={`${movie.poster_path === null
                          ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                          : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          }`}
                      />

                      <CardFooter className="absolute bottom-0 bg-gray-200 dark:bg-[#181818]  justify-between">
                        <div>
                          <p className="text-start text-tiny">{movie.title}</p>
                          <p className="text-start text-tiny dark:text-white/60">
                            {movie.release_date}
                          </p>
                        </div>
                        {/* <Button
                    as={Link}
                    showAnchorIcon
                    className="text-tiny bg-gradient-to-r from-blue-700 via-blue-800 to-gray-600 text-white"
                    href={`/movies/${movie.id}`}
                    radius="sm"
                    size="sm"
                  >
                    Explore
                  </Button> */}
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>}

            </AccordionItem>
            <AccordionItem
              key="2"
              subtitle="Press to expand"
              aria-label="Tv Shows"
              title="Tv Shows"
            >
              {tv.length == 0 ? <div className="text-sm text-center">not found</div> : <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                {tv.map((movie) => (
                  <div key={movie.id}>
                    <Card
                      isPressable
                      onClick={() => router.push(`/tv/${movie.id}`)}
                      className="w-[250px] relative"
                    >


                      <Image
                        alt={movie.title}
                        draggable={false}
                        isZoomed
                        className="z-0 w-full h-full  translate-y-[-20px] object-cover"
                        src={`${movie.poster_path === null
                          ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                          : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          }`}
                      />

                      <CardFooter className="absolute bottom-0 bg-gray-200 dark:bg-[#181818] justify-between">
                        <div>
                          <p className="text-start text-tiny">{movie.name}</p>
                          <p className="text-start text-tiny dark:text-white/60">
                            {movie.first_air_date}
                          </p>
                        </div>
                        {/* <Button
                      as={Link}
                      showAnchorIcon
                      className="text-tiny bg-gradient-to-r from-blue-700 via-blue-800 to-gray-600 text-white"
                      href={`/movies/${movie.id}`}
                      radius="sm"
                      size="sm"
                    >
                      Explore
                    </Button> */}
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>}

            </AccordionItem>
            <AccordionItem
              key="3"
              subtitle="Press to expand"
              aria-label="Actors"
              title="Actors"
            >
              {actors.length == 0 ? <div className="text-sm text-center">not found</div> : <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                {actors.map((movie) => (
                  <div key={movie.id}>
                    <Card
                      isPressable
                      onClick={() => router.push(`/actors/${movie.id}`)}
                      className="w-[250px] relative"
                    >


                      <Image
                        alt={movie.title}
                        draggable={false}
                        isZoomed
                        className="z-0 w-full h-full  translate-y-[-20px] object-cover"
                        src={`${movie.profile_path === null
                          ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                          : `https://image.tmdb.org/t/p/original${movie.profile_path}`
                          }`}
                      />

                      <CardFooter className="absolute bottom-0 bg-gray-200 dark:bg-[#181818]  justify-between">
                        <div>
                          <p className="text-start text-tiny">{movie.name}</p>
                          <p className="text-start text-tiny dark:text-white/60">
                            {movie.known_for_department}
                          </p>
                        </div>
                        {/* <Button
                      as={Link}
                      showAnchorIcon
                      className="text-tiny bg-gradient-to-r from-blue-700 via-blue-800 to-gray-600 text-white"
                      href={`/movies/${movie.id}`}
                      radius="sm"
                      size="sm"
                    >
                      Explore
                    </Button> */}
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>}

            </AccordionItem>
          </Accordion>
        )}
      </div>
    </>
  );
};

export default SearchSection;
