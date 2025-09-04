export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)} ...`;
  }
  return text;
};
