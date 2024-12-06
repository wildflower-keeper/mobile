import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PUT} from '@/utils/api/api';

function useMessageService() {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    (async function initialize() {
      const authStatus = await messaging().requestPermission();
      const isSuccess =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      const token = await messaging().getToken();

      if (!isSuccess) {
        console.warn(`fail to get FCM permission: ${authStatus} [${token}]`);
        return;
      }
      setDeviceId(token);

      PUT('/api/v2/homeless-app/device-id', {
        body: JSON.stringify({
          deviceId: token,
        }),
      }).catch(e => console.warn(`fail to register divice id, ${token}`, e));
    })();

    // TODO app push click 시, remoteMessage.data 값을 보고 해당 screen 위치로 보내는 로직 추가 필요
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('종료/백그라운드에서 push 수신 시', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('백그라운드에서 push 클릭', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        console.log('종료 상태에서 push 클릭 시', remoteMessage);
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        // TODO 홈의 알림 닷에 빨간 표시 하게 되는 날이 오지 않을까?
        console.log('포그라운드에서 push 알림 수신 시', remoteMessage);
        return;
      }
    });

    return unsubscribe;
  }, []);

  return {
    deviceId,
  };
}

export default useMessageService;
