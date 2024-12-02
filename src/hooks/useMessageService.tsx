import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PUT} from '@/utils/api/api';

function useMessageService() {
  useEffect(() => {
    async function initialize() {
      const authStatus = await messaging().requestPermission();
      const isSuccess =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      const token = await messaging().getToken();

      if (!isSuccess) {
        console.warn(
          `fail to get FCM permission: ${authStatus} [token: ${token}]`,
        );
        return;
      }

      PUT('/api/v2/homeless-app/device-id', {
        body: JSON.stringify({
          deviceId: token,
        }),
      })
        .then(({status, statusText}) => {
          // TODO 테스트했을 때 token을 계속 등록할 수 있길래, 우선은 기록차 로그 남겨둠 (이후에 불필요하다고 생각들면 삭제할 것)
          if (status !== 200) {
            throw Error(
              `divice id 등록 실패 | status: ${status} | details: ${statusText}\n - token : ${token}`,
            );
          }
          console.log(`divice id 등록 성공\n - token : ${token}`);
        })
        .catch(console.error);
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
