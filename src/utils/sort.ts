export const sortZtoA = (list: string[]) =>
  list.sort((currentElement, nextElement) => {
    // If element is an empty string "", move it to the end
    if (!currentElement) return 1;
    if (!nextElement) return -1;

    /*
     * Since the app is in English, we should define the locale as UK for string comparison
     * Otherwise the system's default locale will be used and the code may be run on a non UK locale system
     * Which will return a different order for our sort function
     * The function localeCompare returns sort order -1, 1, or 0 (for before, after, or equal)
     */
    return nextElement.localeCompare(currentElement, 'en-GB');
  });

export const sortAtoZ = (list: string[]) =>
  list.sort((currentElement, nextElement) => {
    if (!currentElement) return 1;
    if (!nextElement) return -1;
    return currentElement.localeCompare(nextElement, 'en-GB');
  });

/*
* Sorts numbers in descending order
* If next - current is positive (this means next is bigger than current)
* next is put before current in the list, which results in a descending order

* If next - current is negative (meaning next is smaller than current)
* current is put a ahead of next.

* If next - current is zero (meaning both numbers are the same), both stay in the same position in the array
*/
export const sortHighToLow = (list: number[]) => list.sort((current, next) => next - current);

// Sorts numbers in ascending order
export const sortLowToHigh = (list: number[]) => list.sort((current, next) => current - next);
