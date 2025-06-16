import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
  ignores: [
    'components/ui',
  ],
})
