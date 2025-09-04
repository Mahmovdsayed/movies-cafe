//  adult: false,
//       backdrop_path: '/1RgPyOhN4DRs225BGTlHJqCudII.jpg',
//       genre_ids: [Array],
//       id: 1311031,
//       original_language: 'ja',
//       original_title: '劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来',
//       overview: "As the Demon Slayer Corps members and Hashira engaged in a group strength training program, the Hashira Training, in preparation for the forthcoming battle against the demons, Muzan Kibutsuji appears at the Ubuyashiki Mansion. With the head of the Demon Corps in danger, Tanjiro and the Hashira rush to the headquarters but are plunged into a deep descent to a mysterious space by the hands of Muzan Kibutsuji.  The destination of where Tanjiro and Demon Slayer Corps have fallen is the demons' stronghold – the Infinity Castle. And so, the battleground is set as the final battle between the Demon Slayer Corps and the demons ignites.",
//       popularity: 352.5289,
//       poster_path: '/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg',
//       release_date: '2025-07-18',
//       title: 'Demon Slayer: Kimetsu no Yaiba — Infinity Castle',
//       video: false,
//       vote_average: 7.125,
//       vote_count: 68

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type { MovieType };
