export const MOVE_HAND = 'MOVE_HAND'
export const MOVE_HEAD = 'MOVE_HAND'

// Actions for incoming Data
export const moveHead = (data) => (
  { type: MOVE_HEAD, payload: { data } });
export const moveHand = (data) => (
  { type: MOVE_HAND, payload: { data } });

