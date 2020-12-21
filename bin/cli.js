#!/usr/bin/env node

'use strict';

const finder = require('../src/finder');
const fs = require('fs').promises;
const os = require('os');

_run()
	.catch(function (err) {
		console.error(err.message);
		process.exitCode = 1;
	});

/**
 * Run timing statistics item.
 * @typedef {Object} TimingStatsItem
 * @property {Number[]} start Start time process.hrtime timestamp.
 * @property {String} time Formatted duration time in seconds.
 */

/**
 * Run timing statistics.
 * @typedef {Object} TimingStats
 * @property {TimingStatsItem} readWords Reading words timing.
 * @property {TimingStatsItem} processWords Processing words timing.
 */

/**
 * Run statistics.
 * @typedef {Object} Stats
 * @property {Number} count The number of anagrams found.
 * @property {TimingStats} times The timing stats.
 */

/**
 * Runs the finder, pulling words from stdin or a file.
 * @returns {Promise} A promise that will be resolved when the run is complete.
 * @private
 */
async function _run() {
	const argv = require('minimist')(process.argv.slice(2), {
		alias: {
			help: 'h',
			stats: 's',
		},
		boolean: ['help', 'stats'],
	});

	if (argv.help) {
		_printUsage();
		return;
	}

	let words;
	let stats;

	if (argv.stats) {
		// If the user asked for stats, set up the stats object here. Declare all of the
		//  properties here so that it's clear what shape stats will have.

		/** @type {Stats} */
		stats = {
			count: undefined,
			times: {
				readWords: { start: undefined, time: undefined },
				processWords: { start: undefined, time: undefined },
			},
		};
	}

	if (stats) {
		stats.times.readWords.start = process.hrtime();
	}

	if (!argv._.length) {
		words = await _loadWordsFromStdin();
	} else if (argv._.length === 1) {
		words = await fs.readFile(argv._[0], 'utf8');
	} else {
		_printUsage();
	}

	if (stats) {
		stats.times.readWords.time = _formatHrtime(process.hrtime(stats.times.readWords.start));
		stats.times.processWords.start = process.hrtime();
	}

	let results;

	if (words) {
		// If we have words, then we look for anagrams.
		results = finder(words.split(os.EOL));
	}

	if (stats) {
		stats.times.processWords.time = _formatHrtime(process.hrtime(stats.times.processWords.start));

		_printStats(results, stats);
	} else {
		_printDefault(results);
	}
}

/**
 * Prints usage information to stdout.
 * @private
 */
function _printUsage() {
	console.log(
		'anagram-finder [OPTIONS] [<file>]\n',
		'\n',
		'--help, -h   Print this help.\n',
		'--stats, -s  Print statistics instead of the normal output.\n',
		'\n',
		'<file>       A file to load the words from. If not specified, words will be\n',
		'             loaded from stdin.\n',
	);
}

/**
 * Prints the default output to stdout.
 * @param {Array<Number[]>|undefined} results The finder results.
 * @private
 */
function _printDefault(results) {
	if (!results) {
		return;
	}

	for (const group of results) {
		console.log(group.join(', '));
	}
}

/**
 * Prints statistics to stdout.
 * @param {Array<Number[]>} results The finder results.
 * @param {Stats} stats The stats.
 * @private
 */
function _printStats(results, stats) {
	// Use the number format internationalization library to make the count easier to read.
	const numberFormat = new Intl.NumberFormat();
	const longest = [];

	let longestLength = 0;

	// Find all of the anagram groups with the longest length in one pass.
	for (const group of results) {
		if (group[0].length > longestLength) {
			// Every time we find a new longest, clear out the previously-collected longest groups.
			longestLength = group[0].length;
			longest.length = 0;
		}

		if (group[0].length === longestLength) {
			longest.push(group[0]);
		}
	}

	console.log(
		`Anagram Group Count: ${numberFormat.format(results?.length ?? 0)} groups`,
		`\nLargest Group:       ${results && results.length ? `${results[0].length} (${results[0][0]}, ...)` : '<none>'}`,
		`\nLongest Words:       ${longestLength} ${longest.length ? longest.map(l => `(${l}, ...)`).join(', ') : ''}`,
		`\nTimings:`,
		`\n  Read Words:        ${stats.times.readWords.time}s`,
		`\n  Process Words:     ${stats.times.processWords.time}s`,
	);
}

/**
 * Loads words from stdin.
 * @returns {Promise<String>} The words, separated by a `\n` character.
 * @private
 */
function _loadWordsFromStdin() {
	return new Promise(function (resolve) {
		const buffers = [];

		process.stdin.on('data', function (chunk) {
			// Keep chunks as buffers. If we concat every time, that's using more memory.
			buffers.push(chunk);
		});

		process.stdin.on('end', function () {
			// Concatenate and decode only once.
			resolve(Buffer.concat(buffers).toString('utf8'));
		});
	});
}

/**
 * Formats an hrtime differential in seconds and milliseconds as `ss.mmm`.
 * @param {Number[]} hrtime The hrtime differential.
 * @returns {String} The formatted time.
 * @private
 */
function _formatHrtime(hrtime) {
	const ms = Math.floor(hrtime[1] / 1000000) / 1000;
	return (hrtime[0] + ms).toString();
}
