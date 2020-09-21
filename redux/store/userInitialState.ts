import appConstants from './../../constants/appConstants';
const initialState = {
  isAuthorized: false,
  clientId: '',
  clientIdStatus: appConstants.statusEnum.virgin,
  counter: 0,
  clientConfigStatus: appConstants.statusEnum.virgin,
  // config
  // authPageStatus: appConstants.pageStates.loading,
};
export default initialState;
