export default rootReducer = (state = {}, action)=> {
  switch (action.type) {
    case 'ADD_POLL':
      return update(state, {polls, {$push: action.poll}});
    case 'ADD_USER':
      return Object.assign({}, state, {user: action.user});
    case 'SET_ERR':
      return Object.assign({}, state, {err: action.err});
    case 'SET_POLLS':
      return Object.assign({}, state, {polls: action.polls});
    default:
      return state;
  }
};
