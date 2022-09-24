import { t } from 'i18next';
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  //import { Modal } from 'react-native';
  import { Modal } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import BaseColor from '../../config/colors';
import { FontFamily } from '../../config/typography';
import CButton from '../CButton';


export default function MyModal (props){
    const { visible,
         onPressClose = () => {},
         onCreditInput = (val) =>{},
         onSubmit = () =>{}
        } = props;

    return (
      <Modal visible={visible}
      style={{ flex: 1 }}
        transparent
        animationType="slide"
      >
          <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#ffffff40',
          }}
          onPress={onPressClose}>
                <View
            style={{
              padding: 8,
              backgroundColor: BaseColor.white,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
              paddingVertical: 32,
              paddingBottom: 8,
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
                marginTop: 24,
                margin: 16,
                marginBottom: '75%',
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