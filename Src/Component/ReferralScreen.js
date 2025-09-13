import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ReferralScreen = ({navigation}) => {
  const [referralCode, setReferralCode] = useState('');

  // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [user, setUser] = useState('');
  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };
  // console.log(user?._id, 'referralCode');
  const handleReferralSubmit = async () => {
    try {
      const response = await axios.put(
        'https://justbuynewbackend.onrender.com/api/v1/useReferralCode',
        {
          referral: referralCode,
          receiverId: user?._id,
        },
      );
      Alert.alert('Success', response.data.message);
      navigation.navigate('Home1', {referralCode});
      setReferralCode(' ');
    } catch (error) {
      Alert.alert(error.response?.data?.message || 'An error occurred');
      console.log(error, 'error');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home1');
    console.log('Referral Code:', referralCode);
  };
  useEffect(() => {
    userData();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/refrral.png')}
        style={styles.image}
      />
      <Text style={styles.title}>
        {/* Enter Your Referral Code And Get 50 Rs Discount{' '} */}
        Refer & Earn
      </Text>
      <Text style={styles.title1}>
        {/* Enter Your Referral Code And Get 50 Rs Discount{' '} */}
        Now refer any of your friends and Get
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          color: 'red',
        }}>
        ₹ 100
      </Text>
      <Text
        style={{
          paddingBottom: 20,
          fontSize: 17,
        }}>
        per referral
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter referral code"
        value={referralCode}
        onChangeText={setReferralCode}
        placeholderTextColor={'black'}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 60,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={handleReferralSubmit}>
          <LinearGradient
            colors={['#874701', '#874701']}
            style={styles.linearGradient}>
            <Text style={styles.btn}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <LinearGradient
            colors={['#874701', '#874701']}
            style={styles.linearGradient}>
            <Text style={styles.btn}>Skip</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  image: {
    width: 370,
    height: 211,
    objectFit: 'cover',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    color: 'black',
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
    width: 120,
    alignContent: 'center',
  },
  linearGradient: {
    borderRadius: 100,
  },
  title1: {
    fontSize: 17,
    textAlign: 'center',
  },
});

export default ReferralScreen;
