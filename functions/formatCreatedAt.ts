export function formatCreatedAt(createdAt: string): string {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const elapsedMilliseconds = currentDate.getTime() - createdDate.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);

  if (elapsedYears > 0) {
    return `${elapsedYears} year${elapsedYears !== 1 ? "s" : ""} ago`;
  } else if (elapsedMonths > 0) {
    return `${elapsedMonths} month${elapsedMonths !== 1 ? "s" : ""} ago`;
  } else if (elapsedDays > 0) {
    return `${elapsedDays} day${elapsedDays !== 1 ? "s" : ""} ago`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hour${elapsedHours !== 1 ? "s" : ""} ago`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minute${elapsedMinutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${elapsedSeconds} second${elapsedSeconds !== 1 ? "s" : ""} ago`;
  }
}


