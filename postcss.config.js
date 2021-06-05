const cssnano = require('cssnano')({ preset: 'default' });

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.JEKYLL_ENV === 'production' ? [cssnano] : [])
  ]
};
