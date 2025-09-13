import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 6;
const EmailOtp = ({navigation, route}) => {
  const {email} = route.params;

  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask(f => !f);
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const mailOtp = async () => {
    try {
      const config = {
        url: '/verifyOtpEmail',
        method: 'post',
        baseURL: 'https://justbuynewbackend.onrender.com/api/v1/user/auth',
        headers: {'content-type': 'application/json'},
        data: {
          email: email,
          otp: value,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        Alert.alert('Email otp verified !');
        await AsyncStorage.setItem(
          'ueserforgot',
          JSON.stringify(res.data.success),
        );
        navigation.navigate('NewPassword');
      }
    } catch (error) {
      Alert.alert(`${error.response.data.error}`);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={styles.container1}>
        <ScrollView>
          <View style={styles.updatepro}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesome6 name="arrow-left-long" size={20} color="white" />
            </TouchableOpacity>
            <Text style={[styles.cabs, {paddingLeft: 10}]}>Back</Text>
          </View>

          <View style={styles.inotp}>
            <Text style={styles.title}>Enter 6 Digits Code </Text>
            <Text style={styles.addtitle}>
              Enter the 6 digits code that you received on your email.
            </Text>
            <View style={styles.fieldRow}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
              {/* <Text style={styles.toggle} onPress={toggleMask}>
                {enableMask ? (
                  <Entypo
                    name="eye-with-line"
                    size={20}
                    style={{marginLeft: 10}}
                    color="#874701"
                  />
                ) : (
                  <Entypo
                    name="eye"
                    size={20}
                    style={{marginLeft: 10}}
                    color="blue"
                  />
                )}
              </Text> */}
            </View>
            <View style={[styles.regback1, {marginTop: 20, marginBottom: 10}]}>
              <TouchableOpacity
                onPress={() => {
                  mailOtp();
                }}>
                <LinearGradient
                  colors={['#874701', '#874701']}
                  style={styles.linearGradient}>
                  <Text style={styles.btn}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {/* </ImageBackground> */}
        </ScrollView>
      </View>
    </>
  );
};

export default EmailOtp;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3d25b',
  },
  inotp: {
    marginTop: '50%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  root: {flex: 1, padding: 20},
  title: {
    // textAlign: 'center',
    fontSize: 22,
    color: 'white',
    marginTop: 20,
    fontWeight: '700',
  },
  addtitle: {fontSize: 17, color: 'black'},
  codeFiledRoot: {marginTop: 20},
  fieldRow: {
    height: 50,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'space-between',
  },
  cell: {
    width: 36,
    height: 36,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 15,
    borderRadius: 6,
    borderColor: 'blue',
    backgroundColor: 'white',
  },
  toggle: {
    width: 45,
    height: 45,
    lineHeight: 33,
    fontSize: 30,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },

  btn: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: '#874701',
    color: 'white',
    fontWeight: '700',
    padding: 2,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
  },
  updatepro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  cabs: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
