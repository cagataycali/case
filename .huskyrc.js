const tasks = arr => arr.join(' && ')

module.exports = {
    'hooks': {
        'pre-commit': tasks([
            'yarn build',
            'yarn lint'
        ]),
        'pre-push': tasks([
            'yarn test', // Run unit & integration tests.
            'yarn docs ', // Generate docs
            'rsync docs/ccase/**/* docs/', // Sync docs
            'rsync assets/* docs/assets/', // Sync assets for documentation readme.
            'rm -rf ./docs/ccase' // Spring cleaning
        ])
    }
}
