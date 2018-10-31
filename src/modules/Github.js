import Api from '../network/Api';

// const REQUEST_USER = 'Request User from Github API';
const REQUEST_USER_SUCCESS = 'Successfully got User from Github API';
const REQUEST_USER_FAILURE = 'Failed to get User from Github API';

const INITIAL_STATE = {
  users: [],
};

export function requestUser(username) {
  function thunk(dispatch) {
    Api.getUser(username)
      .then(res => {
        dispatch({
          type: REQUEST_USER_SUCCESS,
          payload: {
            user: res.data,
          }
        });
      })
      .catch(err => {
        dispatch({
          type: REQUEST_USER_FAILURE,
          payload: {}
        });
      });
  }
  thunk.interceptInOffline = true;
  thunk.meta = {
    retry: true,
    name: 'requestUser',
    args: [username],
  };
  return thunk;
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REQUEST_USER:
    //   return state;
    case REQUEST_USER_SUCCESS:
      const users = state.users.slice().concat(action.payload.user);
      return { ...state, users};
    case REQUEST_USER_FAILURE:
      return state;
    default:
      return state
  }
};

export default reducer;
