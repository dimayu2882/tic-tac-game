import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    'no-console': 'warn',
    'eqeqeq': ['error', 'always'],
    'quotes': ['error', 'single'],
    // добавьте другие правила
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        // специфичные правила для этих файлов
      },
    },
  ],
});
