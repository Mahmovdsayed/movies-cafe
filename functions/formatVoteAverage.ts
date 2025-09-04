export const formatVoteAverage = (voteAverage?: number | null): string => {
  if (voteAverage === undefined || voteAverage === null || isNaN(voteAverage)) {
    return "N/A";
  }

  if (voteAverage < 10) {
    return voteAverage.toFixed(1);
  }

  return voteAverage.toFixed(2).substring(0, 4);
};
