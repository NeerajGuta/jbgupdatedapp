import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import {Share} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import axios from 'axios';
import LoaderKit from 'react-native-loader-kit';

const More = () => {
  const navigation = useNavigation('');

  // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [user, setUser] = useState('');
  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };
  useFocusEffect(
    React.useCallback(() => {
      if (Object.keys(user).length > 0) {
        userData();
      }
    }, []),
  );
  console.log(user?._id, 'user');

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleReferralShare = async referralCode => {
    try {
      const response = await axios.post(
        'https://justbuygold.co.in/api/v1/referral',
        {
          userId: user?._id,
          referral: referralCode,
        },
      );
      console.log('Referral code shared successfully:', referralCode);
    } catch (error) {
      Alert.alert(error.response?.data?.message || 'An error occurred');
      console.error('Error sharing referral code:', error);
    }
  };

  const shareApp = async () => {
    try {
      const referralCode = generateReferralCode(); // Generate the referral code once
      await handleReferralShare(referralCode); // Use the same code in the API request

      const deepLinkURL =
        'https://play.google.com/store/apps/details?id=com.nskparent/' +
        referralCode; // Use the same code in the share message

      // Share the deep link with referral code in the message
      Share.share({
        message: `Use my referral code: ${referralCode} . Download here: ${deepLinkURL}`,
        url: deepLinkURL, // This might be ignored depending on platform
      })
        .then(result => console.log('Shared successfully:', result))
        .catch(error => console.error('Error sharing:', error));
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [removeuser, setRemoveuser] = useState('');

  const removeUser = async () => {
    let removeuser = await AsyncStorage.removeItem('user');
    return setRemoveuser(removeuser), navigation.navigate('SignIn');
  };

  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  return (
    <>
      {loader ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LoaderKit
              style={{width: 50, height: 50}}
              name={'LineSpinFadeLoader'}
              color={'#f3d25b'}
            />
          </View>
        </>
      ) : (
        <>
          <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
          <ScrollView>
            <View style={styles.conatiner}>
              <ImageBackground
                source={require('../../assets/images/app-bg.jpg')}
                resizeMode="cover"
                style={styles.image}>
                {}
                <View style={styles.booking}>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('BookingDetails');
                    }}>
                    <Animatable.View
                      animation="fadeInLeft"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/choices.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Purchase Histroy</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('CoinDetails');
                    }}>
                    <Animatable.View
                      animation="fadeInRight"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/choices.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Withdraw History</Text>
                    </Animatable.View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('EarnedBonusPoint');
                    }}>
                    <Animatable.View
                      animation="fadeInRight"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/padlock.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Just buy gold Balance</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => shareApp()}
                    // onPress={() => {
                    //   navigation.navigate('AboutUs');
                    // }}
                  >
                    <Animatable.View
                      animation="fadeInLeft"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/share.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Share and Earn</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('AboutUs');
                    }}>
                    <Animatable.View
                      animation="fadeInLeft"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/information.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>About Us</Text>
                    </Animatable.View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('TermsCondition');
                    }}>
                    <Animatable.View
                      animation="fadeInRight"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/terms-and-conditions.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Terms & Condition</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('PrivacyPolicy');
                    }}>
                    <Animatable.View
                      animation="fadeInLeft"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/insurance.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Privacy policy</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('Disclaimer');
                    }}>
                    <Animatable.View
                      animation="fadeInRight"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/file.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Disclaimer</Text>
                    </Animatable.View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('Help');
                    }}>
                    <Animatable.View
                      animation="fadeInRight"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/terms-and-conditions.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={styles.passfont}>Help</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      // removeUser();
                      toggleModal();
                    }}>
                    <Animatable.View
                      animation="fadeInRight"
                      style={styles.profiles1}>
                      <Image
                        source={require('../../assets/images/logout.png')}
                        resizeMode="cover"
                        style={[styles.img, {width: 25, height: 25}]}
                      />
                      <Text style={[styles.passfont, {color: 'red'}]}>
                        Sign Out
                      </Text>
                    </Animatable.View>
                  </TouchableOpacity>
                  {/* Modal */}
                  <View style={{flex: 1}}>
                    {/* <Button title="Show modal" onPress={toggleModal} /> */}

                    <Modal isVisible={isModalVisible}>
                      <View style={{backgroundColor: 'white', height: 130}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',

                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              flexDirection: 'column',
                              justifyContent: 'center',
                              paddingTop: 20,
                              alignItems: 'center',
                              fontSize: 17,
                              fontWeight: '600',
                              color: 'black',
                              fontFamily: 'Poppins-SemiBoldItalic',
                            }}>
                            Are you sure want logout ?
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 20,
                          }}>
                          <LinearGradient
                            start={{x: 1, y: 0}}
                            end={{x: 0, y: 0}}
                            colors={['#874701', '#874701', '#874701']}
                            style={styles.linearGradientmodel}>
                            <TouchableOpacity onPress={toggleModal}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 15,
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                {' '}
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                          <LinearGradient
                            start={{x: 1, y: 0}}
                            end={{x: 0, y: 0}}
                            colors={['#874701', '#874701', '#874701']}
                            style={styles.linearGradientmodel}>
                            <TouchableOpacity onPress={removeUser}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 15,
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                Yes
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default More;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  account: {
    padding: 10,
    flexDirection: 'row',
  },
  img: {
    width: 60,
    height: 60,
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
    fontWeight: '600',
  },
  passfont: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: 'Poppins-ExtraBold',
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
    backgroundColor: '#f3d25b',
    paddingBottom: 10,
    marginBottom: 8,
    paddingLeft: 10,
    borderColor: '#f3d25b',
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
  image: {
    height: '100%',
  },
});
