module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'xo',
        'plugin:import/recommended',
        'plugin:security/recommended',
        'plugin:unicorn/recommended',
    ],
    overrides: [
        {
            files: ['*.ts'],
            extends: ['xo-typescript/space'],
        },
    ],
    settings: {
        'import/resolver': {
            typescript: {
                project: 'tsconfig.json',
            },
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
        tsconfigRootDir: './',
    },
    plugins: ['@typescript-eslint', 'import', 'security', 'unicorn', '@babel'],
    rules: {
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'max-classes-per-file': 'off',
        'max-len': [
            'error',
            {
                code: 80,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreComments: true,
            },
        ],
    },
};
