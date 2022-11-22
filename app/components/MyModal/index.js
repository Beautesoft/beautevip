import { t } from 'i18next';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
//import { Modal } from 'react-native';
import { Modal } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input-view';
import BaseColor from '../../config/colors';
import { FontFamily } from '../../config/typography';
import CButton from '../CButton';

export default function MyModal(props) {
  const {
    visible,
    onPressClose = () => {},
    onCreditInput = (val) => {},
    onSubmit = () => {},
  } = props;

  return (
    <Modal
      visible={visible}
      style={{ flex: 1 }}
      transparent
      animationType="slide">
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: '#ffffff40',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
        onPress={onPressClose}>
        <View
          style={{
            padding: 8,
            backgroundColor: BaseColor.white,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '85%',
          }}>
          <CreditCardInput
            onChange={(val) => onCreditInput(val)}
            cardFontFamily={FontFamily.arial_bold}
            // validColor={BaseColor.whiteColor}
            labelStyle={{ color: BaseColor.black }}
            allowScroll={true}
          />
          <CButton
            title={t('submit')}
            onPress={onSubmit}
            style={{
              position: 'absolute',
              top: '45%',
              width: '90%',
              marginBottom: 30,
              alignSelf: 'center',
              backgroundColor: BaseColor.btnBlue,
            }}
            titleStyle={{
              color: BaseColor.whiteColor,
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
