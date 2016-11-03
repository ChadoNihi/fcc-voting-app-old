import Axios from 'axios';

/*
* action creators
*/
export const addPollSuccess = (poll)=>
  ({type: 'ADD_POLL', poll});
export const addUser = (user)=>
  ({type: 'ADD_USER', user});
export const fetchPollsSuccess = (polls)=>
  ({type: 'SET_POLLS', polls});
export const setErr = (err)=>
  ({type: 'SET_ERR', err: 'Failed to load polls: "'+err+'"\nTry to refresh the page.'});

export const fetchPolls = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(appUrl+'/polls-api')
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchPollsSuccess(response.data));
      })
      .catch(error => {
        dispatch(setErr(response.data))
      });
  };
};
export const postPoll = (poll) => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.post(appUrl+'/poll', poll)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(addPollSuccess(response.data));
      })
      .catch(error => {
        dispatch(setErr(response.data))
      });
  };
};
