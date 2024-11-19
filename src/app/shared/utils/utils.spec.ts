import { toCamelCase, safelyParseJSON, sunsetSunrise } from './utils';

describe('Utils Tests', () => {
  describe('toCamelCase', () => {
    it('should convert text with spaces to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });

    it('should convert text with hyphens to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert text with underscores to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('should convert text with dots to camelCase', () => {
      expect(toCamelCase('hello.world')).toBe('helloWorld');
    });

    it('should handle mixed delimiters correctly', () => {
      expect(toCamelCase('hello-world_test.text')).toBe('helloWorldTestText');
    });

    it('should return an empty string when input is empty', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('should handle single character input', () => {
      expect(toCamelCase('a')).toBe('a');
    });

    it('should preserve camelCase for already camelCase text', () => {
      expect(toCamelCase('helloWorld')).toBe('helloWorld');
    });
  });

  describe('safelyParseJSON', () => {
    it('should parse valid JSON strings', () => {
      expect(safelyParseJSON('{"key": "value"}')).toEqual({ key: 'value' });
    });

    it('should return null for invalid JSON strings', () => {
      expect(safelyParseJSON('invalid-json')).toBeNull();
    });

    it('should handle empty strings', () => {
      expect(safelyParseJSON('')).toBeNull();
    });

    it('should parse JSON arrays', () => {
      expect(safelyParseJSON('[1, 2, 3]')).toEqual([1, 2, 3]);
    });

    it('should handle JSON with nested objects', () => {
      const jsonString = '{"key": {"nestedKey": "nestedValue"}}';
      expect(safelyParseJSON(jsonString)).toEqual({ key: { nestedKey: 'nestedValue' } });
    });

    it('should handle JSON with numbers', () => {
      expect(safelyParseJSON('123')).toBe(123);
    });

    it('should handle JSON with booleans', () => {
      expect(safelyParseJSON('true')).toBe(true);
    });

    it('should handle JSON with null values', () => {
      expect(safelyParseJSON('null')).toBe(null);
    });
  });

  describe('sunsetSunrise', () => {
    it('should handle midnight correctly', () => {
      expect(sunsetSunrise(0)).toBe('00:00');
    });

    it('should handle edge cases with very large timestamps', () => {
      expect(sunsetSunrise(32503680000)).toBe('00:00'); // Year 3000 in UTC
    });

    it('should handle edge cases with negative timestamps (before 1970)', () => {
      expect(sunsetSunrise(-2208988800)).toBe('00:00'); // 1900-01-01 00:00:00 UTC
    });
  });
});
