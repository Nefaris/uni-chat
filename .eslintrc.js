module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',

    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'max-len': ['error', { code: 140 }],
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
