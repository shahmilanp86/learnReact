// export abstract class appConstants {
// //   static readonly STUDENT_NAMES: string[] = ['JOHN', 'BOB', 'NICK'];
// //   static readonly TEACHER_NAME: string[] = ['HARRY', 'CHRIS'];
// //   static readonly SCHOOL_CODE: number[] = [100, 102, 107];

// }

const configPreFix = 'config_';
const appConstants = {
  configs: {
    PREFIX: configPreFix,
    BRAND_NAME: configPreFix + 'brandName',
    COUNTRY_DIAL_CODE: configPreFix + 'countryDialCode',
    BULK_SMS_SUBSCRIPTION: configPreFix + 'bulkSMSSubscription',
    WHATS_APP_ALLOWED: configPreFix + 'whatsAppAllowed',
    INSIGHTS_DISABLED: configPreFix + 'insightsDisabled',
    SMS_APPOINTMENT_TEMPLATE: configPreFix + 'smsAppointmentTemplate',
    SMS_CUSTOM_TEMPLATE: configPreFix + 'smsCustomTemplate',
    MESSAGE_PREFIX_TEMPLATE: configPreFix + 'messagePrefixTemplate',
    MESSAGE_POSTFIX_TEMPLATE: configPreFix + 'messagePostfixTemplate',
    MESSAGE_APPOINTMENT_TEMPLATE: configPreFix + 'messageAppointmentTemplate',
    MESSAGE_CUSTOM_TEMPLATE: configPreFix + 'messageCustomTemplate',
    MESSAGE_BUSINESS_INFO_TEMPLATE:
      configPreFix + 'messageBusinessInfoTemplate',
    FIREBASE_STORAGE_PATH: configPreFix + 'firebaseStoragePath',
  },
  actionNames: {
    LOGOUT_USER: 'LOGOUT_USER',

    LOADING_CLIENT_ID: 'LOADING_CLIENT_ID',
    SET_CLIENT_ID_LOADED: 'SET_CLIENT_ID_LOADED',
    // SET_STATUS_CLIENT_ID: 'SET_STATUS_CLIENT_ID',
    SET_CLIENT_ID_ERROR: 'SET_CLIENT_ID_ERROR',
    SET_CLIENT_ID_NOT_AUTH: 'SET_CLIENT_ID_NOT_AUTH',

    LOADING_CLIENT_CONFIG_PROPS: 'LOADING_CLIENT_CONFIG_PROPS',
    SET_CLIENT_CONFIG: 'SET_CLIENT_CONFIG',
    SET_CLIENT_CONFIG_MULT_PROPS: 'SET_CLIENT_CONFIG_MULT_PROPS',
    SET_CLIENT_CONFIG_ERROR: 'SET_CLIENT_CONFIG_ERROR',
    // SET_STATUS_CLIENT_CONFIG: 'SET_STATUS_CLIENT_CONFIG',

    increment: 'increment',
  },
  statusEnum: {
    loading: 'loading',
    error: 'error',
    notAuth: 'notAuth',
    loaded: 'loaded',
    virgin: 'virgin', // not yet loaded
  },
};

export default appConstants;
