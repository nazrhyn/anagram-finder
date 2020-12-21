## Introduction
This package implements an anagram finder which locates groups of anagrams in a word list.

## Installation
**anagram-finder** can be installed as a package dependency or globally and can be run on the command line.

```
npm install [--global] anagram-finder-#.#.#.tgz 
```

### Prerequisites
* **Operating System** - This code should work on any operating system supported by Node.js.
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
<Ctrl-D> # Or the equivalent for your operating system.

# Run from package dependencies with NPX.
$ npx anagram-finder ./wordlist
```

## API
The package exports a function, and the executable provides a CLI.

### Package
```ts
function finder(words: Number[]): String[][])
```

Words that are not strings or are empty strings will be silently ignored.

| Parameter | Type | Description |
|-----------|------|-------------|
| `words` | `String[]` | A list of words in which to find anagrams. |
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

The CLI provides some feedback via the exit code.

| Exit Code | Description |
|-----------|-------------|
| `0` | Success. |
| `1` | Invalid argument configuration. |
| `2` | An unexpected error occurred. |

#### Modes
The CLI operates in one of two modes.
* **Normal** - Prints all anagram groups, ordered descending by group word count.
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

Two projects are configured:
* **`test`** - Runs the unit tests.
* **`lint`** - Runs the lint rules against code and test files.

Coverage is configured and will print along with the test run output and will be written to the `coverage/` folder.

## Notes
* Transpilation or just not using newer language features could make this work on more Node.js versions or on older browsers, but that is not one of the goals of this project.
* Since there is no build step here, I haven't hooked this up to any Continuous Integration. During development, Jest's watch mode is sufficient.
* A cool future change would be to switch the `finder(...)` function to accept an `Iterable<String>` and wrap the stream reads in an async generator so that the whole list doesn't have to be read into memory before processing it. It wouldn't completely avoid loading the words into memory, though, as we still have to collect them for the desired output.
* The CLI _is not tested_ at this time as it would require restructuring to allow for that. Generally, I don't like changing code just to make it more testable when there's no mechanical or functional motivation for doing so. At just over 200 lines, it is not long enough for me to want to start splitting it up for organizational or structural reasons.
* The use of snapshots in Jest is sometimes contentious. My philosophy is generally that it is okay if the desire is to verify a complex structure where the structure and values matter the most. Earlier tests _could_ have also used snapshots, but in those cases, the assertions were more specific and easy enough to state without doing so.
* Hiding the message from unexpected errors might be desirable in the CLI, but I decided to leave it exposed for transparency. Maybe the user wants to know what the problem was so that they can contribute a pull request!
