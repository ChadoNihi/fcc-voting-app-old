import Axios from 'axios';
import appUrl from './common/common';

/*
* action creators
*/
const addPollSuccess = (poll)=>
  ({type: 'ADD_POLL', poll});
const addPollToUser = (poll)=>
  ({type: 'ADD_POLL_TO_USER', poll});
const addUserSuccess = (user)=>
  ({type: 'ADD_USER', user});
const fetchPollsSuccess = (polls)=>
  ({type: 'SET_POLLS', polls});
const setErr = (err)=>
  ({type: 'SET_ERR', err});
const voteSuccess = (pollId, opt)=>
  ({type: 'VOTE', pollId, opt});
const voteSuccessUserList = (pollId, opt)=>
  ({type: 'VOTE_IN_USER_LIST', pollId, opt});

export const fetchPolls = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(appUrl+'/polls-api')
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchPollsSuccess(JSON.parse(response.data)));
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
    console.log('before returning promise');
    // Returns a promise
    return Axios.get(appUrl+'/user-api')
      .then(response => {
        // Dispatch another action
        // to consume data
        console.log('fetched user: '+response);
        dispatch(addUserSuccess(JSON.parse(response.data)));
      })
      .catch(error => {
        console.log(error);
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
        dispatch(addPollSuccess(JSON.parse(response.data)));
        dispatch(addPollToUser(poll));
      })
      .catch(error => {
        dispatch(setErr(error))
      });
  };
};
export const postVote = (pollId, opt) => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.post(put+'/poll', {id: pollId, opt})
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(voteSuccess(pollId, opt));
        dispatch(voteSuccessUserList(pollId, opt))
      })
      .catch(error => {
        dispatch(setErr(error))
      });
  };
};
