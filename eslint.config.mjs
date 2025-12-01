import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'node/prefer-global/process': 'off',
    'react/no-array-index-key': 'off',
    'react-refresh/only-export-components': 'off',
    'react-dom/no-dangerously-set-innerhtml': 'off',
  },
  ignores: [
    'components/ui',
  ],
})
