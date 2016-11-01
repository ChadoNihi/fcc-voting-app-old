export default rootReducer = (state = {}, action)=> {
  switch (action.type) {
    case 'ADD_POLL':
      return update(state, {polls, {push: action.poll}});
    case 'CREATE_POLLS':
      return Object.assign({}, state, {polls: action.polls});
    default:
      return state;
  }
};
