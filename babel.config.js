const presets = [
  [
    '@babel/env',
    {
      targets: '> 0.25%, not dead',
      corejs: 3.6,
      useBuiltIns: 'entry'
    }
  ]
];

const plugins = [
  '@babel/plugin-proposal-class-properties'
];

module.exports = { presets, plugins };
