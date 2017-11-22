import { connect } from 'react-redux';

//actions
import { moveHand, moveHead } from './actions'

// Wrapped Component
import Main from './Main.jsx';

const mapStateToProps = (state: ReduxStateType) => ({
  users: state.users,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  syncHand: (id, hand) => {
    dispatch(moveHand(id, hand));
  },
  syncHead: (id, head) => {
    dispatch(moveHead(id, head));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);