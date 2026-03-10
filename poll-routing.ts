/**
 * Poll URL routing helpers.
 * Used by unit tests; index.html inlines equivalent logic for the browser.
 */

/**
 * Parses poll ID from a hash string (e.g. "#poll/poll_1").
 * @param hash - location.hash or any hash string
 * @returns poll ID or null if not a poll hash
 */
export function parsePollIdFromHash(hash: string): string | null {
  const match = (hash || '').match(/^#poll\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Builds the full URL for a poll (origin + pathname + hash).
 */
export function getPollUrl(pollId: string, origin: string, pathname: string): string {
  return origin + pathname + '#poll/' + encodeURIComponent(pollId);
}
