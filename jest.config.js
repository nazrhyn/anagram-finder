module.exports = {
	collectCoverage: true,

	collectCoverageFrom: [
		'<rootDir>/src/**/*.js',
	],

	projects: [
		// Set up the normal test project.
		{
			displayName: 'test',
			testMatch: ['<rootDir>/test/**/*.test.js'],
		},
		// Set up a second lint project so that linting runs along with the tests.
		{
			displayName: 'lint',
			runner: 'jest-runner-eslint',
			testMatch: [
				'<rootDir>/src/**/*.js',
				'<rootDir>/test/**/*.test.js',
			],
		},
	],

	testEnvironment: 'node',
};
