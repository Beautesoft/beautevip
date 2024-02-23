import React from 'react';
import { StyleSheet } from 'react-native';

import { vw, vh } from '../../config/dimension';
import { theme } from '../../redux/reducer/theme';
export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme().darkGrey,
      flex: 1,
      marginTop: -16,
      paddingTop: 24,
      padding: 24,
    },
    topPart: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    llCont: {
      height: '100%',
      width: '100%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: theme().white,
      marginVertical: vh(20),
    },
    dateTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: vh(5),
    },
    head: {
      height: 40,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tableText: {
      margin: 5,
      color: theme().white,
    },
  });
};
