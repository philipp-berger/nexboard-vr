// @flow

import windowSize from './windowSize.js';

export default function createProdMiddleware() {
  return [
    windowSize,
  ];
}
