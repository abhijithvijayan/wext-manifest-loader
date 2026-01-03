import nodeConfig from '@abhijithvijayan/eslint-config/node';
import tsConfig from '@abhijithvijayan/eslint-config/typescript';

export default [
  {
    ignores: ['node_modules/**', 'lib/**', '*.js', '*.mjs'],
  },
  ...nodeConfig({
    files: ['**/*.ts'],
  }),
  ...tsConfig({
    files: ['**/*.ts'],
  }),
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Disable due to resolver issues in ESM
      'import-x/no-duplicates': 'off',
    },
  },
];
