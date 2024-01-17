import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import BaseSetting from '../../config/settings';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';

export default function Feedback({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const [feedback, setfeedback] = useState('');

  const sendFeedback = () => {
    const data = {
      siteCode: userData?.siteCode,
      customerCode: userData?.customerCode,
      date: moment(new Date()),
      Remark: feedback,
    };

    getApiData(BaseSetting.endpoints.feedbackF21, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          Toast.show(result?.result);
          navigation.goBack();
        }
        console.log('🚀 ~ file: index.js ~ line 29 ~ .then ~ result', result);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 31 ~ .then ~ err', err);
      });
  };

  return (
    <>
      <CHeader
        title={t('feedback')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={`${t('feedPh1')}
${t('feedPh2')}`}
            placeholderTextColor={theme().darkAmber}
            style={styles.textInput}
            maxLength={500}
            numberOfLines={10}
            onChangeText={setfeedback}
          />
          {/* <TextInput
            placeholder={`Add Contact Information`}
            placeholderTextColor={theme().darkAmber}
            style={[styles.textInput, { marginTop: 16 }]}
            maxLength={500}
          /> */}
        </View>
        <CButton
          title={t('submit')}
          onPress={() => {
            if (isEmpty(feedback)) {
              Alert.alert('Please enter Feedback!');
            } else {
              sendFeedback();
            }
          }}
        />
      </View>
    </>
  );
}
