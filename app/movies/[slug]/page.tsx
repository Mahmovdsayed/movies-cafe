import MovieDetails from "@/Components/sections/MovieDetails";
import { Metadata } from "next";

interface IProps {}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const id = params.slug;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  const data = await res.json();
  return {
    title: data.title,
    description: data.overview,
    keywords: [data.title],
    openGraph: {
      images: [`https://image.tmdb.org/t/p/original${data.backdrop_path}`],
      title: data.title,
      description: data.overview,
    },
    twitter: {
      card: "summary_large_image",
      creator: '@mahmovdsayed',
      title: data.title,
      description: data.overview,
      images: [`https://image.tmdb.org/t/p/original${data.backdrop_path}`],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const page = ({}: IProps) => {
  return (
    <>
      <MovieDetails />
    </>
  );
};

export default page;
