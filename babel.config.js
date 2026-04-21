module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@modules': './src/modules',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
          '@types': './src/types',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
  ],
  presets: ['module:@react-native/babel-preset'],
};
