/**
 * Truncates a given text to a specified maximum length.
 *
 * @param {string} txt - The input text to be truncated.
 * @param {number} [max=5] - The maximum length to which the text should be truncated. Defaults to 5 if not provided.
 * @returns {string} - The truncated text.
 */

export function textSlicer(txt: string, max: number = 3) {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  return txt;
}
