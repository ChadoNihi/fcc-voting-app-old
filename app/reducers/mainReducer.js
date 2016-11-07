export default rootReducer = (state = {}, action)=> {
  switch (action.type) {
    case 'ADD_POLL':
      return update(state, {polls: {$push: action.poll}});
    case 'ADD_USER':
      return Object.assign({}, state, {user: action.user});
    case 'SET_ERR':
      return Object.assign({}, state, {err: action.err});
    case 'SET_POLLS':
      return Object.assign({}, state, {polls: action.polls});
      case 'VOTE':
        /*let updatedPolls = state.polls.slice();
        updatedPolls[updatedPolls.findIndex(pollO=> pollO._id.equals(action.pollId))].optHist[action.opt]++;*/
        return update(state,
          {polls:
            {state.polls.findIndex(pollO=> pollO._id.equals(action.pollId)):
              {optHist: {[action.opt]:
                {$apply: x=> x+1}}}}});
    default:
      return state;
  }
};
