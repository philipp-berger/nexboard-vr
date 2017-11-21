import { connect } from 'react-redux';

//actions
import { moveHand, moveHead } from '../actions'

// Wrapped Component
import Camera from './Camera.jsx';

const mapStateToProps = (state: ReduxStateType) => ({
  // user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  syncHand: (hand) => {
    dispatch(moveHand(hand));
  },
  syncHead: (head) => {
    dispatch(moveHead(head));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);