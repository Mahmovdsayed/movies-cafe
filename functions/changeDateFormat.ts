export function changeDateFormat(created_at: string): string {
  const originalDate = new Date(created_at);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
