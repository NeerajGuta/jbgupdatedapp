import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const ProfileUpdate = ({navigation}) => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [photo, setPhoto] = useState('');
  const [imageSource, setImageSource] = useState(null);

  const pickImage = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel && !response.error) {
        setImageSource(response.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [user, setUser] = useState('');
  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };

  console.log('user:', user);

  const updateCustomer = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', user?._id);
      formData.append('name', username);
      formData.append('email', email);
      formData.append('phoneno', phone);

      if (imageSource) {
        const imageUriParts = imageSource.split('.');
        const imageFileType = imageUriParts[imageUriParts.length - 1];
        formData.append('profileimage', {
          uri: imageSource,
          name: `profile.${imageFileType}`,
          type: `image/${imageFileType}`,
        });
      }

      const config = {
        url: '/updateuser',
        method: 'put',
        baseURL: 'https://justbuynewbackend.onrender.com/api/v1/user/auth',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      let res = await axios(config);

      if (res.status === 200) {
        console.log('Updated Successfully');
        await AsyncStorage.setItem('user', JSON.stringify(res.data.success));
        setEdit(res.data.success);
        navigation.navigate('MyAccount');
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, []),
  );

  return (
    <>
      <StatusBar backgroundColor="#2b2cd6" barStyle="light-content" />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.reg}>
            <View style={styles.updatepro}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <FontAwesome6 name="arrow-left-long" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.cabs}>Profile</Text>
              <TouchableOpacity
                onPress={() => {
                  updateCustomer();
                }}>
                <Text style={styles.cabs}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profiles}>
              <Image
                source={
                  imageSource
                    ? {uri: imageSource}
                    : require('../../assets/images/man.png')
                }
                resizeMode="cover"
                style={styles.img}
              />

              <TouchableOpacity onPress={pickImage}>
                <FontAwesome6
                  name="camera"
                  size={25}
                  color="white"
                  style={{position: 'absolute', top: '67%', right: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.back}>
              <Text style={styles.contant}>User Name</Text>
              <View style={styles.regback}>
                <Icon name="user" style={styles.icons} />

                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={username => setusername(username)}
                  placeholder={user?.name}
                  keyboardType="default"
                  placeholderTextColor={'black'}
                />
              </View>
              <Text style={styles.contant}>Email</Text>
              <View style={styles.regback}>
                <Ionicons name="mail" style={styles.icons} />

                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={email => setEmail(email)}
                  placeholder={user?.email}
                  keyboardType="email-address"
                  placeholderTextColor={'black'}
                />
              </View>
              <Text style={styles.contant}>Phone No</Text>
              <View style={styles.regback}>
                <FontAwesome6 name="phone" style={styles.icons} />

                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={phone => setPhone(phone)}
                  placeholder={user?.phoneno}
                  keyboardType="number-pad"
                  placeholderTextColor={'black'}
                />
              </View>
              <Text style={styles.contant}>Password</Text>
              <View style={styles.regback}>
                <Icon name="lock" style={styles.icons} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={phone => setPhone(phone)}
                  placeholder={user?.password}
                  keyboardType="number-pad"
                  placeholderTextColor={'black'}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileUpdate;

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
    justifyContent: 'space-between',
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
    borderWidth: 2,
    borderColor: 'white',
  },
  profiles: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 150,
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
    paddingLeft: 38,
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
    elevation: 3,
  },
  contant: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
  },
  btn: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#874701',
    color: 'white',
    fontWeight: 'bold',
    padding: 2,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    width: '100%',
  },
  btn2: {
    textAlign: 'center',
    fontSize: 20,
    borderColor: '#874701',
    borderWidth: 2,
    color: 'black',
    fontWeight: 'bold',
    padding: 8,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    width: '100%',
  },
  linearGradient: {
    flex: 1,

    // paddingLeft: 15,
    // paddingRight: 15,
    borderRadius: 100,
  },
});
