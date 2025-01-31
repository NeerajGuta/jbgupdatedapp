import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignIn() {
  const [phoneno, setPhoneno] = useState('');
  const navigation = useNavigation('');

  const [acc, setAcc] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-with-line');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-with-line');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-with-line') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const loginEmail = async () => {
    try {
      if (!email) {
        return Alert.alert('Email Required !');
      }
      if (!password) {
        return Alert.alert('Password Required !');
      }
      const config = {
        url: '/signin',
        method: 'post',
        baseURL: 'https://justbuygold.co.in/api/v1/user/auth',
        headers: {'content-type': 'application/json'},
        data: {
          email: email,
          password: password,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data.success);
        Alert.alert('Successfully login');
        await AsyncStorage.setItem('user', JSON.stringify(res.data.details));
        navigation.navigate('ReferralScreen');

        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  };

  const Otpsend = async () => {
    try {
      if (!phoneno) {
        return Alert.alert('Phone No Required !');
      }
      const config = {
        url: '/otp',
        method: 'post',
        baseURL: 'https://justbuygold.co.in/api/v1/user/auth',
        headers: {'content-type': 'application/json'},
        data: {
          phoneno: phoneno,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data.success);
        Alert.alert('Otp Sent Your Mobile Number');
        navigation.navigate('Otp', {phoneno});
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.reg}>
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
            <View style={styles.register}>
              <Text style={styles.text1}>Login Now !</Text>
            </View>
            {acc ? (
              <>
                <View style={styles.back}>
                  <Text style={styles.contant}>Email</Text>
                  <View style={styles.regback}>
                    <Ionicons name="mail" style={styles.icons} />

                    <TextInput
                      style={styles.input}
                      value={email}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      onChangeText={email => setEmail(email)}
                    />
                  </View>
                  <Text style={styles.contant}>Password</Text>
                  <View style={styles.regback}>
                    <Icon name="lock" style={styles.icons} />

                    <TextInput
                      style={styles.input}
                      value={password}
                      placeholder="Enter your password"
                      autoCapitalize="none"
                      autoCorrect={false}
                       placeholderTextColor="black"
                      secureTextEntry={passwordVisibility}
                      enablesReturnKeyAutomatically
                      onChangeText={password => setPassword(password)}
                    />
                    <TouchableOpacity onPress={handlePasswordVisibility}>
                      <Entypo
                        name="eye-with-line"
                        style={[styles.icons2, {marginTop: -10, fontSize: 18}]}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setAcc(!acc);
                    }}>
                    <Text
                      style={{
                        color: '#874701',
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'right',
                        fontFamily: 'Poppins-ExtraBoldItalic',
                      }}>
                      Sign In with phone number !
                    </Text>
                  </TouchableOpacity>
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
                    <TouchableOpacity onPress={loginEmail}>
                      <LinearGradient
                        colors={['#874701', '#874701']}
                        style={styles.linearGradient}>
                        <Text style={styles.btn}>Sign In</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: '800',
                      color: 'black',
                    }}>
                    OR
                  </Text>
                  <View
                    style={[
                      styles.regback1,
                      {flexDirection: 'row', justifyContent: 'center'},
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('SignUp');
                      }}>
                      <Text style={styles.btn2}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.back}>
                  <Text style={styles.contant}>Phone No</Text>
                  <View style={styles.regback}>
                    <FontAwesome6 name="phone" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      value={phoneno}
                      placeholder="+91"
                      keyboardType="number-pad"
                       placeholderTextColor="black"
                      onChangeText={phoneno => setPhoneno(phoneno)}
                    />
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => {
                      setAcc(!acc);
                    }}>
                    <Text
                      style={{
                        color: '#874701',
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'right',
                        fontFamily: 'Poppins-ExtraBoldItalic',
                      }}>
                      Sign In with Email !
                    </Text>
                  </TouchableOpacity> */}
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
                    <TouchableOpacity onPress={Otpsend}>
                      <LinearGradient
                        colors={['#874701', '#874701']}
                        style={styles.linearGradient}>
                        <Text style={styles.btn}>Send OTP</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: '800',
                      color: 'black',
                    }}>
                    OR
                  </Text>
                  <View
                    style={[
                      styles.regback1,
                      {flexDirection: 'row', justifyContent: 'center'},
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('SignUp');
                      }}>
                      <Text style={styles.btn2}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3d25b',
  },
  reg: {
    width: '100%',
  },
  register: {
    position: 'relative',
    marginTop: 80,
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
    paddingBottom: 200,
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
    fontSize: 15,
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
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
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
  btn2: {
    textAlign: 'center',
    fontSize: 17,
    borderColor: '#874701',
    borderWidth: 2,
    color: 'black',
    fontWeight: '700',
    padding: 8,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    width: 250,
  },
  linearGradient: {
    flex: 1,
    width: 250,
    // paddingLeft: 15,
    // paddingRight: 15,
    borderRadius: 100,
  },
});
