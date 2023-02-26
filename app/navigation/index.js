import React, { useEffect } from 'react';
import { Text, TextInput } from 'react-native';

import i18n from '../language/i18n';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { AppStackNavigator } from "./appStack";
import { AuthStackNavigator } from "./authStack";
// Remove font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function NavStart(props) {

  const { currentLanguage } = useSelector((state) => state.auth);
  const { userData } = useSelector(state => state.auth);
  useEffect(() => {
    changeLanguage(currentLanguage);

  }, [currentLanguage]);

  const changeLanguage = (value) => {
    console.log(
      '🚀 ~ file: index.js ~ line 80 ~ changeLanguage ~ value',
      value,
    );

    try {
      i18n
        .changeLanguage(value)
        .then(() => {
          // setLanguage(value);
        })
        .catch((err) => console.log(err));

    } catch (error) {

    }
  };

  console.log('🚀 ~ file: index.js ~ line 57 ~ NavStart ~ userData', userData);

  return (
    userData !== null && !isEmpty(userData) ?
      <AppStackNavigator />
      :
      <AuthStackNavigator />
  );
}

