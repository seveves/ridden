const noop = () => {};
global.localStorage = { getItem:noop, setItem:noop, removeItem:noop };

import webpack from 'webpack';

export default function (config, env, helpers) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000/api/v1'),
      'GOOGLE_AUTH_URL': JSON.stringify(process.env.GOOGLE_AUTH_URL || 'http://localhost:3000/auth/google'),
    })
  );
}