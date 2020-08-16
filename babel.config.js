module.exports = {
  presets: [
    [
      '@babel/env',
      {
        'targets': {
          'browsers': ['Chrome >= 59'],
          'node': 'current'
        }
      }
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ],
};
