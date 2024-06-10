import DeviceInfo from 'react-native-device-info';

const getDeviceID = async () => {
  const deviceID = await DeviceInfo.getUniqueId();
  return deviceID;
};

export default getDeviceID;
