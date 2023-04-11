module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.svg$': 'jest-transformer-svg',
        '^.+\\.scss$': 'jest-scss-transform',
    }
}
