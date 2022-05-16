import AsyncStorage from '@react-native-async-storage/async-storage';

export function getAlert(remoteMessage) {
  console.log('in GetAlert', remoteMessage);
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
      console.log(
        '1',
        alertId,
        alertType,
        messageId,
        senderNickname,
        place,
        time,
      );
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
      console.log('1');
      if (remoteMessage.notification !== undefined) {
        // 알림 저장
        console.log('2');

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
      } else {
        console.log('3');
      }
      const latitude = remoteMessage.data.latitude;
      const longitude = remoteMessage.data.longitude;
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