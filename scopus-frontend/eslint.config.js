module.exports = {
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/prop-types': 'off',
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'react/react-in-jsx-scope': 'off'
    },
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify")
        }
    }
};