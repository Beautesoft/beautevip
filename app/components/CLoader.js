import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import BaseColor from '../config/colors';

export default function CLoader(props) {
  const { loader, loadingText = 'Loading...' } = props;
  return (
    <>
      <Modal visible={loader} transparent style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: BaseColor.white,
              borderRadius: 12,
              padding: 16,
            }}>
            <ActivityIndicator size="large" color={BaseColor.black} />
            <Text
              style={{ color: BaseColor.black, fontSize: 18, marginTop: 16 }}>
              {loadingText}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
