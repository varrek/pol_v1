/**
 * Tests for poll URL routing (hash parsing and URL building).
 */

import { parsePollIdFromHash, getPollUrl } from './poll-routing';

describe('poll-routing', () => {
  describe('parsePollIdFromHash', () => {
    test('returns poll ID when hash is #poll/<id>', () => {
      expect(parsePollIdFromHash('#poll/poll_1')).toBe('poll_1');
      expect(parsePollIdFromHash('#poll/poll_42')).toBe('poll_42');
    });

    test('returns null when hash is empty or not a poll hash', () => {
      expect(parsePollIdFromHash('')).toBeNull();
      expect(parsePollIdFromHash('#other')).toBeNull();
      expect(parsePollIdFromHash('#poll')).toBeNull();
      expect(parsePollIdFromHash('poll_1')).toBeNull();
    });

    test('decodes encoded poll ID', () => {
      expect(parsePollIdFromHash('#poll/' + encodeURIComponent('poll_1'))).toBe('poll_1');
    });
  });

  describe('getPollUrl', () => {
    test('builds full URL with origin, pathname and hash', () => {
      const url = getPollUrl('poll_1', 'http://localhost:8080', '/');
      expect(url).toBe('http://localhost:8080/#poll/poll_1');
    });

    test('encodes poll ID in hash', () => {
      const url = getPollUrl('poll_1', 'https://example.com', '/app/');
      expect(url).toBe('https://example.com/app/#poll/poll_1');
    });
  });
});
