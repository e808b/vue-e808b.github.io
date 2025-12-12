/*
import js from '@eslint/js'

export default [
  js.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
]
*/

import vue from 'eslint-plugin-vue'
import prettier from '@vue/eslint-config-prettier'

export default [
  {
    files: ['**/*.js', '**/*.vue'],
    ignores: ['node_modules/'],

    rules: {
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  },

  vue.configs['flat/recommended'],
  prettier
]
