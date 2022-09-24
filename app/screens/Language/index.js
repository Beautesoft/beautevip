import { t } from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import styles from './styles';
import AuthAction from '../../redux/reducer/auth/actions';

export default function Language({ navigation }) {
  const { t, i18n } = useTranslation();

  const { setCurrentLanguage } = AuthAction;
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state) => state.auth);

  const [selectedLanguage, setselectedLanguage] = useState(currentLanguage);

  const [selectedAdd, setselectedAdd] = useState('en');

  const AddressList = [
    {
      id: 1,
      title: '简体中文 （Simplified)',
      lang: 'sim',
    },
    {
      id: 2,
      title: '繁體中文（Traditional)',
      lang: 'trad',
    },
    {
      id: 3,
      title: 'English',
      lang: 'en',
    },
  ];

  const changeLanguageNew = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        setselectedAdd(value);
        dispatch(setCurrentLanguage(value));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CHeader
        title={t('changeLanguage')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          data={AddressList}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <View style={styles.addCont}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    changeLanguageNew(item.lang);
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.Poppins_Medium,
                      fontSize: 20,
                      color: BaseColor.amberTxt,
                      flex: 1,
                    }}>
                    {item.title}
                  </Text>
                  <Image
                    source={
                      selectedAdd == item?.lang ? Icons.checked : Icons.uncheck
                    }
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
