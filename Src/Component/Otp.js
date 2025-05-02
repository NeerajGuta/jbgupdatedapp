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
  Image,
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
const Otp = ({navigation, route}) => {
  const {phoneno} = route.params;

  // const [number, setnumber] = useState();
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  console.log(value, 'rii32');
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

  const VerfiyOtp = async () => {
    try {
      if (!value) return Alert.alert('Please enter otp');
      const config = {
        url: '/otpVarification',
        method: 'post',
        baseURL: 'https://justbuygold.co.in/api/v1/user/auth',
        headers: {'content-type': 'application/json'},
        data: {
          phoneno: phoneno,
          otp: value,
        },
      };

      let res = await axios(config);
      if (res.status === 200) {
        Alert.alert('Successfully login');
        await AsyncStorage.setItem('user', JSON.stringify(res.data.details));
        navigation.navigate('ReferralScreen');
        setValue('');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        // If the server responds with 400, OTP is incorrect
        Alert.alert('Invalid OTP. Please try again.');
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={styles.container1}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#f3d25b',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome6
                name="arrow-left-long"
                size={20}
                color="white"
                style={{margin: 1}}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inotp}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{width: 100, height: 100}}
                resizemode="cover"></Image>
            </View>
            <Text style={styles.title}>Enter Your Verification Code </Text>
            <Text style={styles.addtitle}>OTP Sent To +91-{phoneno} </Text>
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
              <Text style={styles.toggle} onPress={toggleMask}>
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
              </Text>
            </View>
            <View
              style={[
                styles.regback1,
                {
                  marginTop: 20,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}>
              <TouchableOpacity
                onPress={() => VerfiyOtp()}
                // onPress={() => {
                //   navigation.navigate('Home1');
                // }}
              >
                <LinearGradient
                  colors={['#874701', '#874701']}
                  style={styles.linearGradient}>
                  <Text style={styles.btn}>Verified with OTP</Text>
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

export default Otp;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3d25b',
  },
  inotp: {
    marginTop: '40%',
  },
  root: {flex: 1, padding: 20},
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    marginTop: 20,
    fontWeight: '700',
  },
  addtitle: {textAlign: 'center', fontSize: 18, color: 'black'},
  codeFiledRoot: {marginTop: 20},
  fieldRow: {
    height: 50,
    marginTop: 40,
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: 36,
    height: 36,
    lineHeight: 32,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    borderColor: 'blue',
    backgroundColor: 'white',
    color: 'black',
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
    width: 250,
  },
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    borderRadius: 100,
    width: 250,
  },
});
