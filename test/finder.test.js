'use strict';

const finder = require('../src/finder');

const NOOP = function noop() {}; /* eslint-disable-line no-empty-function */ // Intentional no-op.

describe('finder()', function () {

	it.each([
		undefined,
		null,
		42,
		'42',
		true,
		false,
		{},
		NOOP,
	])('throws when passed an invalid word list (%p)', function (words) {
		expect(() => {
			finder(words);
		})
			.toThrow(/^Word list must be an array\.$/);
	});

	it.each([
		undefined,
		null,
		42,
		true,
		false,
		[],
		{},
		NOOP,
	])('ignores non-string word-list items (%p)', function (item) {
		const result = finder(['abcd', item, 'dcba']);

		expect(result).toStrictEqual([['abcd', 'dcba']]);
	});

	it('ignores empty word-list items', function () {
		const result = finder(['abcd', '', 'dcba']);

		expect(result).toStrictEqual([['abcd', 'dcba']]);
	});

	it('returns an empty array for an empty word list', function () {
		const result = finder([]);

		expect(result).toStrictEqual(expect.any(Array));
		expect(result).toHaveLength(0);
	});

	it('returns an empty array when no anagrams are found', function () {
		const result = finder(['abc', 'def', 'ghi', 'jkl']);

		expect(result).toStrictEqual(expect.any(Array));
		expect(result).toHaveLength(0);
	});

	it('returns a properly-sorted and filtered list of anagram groups', function () {
		expect(finder([
			'not-anagram',
			'abcd',
			'efg',
			'hi',
			'bcda',
			'fge',
			'ih',
			'cdab',
			'gfe',
			'dabc',
			'non-anagram',
		]))
			.toMatchSnapshot();
	});

});
