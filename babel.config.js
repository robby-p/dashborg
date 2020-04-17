module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    'preval',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-styled-components',
  ],
};
