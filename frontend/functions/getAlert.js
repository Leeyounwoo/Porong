import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export function getAlert(remoteMessage) {
  console.log('새로운 알림', remoteMessage);
  const alertId = 'A' + uuid.v4();
  const alertType = remoteMessage.data.alertType;
  const messageId = remoteMessage.data.messageId;
  const senderNickname = remoteMessage.data.senderNickname;
  const place = remoteMessage.data.place;
  const senderProfile = remoteMessage.data.senderProfile;
  let time = '';

  switch (alertType) {
    // 알림 저장, 메세지 위치 저장
    case 'message_condition':
      time = remoteMessage.data.time;
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
          time: time,
          senderProfile: senderProfile,
        }),
      )
        .then(() => {
          console.log('message_condition 알림 저장 성공');
        })
        .catch(err => {
          console.log('message_condition 알림 저장 실패', err);
        });
      // 메세지 위치 저장
      AsyncStorage.setItem(
        messageId,
        JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        }),
      )
        .then(() => {
          AsyncStorage.getItem(messageId, (err, result) => {
            console.log('message_condition 메세지 저장 성공', result);
          });
        })
        .catch(err => {
          console.log('message_condition 메세지 저장 실패', err);
        });
      break;

    // 알림 저장, 메세지 삭제, 받은 메세지 Set 추가
    case 'message_receive':
      AsyncStorage.setItem(
        alertId,
        JSON.stringify({
          messageId: messageId,
          alertType: alertType,
          senderNickname: senderNickname,
          isChecked: false,
          place: place,
          senderProfile: senderProfile,
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
      // 열람 메세지에 추가
      AsyncStorage.getItem('receivedMessages', (err, result) => {
        if (result === null) {
          const receivedMessages1 = new Set();
          receivedMessages1.add(messageId);
          console.log(
            '없음',
            receivedMessages1,
            JSON.stringify(Array.from(receivedMessages1)),
          );
          AsyncStorage.setItem(
            'receivedMessages',
            JSON.stringify(Array.from(receivedMessages1)),
          ).then(
            AsyncStorage.getItem('receivedMessages', (err, result) => {
              console.log('이후', result);
            }),
          );
        } else {
          const receivedMessages = new Set(JSON.parse(result));
          console.log('있음', receivedMessages);
          receivedMessages.add(messageId);
          AsyncStorage.setItem(
            'receivedMessages',
            JSON.stringify(Array.from(receivedMessages)),
          );
        }
      });
      break;
  }
}
