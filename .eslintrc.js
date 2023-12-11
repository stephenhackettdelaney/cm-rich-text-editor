module.exports = {
    // root: true,
    // "extends": [
    //   "eslint:recommended",
    //   "plugin:@typescript-eslint/recommended"
    // ],
  parser: '@typescript-eslint/parser',
  // "parserOptions": { "project": "./tsconfig.json" },
    plugins: [
      'import',
      '@typescript-eslint',
      // "plugin:import/typescript",
    ],
    rules: {
        "no-duplicate-imports": "error",
        // "import/no-unresolved": "error",
        // 'import/extensions': ['error', 'ignorePackages', {
        //   'js': 'never',
        //   'jsx': 'never',
        //   'ts': 'never',
        //   'tsx': 'never',
        // }],
      },
  }
  