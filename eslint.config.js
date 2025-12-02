import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {
        ignores: ['README.md']
    },
    { files: ['**/*.{js,mjs,ts}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'prettier/prettier': [
                'error',
                {
                    useTabs: false,
                    tabWidth: 4,
                    semi: true,
                    singleQuote: true,
                    printWidth: 80,
                    trailingComma: 'none',
                    bracketSpacing: true,
                    jsxSingleQuote: false,
                    arrowParens: 'always',
                    endOfLine: 'auto'
                }
            ]
        }
    }
];
