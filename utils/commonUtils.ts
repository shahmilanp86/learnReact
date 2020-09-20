import * as Device from 'expo-device';

const isWeb = () => {
  return !(
    Device.modelId &&
    Device.designName &&
    Device.totalMemory &&
    Device.osBuildId &&
    Device.osInternalBuildId
  );
};

export { isWeb };
