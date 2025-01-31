import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';

const ChangePassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const sendMail = async () => {
    try {
      const config = {
        url: '/sendmailotp',
        method: 'post',
        baseURL: 'https://justbuygold.co.in/api/v1/user/auth',
        headers: {'content-type': 'application/json'},
        data: {
          email: email,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);

        navigation.navigate('EmailOtp', {email});
      } else {
        console.error('Request failed with status code:', res.status);
        console.error('Response data:', res.data); // Log the response data for debugging
      }
    } catch (error) {
      console.log(error);
      Alert.alert(`${error.response.data.error}`);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.reg}>
          <View style={styles.updatepro}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesome6 name="arrow-left-long" size={20} color="white" />
            </TouchableOpacity>
            <Text style={[styles.cabs, {paddingLeft: 10}]}>Back</Text>
          </View>
          <View style={styles.register}>
            <Text style={styles.text1}>Reset Password !</Text>
          </View>
          <View style={styles.back}>
            <Text style={styles.contant}>Email</Text>
            <View style={styles.regback}>
              <Ionicons name="mail" style={styles.icons} />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={email => setEmail(email)}
                placeholder="Enter your register email id"
                keyboardType="email-address"
              />
            </View>
            <View style={[styles.regback1, {marginTop: 20, marginBottom: 10}]}>
              <TouchableOpacity
                onPress={() => {
                  sendMail();
                }}>
                <Text style={styles.btn}>Send Instructions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3d25b',
  },
  reg: {
    width: '100%',
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
  img: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  profiles: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 170,
  },
  register: {
    position: 'relative',
    marginTop: 110,
  },
  text1: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  back: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative',
  },
  regback: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icons: {
    position: 'absolute',
    zIndex: 999,
    left: 8,
    fontSize: 22,
    color: '#874701',
  },
  icons2: {
    position: 'absolute',
    zIndex: 999,
    right: 8,
    fontSize: 22,
    color: '#874701',
  },
  input: {
    height: 45,
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 6,
    color: 'black',
    // padding: 15,
    paddingLeft: 33,
    width: '100%',
    borderColor: '#874701',
    backgroundColor: 'white',
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    fontFamily: 'Poppins-MediumItalic',
  },
  contant: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
  },
  btn: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: '#874701',
    color: 'white',
    padding: 12,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    width: '100%',
  },
});
