import * as initialState from './../redux/initialState';
//combine reducers = https://www.youtube.com/watch?v=t3nMT8bmBw0
const sessionReducer = (state = initialState, action: any) => {
  let updatedState = {};
  console.info('entered sessionReducer action: ', action);
  switch (action.type) {
    case 'USER_AUTHORIZED':
      updatedState = {
        isAuthorized: true,
      };
      break;
  }
  return { ...state, ...updatedState };
};

export default sessionReducer;
