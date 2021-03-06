/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/* eslint-disable no-console */

const watch = require('@cnakazawa/watch');
const globby = require('globby');
const path = require('path');

const {runNodeBin, yarn} = require('./util/run');

/**
 * Filter file/dir paths containing static files so that they can be watched to
 * trigger `yarn copyfiles`
 *
 * @param {string} filename project relative path of file
 * @return true if the file/dir must be watched
 */
function filterStaticFiles(filename) {

	// Only watch things under 'packages'

	if (filename !== 'packages' && !filename.startsWith('packages/')) {
		return false;
	}

	const parts = filename.split(path.sep);

	// Include project subfolders

	if (parts.length < 3) {
		return true;
	}

	// Only watch files inside 'src' inside projects

	if (parts[2] !== 'src') {
		return false;
	}

	// Ignore TypeScript files

	if (filename.endsWith('.ts')) {
		return false;
	}

	// Ignore test files

	if (filename.includes('__tests__')) {
		return false;
	}

	return true;
}

// Watch changes to TypeScript files to trigger `tsc`

runNodeBin.pipe(
	'tsc',
	'--build',
	...globby.sync('packages/*/tsconfig.json'),
	'--watch'
);

// Watch changes to static files to trigger `yarn copyfiles`

watch.watchTree(
	'.',
	{filter: filterStaticFiles, ignoreDotFiles: true, interval: 1},
	(filename, curr, prev) => {
		if (typeof filename == 'object' && prev === null && curr === null) {
			console.log(
				'Watching',
				Object.keys(filename).length,
				'static files/directories'
			);
		}
		else if (curr.nlink === 0) {

			// Removed file

		}
		else {
			const parts = filename.split(path.sep);

			console.log(
				'File',
				filename,
				'changed: triggering `copyfiles` task'
			);

			if (parts.length < 2) {
				return;
			}

			yarn.pipe('run', 'copyfiles', {
				cwd: path.join('packages', parts[1]),
			});
		}
	}
);
