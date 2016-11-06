import Axios from 'axios';

/*
* action creators
*/
export const addPollSuccess = (poll)=>
  ({type: 'ADD_POLL', poll});
export const addUserSuccess = (user)=>
  ({type: 'ADD_USER', user});
export const fetchPollsSuccess = (polls)=>
  ({type: 'SET_POLLS', polls});
export const setErr = (err)=>
  ({type: 'SET_ERR', err});

export const fetchPolls = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(appUrl+'/polls-api')
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchPollsSuccess(JSON.parse(response)));
      })
      .catch(error => {
        dispatch(setErr(error))
      });
  };
};
export const fetchUser = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(appUrl+'/user-api')
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(addUserSuccess(JSON.parse(response)));
      })
      .catch(error => {
        dispatch(setErr(error))
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
        dispatch(addPollSuccess(JSON.parse(response)));
        addPollToUser();//todo
      })
      .catch(error => {
        dispatch(setErr(error))
      });
  };
};
