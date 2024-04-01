module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['jest-extended/all'],
    testRegex: '(/test/(.*)\\.(test|spec))\\.(ts|js|tsx|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: ['node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)'],
}
