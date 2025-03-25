/**
 * Toggles an item's bookmark state.
 * If the item is already bookmarked, it removes it; otherwise, it adds it.
 *
 * @param {string[]} bookmarkedIds - Current array of bookmarked IDs.
 * @param {string} id - The ID of the item to toggle.
 * @returns {string[]} Updated array of bookmarked IDs.
 */
export const toggleBookmark = (bookmarkedIds, id) => {
  return bookmarkedIds.includes(id)
    ? bookmarkedIds.filter(bookmarkedId => bookmarkedId !== id)
    : [...bookmarkedIds, id]
}
