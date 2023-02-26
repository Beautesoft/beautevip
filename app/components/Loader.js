import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { theme } from '../redux/reducer/theme';
import { FontFamily } from '../config/typography';
import CText from './CText';

export default function Loader(props) {
  const { loader = false, text = 'Loading...' } = props;

  return (
    <Modal style={{ flex: 1 }} transparent visible={loader}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000070',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
          }}>
          <ActivityIndicator size="large" color={'#000'} />
          <CText
            value={text}
            color={theme().black}
            size={20}
            fontFamily={FontFamily.Poppins_Medium}
            style={{
              marginTop: 12,
              textAlign: 'center',
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
