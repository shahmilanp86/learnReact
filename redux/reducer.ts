import * as initialState from './../redux/initialState';

const sessionReducer = (state = initialState, action: any) => {
  let updatedState = {};
  console.warn('entered here action: ', action);
  switch (action.type) {
    case 'USER_AUTHORIZED':
      console.warn('entered here : ', updatedState);
      updatedState = {
        isAuthorized: true,
      };
      console.warn('entered here Done : ', updatedState);
      break;
  }
  return { ...state, ...updatedState };
};

export default sessionReducer;
