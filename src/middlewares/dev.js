// @flow

import createProdMiddleware from './prod.js';

export default function createDevMiddleware() {
  return [
    ...createProdMiddleware(),
  ];
};
