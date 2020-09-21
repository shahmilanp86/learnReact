import initialState from '../store/userInitialState';
import appConstants from '../../constants/appConstants';
//combine reducers = https://www.youtube.com/watch?v=fY-Wq0k_9P4&list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK&index=22
const sessionReducer = (state = initialState, action: any) => {
  let updatedState: { [k: string]: any } = {};
  console.info('entered sessionReducer action: ', action);

  const getConfigKey = (key: string) => {
    return appConstants.configs.PREFIX + key;
  };

  switch (action.type) {
    case appConstants.actionNames.increment:
      updatedState = { counter: state.counter + 1 };
      break;
    case appConstants.actionNames.LOGOUT_USER:
      updatedState = {
        clientIdStatus: appConstants.statusEnum.virgin,
        clientId: '',
      };
      break;

    //Clinet ID
    case appConstants.actionNames.LOADING_CLIENT_ID:
      updatedState = {
        clientIdStatus: appConstants.statusEnum.loading,
        clientId: '',
      };
      break;
    case appConstants.actionNames.SET_CLIENT_ID_LOADED:
      updatedState = {
        clientIdStatus: appConstants.statusEnum.loaded,
        clientId: action.clientId,
      };
      break;
    case appConstants.actionNames.SET_CLIENT_ID_ERROR:
      updatedState = {
        clientIdStatus: appConstants.statusEnum.error,
        clientId: '',
      };
      break;
    case appConstants.actionNames.SET_CLIENT_ID_NOT_AUTH:
      updatedState = {
        clientIdStatus: appConstants.statusEnum.notAuth,
        clientId: '',
      };
      break;

    //Clinet Configs

    case appConstants.actionNames.LOADING_CLIENT_CONFIG_PROPS:
      updatedState = {
        clientConfigStatus: appConstants.statusEnum.loading,
      };
      break;

    // case appConstants.actionNames.SET_CLIENT_CONFIG:
    //   updatedState = {
    //     [getConfigKey(action.key)]: action.value,
    //   };
    //   break;

    case appConstants.actionNames.SET_CLIENT_CONFIG_MULT_PROPS:
      updatedState = {
        clientConfigStatus: appConstants.statusEnum.loaded,
      };
      if (action && action.configList && action.configList.forEach) {
        action.configList.forEach((cfg: any) => {
          updatedState[getConfigKey(cfg.key)] = cfg.value;
        });
      }

      break;

    case appConstants.actionNames.SET_CLIENT_CONFIG_ERROR:
      updatedState = {
        clientConfigStatus: appConstants.statusEnum.error,
      };
      break;
  }
  return { ...state, ...updatedState };
};

export default sessionReducer;
