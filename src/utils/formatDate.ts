
/**
* Format a number to ensure it's always 2 digits (e.g., 5 becomes 05).
* 
* @param {number} num - The number to format.
* @returns {string} - The formatted number as a string.
*/
export function formatTime(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}