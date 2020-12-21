## Introduction
This package implements an anagram finder which locates groups of anagrams in a word list.

## Installation
**anagram-finder** can be installed as a package dependency or globally and can be run on the command line.

```
npm install [--global] anagram-finder-#.#.#.tgz 
```

### Prerequisites
* **Node.js 14+** - ECMAScript 11 (2020) features are used.
* **Package TGZ** - This package is not published to NPM, so download the TGZ from the releases page.

### Usage
Require the package to use it as a library.

```js
const finder = require('anagram-finder');

let words;

// Do something to load the word list.

const results = finder(words);
```

Use the included executable to run it on the command line.

```shell
# Print usage information.
$ anagram-finder --help

# Use a word list from a file.
$ anagram-finder ./wordlist

# Read a wordlist from stdin.
$ curl --silent https://example.com/wordlist | anagram-finder

# Provide words manually from stdin.
$ anagram-finder
koas
adorer
oaks
roared
soak
<Ctrl-D>

# Use NPX to run from package dependencies.
$ npx anagram-finder ./wordlist
```

## API
The package exports a function, and the executable provides a CLI.

### Package
```ts
function finder(words: Number[]): String[][])
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `words` | `Number[]` | A list of words in which to find anagrams. |
| **Returns** | `String[][]` | A list of anagram group lists containing all found anagrams, sorted by number of group items descending. |

### CLI
```shell
[npx] anagram-finder [OPTIONS] [<file>]
```

The CLI can read the word list from `<file>` or from `stdin`.

| Option | Description |
|--------|-------------|
| `--help`, `-h` | Print usage information. |
| `--stats`, `-s` | Print statistics instead of the normal output. |

#### Modes
* **Normal** - Prints all anagram groups, starting with the group having the most words.
   ```
   $ anagram-finder wordlist
   koas, oaks, okas, soak
   adorer, roared
   ``` 
* **Statistics** - Prints statistics about the run and the anagram groups.
   ```
   $ anagram-finder --stats wordlist
   Anagram Group Count: 2 groups
   Largest Group:       4 (koas, ...)
   Longest Words:       6 (adorer, ...)
   Timings:
     Read Words:        0.001s
     Process Words:     0s
   ```

## Tests
A test suite is provided and can be run using the NPM test command.

```shell
npm test
```
