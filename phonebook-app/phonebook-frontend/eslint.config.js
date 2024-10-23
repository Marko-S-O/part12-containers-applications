import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,  // Move parser inside languageOptions
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': 'warn',  // Example rule for unused variables
      'no-console': 'warn',      // Warn on console.log usage
    },
  },
];