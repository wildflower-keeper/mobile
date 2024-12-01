import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

function useMessageService() {
  useEffect(() => {
    async function initialize() {
      const authStatus = await messaging().requestPermission();
      const isSuccess =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      const token = await messaging().getToken();

      console.log(
        `FCM permission isSuccess: ${isSuccess}, stuats: ${authStatus}, token: ${token}`,
      );
      // TODO BE로 전송하기
    }

    initialize();
  }, []);

  useEffect(() => {
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
      console.log('포그라운드에서 push 알림 수신 시', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
}

export default useMessageService;
