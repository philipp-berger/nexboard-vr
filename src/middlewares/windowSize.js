// @flow

// import { resizeWindow } from '../actions/windowSizeActions.js';

const windowSizeMiddleware = (store: Store<*, *>) => {
  // installWindowListeners(store);
  // This middleware doesn't listen to dispatched actions
  return (next: () => void) => next;
};

// const installWindowListeners = (store: Store<*, *>) => {
//   window.addEventListener('resize', () => {
//     store.dispatch(resizeWindow(window.innerWidth, window.innerHeight));
//   });
// };

export default windowSizeMiddleware;
