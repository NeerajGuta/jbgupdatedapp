import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const MyAccount = () => {
  const navigation = useNavigation('');
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setpassword] = useState('');
  const [imageSource, setImageSource] = useState(null);
  // console.log(imageSource, 'imageSource');
  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'App needs camera permission',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Camera permission granted');
  //       } else {
  //         console.log('Camera permission denied');
  //         Alert.alert('Camera permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   } else {
  //     const result = await request(PERMISSIONS.IOS.CAMERA);
  //     if (result === RESULTS.GRANTED) {
  //       console.log('Camera permission granted');
  //     } else {
  //       console.log('Camera permission denied');
  //       Alert.alert('Camera permission denied');
  //     }
  //   }
  // };

  // camera
  const takePhotoFromCamera1 = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImageSource(image.path);
      console.log('Camera Image Selected:', image.path); // Debug
    });
  };
  const onselect2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 600,
      cropping: true,
    }).then(image => {
      setImageSource(image.path);
      console.log('Gallery Image Selected:', image.path); // Debug
    });
  };

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
  // Fetch user data from AsyncStorage
  const userData = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    console.log('Updated User:', parsedUser);
    setUser(parsedUser);
  };

  // console.log('user:', user);

  const updateCustomer = async () => {
    try {
      if (!imageSource && !username && !email && !phone) {
        Alert.alert('No changes to update');
        return;
      }

      const imageSourceUri = imageSource
        ? Platform.OS === 'android'
          ? `file://${imageSource}`
          : imageSource
        : null;

      console.log('Image Source URI:', imageSourceUri);

      const formData = new FormData();
      formData.append('userId', user?._id);
      formData.append('name', username || user?.name);
      formData.append('email', email || user?.email);
      formData.append('phoneno', phone || user?.phoneno);

      if (imageSourceUri) {
        formData.append('profileimage', {
          uri: imageSourceUri,
          name: 'profile.jpg',
          type: 'image/jpeg',
        });
      }

      console.log('FormData Contents:');
      formData._parts.forEach(([key, value]) => {
        console.log(`${key}: ${value?.uri || value}`);
      });

      const response = await fetch(
        'https://justbuygold.co.in/api/v1/user/auth/updateuser',
        {
          method: 'PUT',
          headers: {
            // Do NOT set 'Content-Type' manually when using FormData
            Accept: 'application/json',
            // Include any required authentication headers here
            // Example:
            // Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const resultText = await response.text();
      console.log('Raw Fetch Response:', resultText);

      const result = JSON.parse(resultText);
      console.log('Parsed Fetch Response:', result);

      if (response.ok) {
        console.log('Updated Successfully');
        await AsyncStorage.setItem('user', JSON.stringify(result.success));
        userData(); // Reload user data
        setImageSource(null); // Clear local image state
        setUpdateProfile(true);
        Alert.alert('Updated successfully');
      } else {
        console.error('Server Error:', result);
        Alert.alert('Update failed', result?.message || 'Server Error');
      }
    } catch (error) {
      console.error('Update Error:', error.message || error);
      Alert.alert('Update failed', error.message || 'Network Error');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocusEffect Triggered'); // Debug
      userData();
    }, []),
  );

  const [updateProfile, setUpdateProfile] = useState(true);

  return (
    <ScrollView style={{backgroundColor: '#2b2cd6'}}>
      <StatusBar backgroundColor="#2b2cd6" barStyle="light-content" />
      {updateProfile ? (
        <>
          <View style={styles.conatiner}>
            <View style={[styles.account, {justifyContent: 'space-between'}]}>
              <View style={styles.profiles}>
                {user?.profileimage ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Imagezoom', {user})}>
                    <Image
                      source={{
                        uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
                      }}
                      resizeMode="cover"
                      style={[
                        styles.img,
                        {borderRadius: 100, width: 70, height: 70},
                      ]}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <Image
                      source={require('../../assets/images/Buygold.jpg')}
                      resizeMode="cover"
                      style={[styles.img, {borderRadius: 100, width: 70}]}
                    />
                  </>
                )}
                {/* <Image
                    source={{
                      uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
                    }}
                    resizeMode="cover"
                    style={[
                      styles.img,
                      {borderRadius: 100, width: 70, height: 70},
                    ]}
                  /> */}
                <View style={styles.profile}>
                  <Text
                    style={[
                      styles.textfont,
                      {fontFamily: 'Poppins-ExtraBold'},
                    ]}>
                    {user?.name}
                  </Text>
                  <Text style={styles.textfont}>+91 {user?.phoneno}</Text>
                  <Text style={[styles.textfont, {color: 'red'}]}>
                    {user?.userId}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  // updateCustomer();
                  setUpdateProfile(!updateProfile);
                }}>
                <FontAwesome5
                  name="edit"
                  size={28}
                  style={{color: 'black'}}></FontAwesome5>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.reg}>
                  {/* <View style={styles.updatepro}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <FontAwesome6
                      name="arrow-left-long"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text style={styles.cabs}>Profile</Text>
                </View> */}
                  <View style={[styles.profiles, {marginVertical: 30}]}>
                    {/* {user?.profileimage ? (
                        <Image
                          source={
                            imageSource
                              ? {uri: `${imageSource}?${new Date().getTime()}`}
                              : {
                                  uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
                                }
                          }
                          resizeMode="cover"
                          style={styles.img}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/images/Buygold.jpg')}
                          resizeMode="cover"
                          style={[
                            styles.img,
                            {borderRadius: 100, width: 70, height: 70},
                          ]}
                        />
                      )} */}

                    {/* <TouchableOpacity
                        onPress={pickImage}
                        onPress={() => setModalVisible(true)}>
                        <FontAwesome6
                          name="camera"
                          size={25}
                          color="white"
                          style={{
                            position: 'absoulte',
                            top: '67%',
                            right: '100%',
                          }}
                        />
                      </TouchableOpacity> */}
                  </View>
                  <View style={styles.back}>
                    <Text style={styles.contant}>User Name</Text>
                    <View style={styles.regback}>
                      <Icon name="user" style={styles.icons} />
                      <Text
                        style={[styles.input, {paddingTop: 12}]}
                        // value={username}
                        // onChangeText={username => setusername(username)}
                      >
                        {user?.name}
                      </Text>
                    </View>
                    <Text style={styles.contant}>Email</Text>
                    <View style={styles.regback}>
                      <Ionicons name="mail" style={styles.icons} />
                      <Text style={[styles.input, {paddingTop: 12}]}>
                        {user?.email}
                      </Text>
                    </View>
                    <Text style={styles.contant}>Phone No</Text>
                    <View style={styles.regback}>
                      <FontAwesome6 name="phone" style={styles.icons} />

                      <Text style={[styles.input, {paddingTop: 12}]}>
                        +91-{user?.phoneno}
                      </Text>
                    </View>

                    <Image
                      source={require('../../assets/images/g9.png')}
                      resizeMode="contain"
                      style={styles.imgContainer}
                    />

                    {/* <Text style={styles.contant}>Password</Text>
                  <View style={styles.regback}>
                    <Icon name="lock" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      value={password}
                      onChangeText={password => setpassword(password)}
                      placeholder={user?.password}
                      keyboardType="number-pad"
                    />
                  </View> */}
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Complete action using</Text>
                  <View style={styles.choose}>
                    <TouchableOpacity
                      onPress={() => {
                        takePhotoFromCamera1(), setModalVisible(!modalVisible);
                      }}
                      style={styles.gallercam}>
                      <Image
                        source={require('../../assets/images/camera.png')}
                        style={styles.icon}
                      />
                      <Text style={{color: 'black'}}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        onselect2(), setModalVisible(!modalVisible);
                      }}
                      style={styles.gallercam}>
                      <Image
                        source={require('../../assets/images/gallery.png')}
                        style={styles.icon}
                      />
                      <Text style={{color: 'black'}}>Gallery</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </>
      ) : (
        <>
          <View style={styles.conatiner}>
            <View style={[styles.account, {justifyContent: 'space-between'}]}>
              <View style={styles.profiles}>
                <Image
                  source={{
                    uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
                  }}
                  resizeMode="cover"
                  style={[
                    styles.img,
                    {borderRadius: 100, width: 70, height: 70},
                  ]}
                />
                <View style={styles.profile}>
                  <Text
                    style={[
                      styles.textfont,
                      {fontFamily: 'Poppins-ExtraBold'},
                    ]}>
                    {user?.name}
                  </Text>
                  <Text style={styles.textfont}>+91 {user?.phoneno}</Text>
                  <Text style={[styles.textfont, {color: 'red'}]}>
                    {user?.userId}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  updateCustomer();
                  setUpdateProfile(!updateProfile);
                }}>
                <Text style={[styles.cabs, {color: 'black'}]}>Save</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.reg}>
                  {/* <View style={styles.updatepro}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <FontAwesome6
                      name="arrow-left-long"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text style={styles.cabs}>Profile</Text>
                </View> */}
                  <View style={[styles.profiles, {marginVertical: 30}]}>
                    <Image
                      source={
                        imageSource
                          ? {uri: `${imageSource}?${new Date().getTime()}`}
                          : {
                              uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
                            }
                      }
                      resizeMode="cover"
                      style={styles.img}
                    />

                    <TouchableOpacity
                      // onPress={pickImage}
                      onPress={() => setModalVisible(true)}>
                      <FontAwesome6
                        name="camera"
                        size={25}
                        color="white"
                        style={{
                          position: 'absolute',
                          top: '67%',
                          right: '100%',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.back, {paddingTop: 60}]}>
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
                    {/* <Text style={styles.contant}>Phone No</Text>
                      <View style={styles.regback}>
                        <FontAwesome6 name="phone" style={styles.icons} />

                        <TextInput
                          style={styles.input}
                          value={phone}
                          onChangeText={phone => setPhone(phone)}
                          placeholder={user?.phoneno}
                          keyboardType="number-pad"
                        />
                      </View> */}
                    {/* <Text style={styles.contant}>Password</Text>
                  <View style={styles.regback}>
                    <Icon name="lock" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      value={password}
                      onChangeText={password => setpassword(password)}
                      placeholder={user?.password}
                      keyboardType="number-pad"
                    />
                  </View> */}
                  </View>
                </View>
              </View>
            </ScrollView>
            {/* modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Complete action using</Text>
                  <View style={styles.choose}>
                    <TouchableOpacity
                      onPress={() => {
                        takePhotoFromCamera1(), setModalVisible(!modalVisible);
                      }}
                      style={styles.gallercam}>
                      <Image
                        source={require('../../assets/images/camera.png')}
                        style={styles.icon}
                      />
                      <Text style={{color: 'black'}}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        onselect2(), setModalVisible(!modalVisible);
                      }}
                      style={styles.gallercam}>
                      <Image
                        source={require('../../assets/images/gallery.png')}
                        style={styles.icon}
                      />
                      <Text style={{color: 'black'}}>Gallery</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#2b2cd6',
    height: '100%',
  },
  account: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  img: {
    width: 60,
    height: 60,
  },
  img1: {
    width: 30,
    height: 30,
  },
  imgContainer: {
    width: 'fit-content',
    height: 200,
    marginTop: 20,
  },
  profiles: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#f3d25b',
    width: '100%',
  },
  textfont: {
    fontSize: 15,
    color: 'black',
    paddingLeft: 10,
    lineHeight: 22,
    fontFamily: 'Poppins-MediumItalic',
  },
  passfont: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 10,
  },
  booking: {
    padding: 10,
  },
  profiles1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingBottom: 10,
    marginBottom: 8,
    paddingLeft: 10,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 15,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  linearGradientmodel: {
    height: 40,
    width: 100,
    borderRadius: 100,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // image: {
  //   height: '100%',
  // },
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
    // fontWeight: '700',
    fontFamily: 'Poppins-MediumItalic',
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
    // paddingBottom: 150,
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
    fontFamily: 'Poppins-MediumItalic',
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
  centeredView: {
    position: 'absolute',
    bottom: 50,
    width: 360,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  gallercam: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
