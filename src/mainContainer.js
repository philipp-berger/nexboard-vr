import { connect } from 'react-redux';

//actions
import { moveHand, moveHead, syncHead, syncHand } from './actions'

// Wrapped Component
import Main from './Main.jsx';

const mapStateToProps = (state: ReduxStateType) => ({
  users: state.users,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  syncHand: (id, side, hand) => {
    dispatch(syncHand(id, side, hand));
  },
  syncHead: (id, head) => {
    dispatch(syncHead(id, head));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);