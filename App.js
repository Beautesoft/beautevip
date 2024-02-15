import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavStart from './app/navigation';
import { persistor, store } from './app/redux/store/configureStore';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ModalPortal } from 'react-native-modals';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
export default function App() {
  useEffect(() => {
    handleUseffect();
  }, []);
  const handleUseffect = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('remoteMessage onNotificationOpenedApp', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log('remoteMessage getInitialNotification', remoteMessage);
      });
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'#0000'}
      />
      <StripeProvider
        publishableKey={'pk_test_GGEOsV78TJcV1OcvWcaH6lnz'}
        merchantIdentifier="merchant.beautesoft.Nailqueen">
        <Provider store={store}>
          <PersistGate loading={false} persistor={persistor}>
            <NavigationContainer>
              <NavStart />
            </NavigationContainer>
          </PersistGate>
          <ModalPortal />
        </Provider>
      </StripeProvider>
    </>
  );
}
