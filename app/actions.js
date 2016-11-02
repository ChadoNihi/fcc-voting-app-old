import Axios from 'axios';

/*
* action creators
*/
export addPoll = (poll)=>
  ({type: 'ADD_POLL', poll});
export addUser = (user)=>
  ({type: 'ADD_USER', user: user});
export const fetchBooks = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(apiUrl)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchBooksSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
