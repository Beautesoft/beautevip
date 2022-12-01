import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { theme } from '../redux/reducer/theme';

export default function CLoader(props) {
  const { loader, loadingText = 'Loading...' } = props;
  return (
    <>
      <Modal visible={loader} transparent style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: theme().white,
              borderRadius: 12,
              padding: 16,
            }}>
            <ActivityIndicator size="large" color={theme().black} />
            <Text style={{ color: theme().black, fontSize: 18, marginTop: 16 }}>
              {loadingText}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
