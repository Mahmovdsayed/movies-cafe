import ActorDetails from "@/Components/sections/ActorDetails";
import { Metadata } from "next";

interface IProps {

}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const id = params.slug;
  const API_KEY = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`
  const options = {
    method: "GET",

    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?language=en-US`,
    options
  );
  const data = await res.json();
  return {
    title: data.name,
    description: data.biography,
    keywords: [data.name],
    openGraph: {
      images: [`https://image.tmdb.org/t/p/original${data.profile_path}`],
      title: data.name,
      description: data.biography,
    },
    twitter: {
      card: "summary_large_image",
      creator: '@mahmovdsayed',
      title: data.name,
      description: data.biography,
      images: [`https://image.tmdb.org/t/p/original${data.profile_path}`],
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
  return <>
    <ActorDetails/>
  </>;
};

export default page;
