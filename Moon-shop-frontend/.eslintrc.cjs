module.exports = {
  // Configuration for ESLint
  root: true,
  env: { browser: true, es2020: true },
  // Extending recommended configurations for ESLint and React
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  // Ignoring specified patterns for ESLint
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // Parser options for ECMAScript version and module source type
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  // Settings for React version
  settings: { react: { version: '18.2' } },
  // Plugins used in the configuration, including 'react-refresh' for React Fast Refresh
  plugins: ['react-refresh'],
  // Custom ESLint rules
  rules: {
    // Disable the rule that prevents using target="_blank" in JSX
    'react/jsx-no-target-blank': 'off',
    // Custom rule for React Fast Refresh to only export components
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
