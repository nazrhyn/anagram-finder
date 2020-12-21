'use strict';

/**
 * Finds all anagram groups in a word list.
 * @param {String[]} words The words.
 * @returns {Array<String[]>} A list of anagram groups, sorted by largest group, descending.
 */
module.exports = function (words) {
	if (!Array.isArray(words)) {
		throw new Error('Word list must be an array.');
	}

	const groups = new Map();

	for (const word of words) {
		if (!word) {
			continue;
		}

		const id = _getWordId(word);

		let group = groups.get(id);

		if (!group) {
			group = [word];
			groups.set(id, group);
		} else {
			group.push(word);
		}
	}

	// Get all groups having more than one word and sort them descending by group size.
	return [...groups.values()].filter(list => list.length > 1).sort((a, b) => b.length - a.length);
};

/**
 * Gets an ID from a word which is the sorted list of letters within it.
 * @param {String} word The word.
 * @returns {String} The word ID.
 * @private
 */
function _getWordId(word) {
	return [...word].sort().join('');
}
