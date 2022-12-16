import { getApiData } from '../config/apiHelper';
import BaseSetting from '../config/settings';

export const handleNotification = (notification) => {
  console.log('notification', notification);
  udpatedNotificationStatus(notification.notificationID);
};

export const udpatedNotificationStatus = (notificationID) => {
  const data = {
    notificationID: notificationID,
    status: 'Closed',
  };
  getApiData(BaseSetting.endpoints.updateNotificationStatus, 'post', data)
    .then((result) => {
      console.log(
        '🚀 ~ file: notification.js ~ line 9 ~ .then ~ result',
        result,
      );
    })
    .catch((err) => {
      console.log('🚀 ~ file: notification.js ~ line 13 ~ .catch ~ err', err);
    });
};
