import {AsyncStorage} from '@react-native-async-storage/async-storage';

export function getAlert(remoteMessage) {
  const alertId = remoteMessage.data.alertId;
  const alertType = remoteMessage.data.alertType;
  const messageId = remoteMessage.data.messageId;
  const senderNickname = remoteMessage.data.senderNickname;
  const place = remoteMessage.data.place;
  let time = '';

  switch (alertType) {
    // 알림 저장
    case 'message_condition':
      time = remoteMessage.data.time;
      // 알림 저장
      AsyncStorage.setItem(
        alertId,
        JSON.stringify({
          messageId: messageId,
          alertType: alertType,
          senderNickname: senderNickname,
          isChecked: false,
          place: place,
          time: time,
        }),
      )
        .then(() => {
          console.log('message_condition 알림 저장 성공');
        })
        .catch(err => {
          console.log('message_condition 알림 저장 실패', err);
        });
      break;

    // 알림 저장, 메세지 저장
    case 'time_satisfaction':
      const latitude = remoteMessage.data.latitude;
      const longitude = remoteMessage.data.longitude;
      // 알림 저장
      AsyncStorage.setItem(
        alertId,
        JSON.stringify({
          messageId: messageId,
          alertType: alertType,
          senderNickname: senderNickname,
          isChecked: false,
          place: place,
        }),
      )
        .then(() => {
          console.log('time_satisfaction 알림 저장 성공');
        })
        .catch(err => {
          console.log('time_satisfaction 알림 저장 실패', err);
        });
      // 메세지 저장
      AsyncStorage.setItem(
        messageId,
        JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        }),
      )
        .then(() => {
          console.log('time_satisfaction 메세지 저장 성공');
        })
        .catch(err => {
          console.log('time_satisfaction 메세지 저장 실패', err);
        });
      break;

    // 알림 저장, 메세지 삭제
    case 'message_receive':
      AsyncStorage.setItem(
        alertId,
        JSON.stringify({
          messageId: messageId,
          alertType: alertType,
          senderNickname: senderNickname,
          isChecked: false,
          place: place,
        }),
      )
        .then(() => {
          console.log('message_receive 알림 저장 성공');
        })
        .catch(err => {
          console.log('message_receive 알림 저장 실패', err);
        });
      // 메세지 삭제
      AsyncStorage.removeItem(messageId)
        .then(() => {
          console.log('message_receive 메세지 삭제 성공');
        })
        .catch(err => {
          console.log('message_receive 메세지 삭제 실패', err);
        });
      break;
  }
}
