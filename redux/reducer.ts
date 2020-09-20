import * as initialState from './../redux/initialState';
//combine reducers = https://www.youtube.com/watch?v=t3nMT8bmBw0
const sessionReducer = (state = initialState, action: any) => {
  let updatedState = {};
  console.info('entered sessionReducer action: ', action);
  switch (action.type) {
    case 'SET_CLIENT_ID':
      if (action.clientId) {
        console.info('entered sessionReducer  Clinet ID ', action.clientId);
      }
      updatedState = {
        clientId: action.clientId,
      };
      break;
  }
  return { ...state, ...updatedState };
};

export default sessionReducer;
