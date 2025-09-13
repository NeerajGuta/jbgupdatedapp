// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Animatable from 'react-native-animatable';
// import {Share} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import axios from 'axios';
// import LoaderKit from 'react-native-loader-kit';

// const More = () => {
//   const navigation = useNavigation('');

//   // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [user, setUser] = useState('');
//   const userData = async () => {
//     let user = await AsyncStorage.getItem('user');
//     setUser(JSON.parse(user));
//   };
//   useFocusEffect(
//     React.useCallback(() => {
//       if (Object.keys(user).length > 0) {
//         userData();
//       }
//     }, []),
//   );
//   console.log(user?._id, 'user');

//   const generateReferralCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

//   const handleReferralShare = async referralCode => {
//     try {
//       const response = await axios.post(
//         'https://justbuynewbackend.onrender.com/api/v1/referral',
//         {
//           userId: user?._id,
//           referral: referralCode,
//         },
//       );
//       console.log('Referral code shared successfully:', referralCode);
//     } catch (error) {
//       Alert.alert(error.response?.data?.message || 'An error occurred');
//       console.error('Error sharing referral code:', error);
//     }
//   };

//   const shareApp = async () => {
//     try {
//       const referralCode = generateReferralCode(); // Generate the referral code once
//       await handleReferralShare(referralCode); // Use the same code in the API request

//       const deepLinkURL =
//         'https://play.google.com/store/apps/details?id=com.nskparent/' +
//         referralCode; // Use the same code in the share message

//       // Share the deep link with referral code in the message
//       Share.share({
//         message: `Use my referral code: ${referralCode} . Download here: ${deepLinkURL}`,
//         url: deepLinkURL, // This might be ignored depending on platform
//       })
//         .then(result => console.log('Shared successfully:', result))
//         .catch(error => console.error('Error sharing:', error));
//     } catch (error) {
//       console.error('Error sharing app:', error);
//     }
//   };

//   useEffect(() => {
//     userData();
//   }, []);

//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const [removeuser, setRemoveuser] = useState('');

//   const removeUser = async () => {
//     let removeuser = await AsyncStorage.removeItem('user');
//     return setRemoveuser(removeuser), navigation.navigate('SignIn');
//   };

//   const [loader, setLoader] = useState(true);

//   setTimeout(() => {
//     setLoader(false);
//   }, 1000);

//   return (
//     <ImageBackground
//       source={require('../../assets/images/app-bg.jpg')}
//       style={{flex: 1}}
//       resizeMode="cover">
//       <View style={styles.container}>
//         <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
//         <ScrollView style={styles.main}>
//           {loader ? (
//             <>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <LoaderKit
//                   style={{width: 50, height: 50}}
//                   name={'LineSpinFadeLoader'}
//                   color={'#f3d25b'}
//                 />
//               </View>
//             </>
//           ) : (
//             <ScrollView style={{backgroundColor: 'transparent'}}>
//               <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
//               <ScrollView style={{backgroundColor: 'transparent'}}>
//                 <View style={styles.conatiner}>
//                   <View style={styles.booking}>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('BookingDetails');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/choices.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Purchase Histroy</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('CoinDetails');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/choices.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Withdraw History</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('EarnedBonusPoint');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/padlock.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>
//                           Just buy gold Balance
//                         </Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => shareApp()}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/share.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Share and Earn</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('AboutUs');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/information.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>About Us</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('TermsCondition');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/terms-and-conditions.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Terms & Condition</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('PrivacyPolicy');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/insurance.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Privacy policy</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('Disclaimer');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/file.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Disclaimer</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('Help');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/terms-and-conditions.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Help</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         toggleModal();
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/logout.png')}
//                           resizeMode="cover"
//                           style={[styles.img, {width: 25, height: 25}]}
//                         />
//                         <Text style={[styles.passfont, {color: 'red'}]}>
//                           Sign Out
//                         </Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     {/* Modal */}
//                     <View style={{flex: 1}}>
//                       <Modal isVisible={isModalVisible}>
//                         <View style={{backgroundColor: 'white', height: 130}}>
//                           <View
//                             style={{
//                               flexDirection: 'column',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                             }}>
//                             <Text
//                               style={{
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 paddingTop: 20,
//                                 alignItems: 'center',
//                                 fontSize: 17,
//                                 fontWeight: '600',
//                                 color: 'black',
//                                 fontFamily: 'Poppins-SemiBoldItalic',
//                               }}>
//                               Are you sure want logout ?
//                             </Text>
//                           </View>
//                           <View
//                             style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               alignItems: 'center',
//                               padding: 20,
//                             }}>
//                             <LinearGradient
//                               start={{x: 1, y: 0}}
//                               end={{x: 0, y: 0}}
//                               colors={['#874701', '#874701', '#874701']}
//                               style={styles.linearGradientmodel}>
//                               <TouchableOpacity onPress={toggleModal}>
//                                 <Text
//                                   style={{
//                                     color: 'white',
//                                     fontSize: 15,
//                                     fontFamily: 'Poppins-Regular',
//                                   }}>
//                                   Cancel
//                                 </Text>
//                               </TouchableOpacity>
//                             </LinearGradient>
//                             <LinearGradient
//                               start={{x: 1, y: 0}}
//                               end={{x: 0, y: 0}}
//                               colors={['#874701', '#874701', '#874701']}
//                               style={styles.linearGradientmodel}>
//                               <TouchableOpacity onPress={removeUser}>
//                                 <Text
//                                   style={{
//                                     color: 'white',
//                                     fontSize: 15,
//                                     fontFamily: 'Poppins-Regular',
//                                   }}>
//                                   Yes
//                                 </Text>
//                               </TouchableOpacity>
//                             </LinearGradient>
//                           </View>
//                         </View>
//                       </Modal>
//                     </View>
//                   </View>
//                 </View>
//               </ScrollView>
//             </ScrollView>
//           )}
//         </ScrollView>
//       </View>
//       <Image
//         source={require('../../assets/images/gg12.png')}
//         resizeMode="contain"
//         style={{
//           width: '100%',
//           height: 120,
//         }}
//       />
//     </ImageBackground>
//   );
// };

// export default More;

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: 'transparent',
//   },
//   conatiner: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'transparent',
//   },
//   account: {
//     padding: 10,
//     flexDirection: 'row',
//   },
//   img: {
//     width: 60,
//     height: 60,
//   },
//   profiles: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     paddingBottom: 10,
//     borderColor: '#f3d25b',
//     width: '100%',
//   },
//   textfont: {
//     fontSize: 15,
//     color: 'black',
//     paddingLeft: 10,
//     fontWeight: '600',
//   },
//   passfont: {
//     color: 'black',
//     fontSize: 16,
//     paddingLeft: 10,
//     fontFamily: 'Poppins-ExtraBold',
//   },
//   booking: {
//     backgroundColor: '2b2cd6',
//   },
//   profiles1: {
//     flexDirection: 'row',

//     alignItems: 'center',
//     paddingTop: 20,
//     paddingBottom: 17,
//     borderBottomWidth: 1,
//     backgroundColor: '#fff',
//     paddingBottom: 10,
//     marginBottom: 8,
//     paddingLeft: 10,
//     borderColor: '#f3d25b',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 9,
//     },

//     shadowOpacity: 0.48,
//     shadowRadius: 11.95,

//     elevation: 3,
//     width: '100%',
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   linearGradientmodel: {
//     height: 40,
//     width: 100,
//     borderRadius: 100,
//     textAlign: 'center',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     height: '100%',
//   },
// });

// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   Dimensions,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Animatable from 'react-native-animatable';
// import {Share, Alert} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import axios from 'axios';
// import LoaderKit from 'react-native-loader-kit';

// const {width, height} = Dimensions.get('window');

// const More = () => {
//   const navigation = useNavigation('');

//   // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [user, setUser] = useState({});
//   const userData = async () => {
//     try {
//       let userData = await AsyncStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       userData();
//     }, []),
//   );

//   const generateReferralCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

//   const handleReferralShare = async referralCode => {
//     try {
//       const response = await axios.post(
//         'https://justbuynewbackend.onrender.com/api/v1/referral',
//         {
//           userId: user?._id,
//           referral: referralCode,
//         },
//       );
//       console.log('Referral code shared successfully:', referralCode);
//     } catch (error) {
//       Alert.alert(error.response?.data?.message || 'An error occurred');
//       console.error('Error sharing referral code:', error);
//     }
//   };

//   const shareApp = async () => {
//     try {
//       const referralCode = generateReferralCode(); // Generate the referral code once
//       await handleReferralShare(referralCode); // Use the same code in the API request

//       const deepLinkURL =
//         'https://play.google.com/store/apps/details?id=com.nskparent/' +
//         referralCode; // Use the same code in the share message

//       // Share the deep link with referral code in the message
//       Share.share({
//         message: `Use my referral code: ${referralCode} . Download here: ${deepLinkURL}`,
//         url: deepLinkURL, // This might be ignored depending on platform
//       })
//         .then(result => console.log('Shared successfully:', result))
//         .catch(error => console.error('Error sharing:', error));
//     } catch (error) {
//       console.error('Error sharing app:', error);
//     }
//   };

//   useEffect(() => {
//     userData();
//   }, []);

//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const removeUser = async () => {
//     try {
//       await AsyncStorage.removeItem('user');
//       navigation.navigate('SignIn');
//     } catch (error) {
//       console.error('Error removing user:', error);
//     }
//   };

//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const menuItems = [
//     {
//       icon: require('../../assets/images/choices.png'),
//       text: 'Purchase History',
//       route: 'BookingDetails',
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/choices.png'),
//       text: 'Withdraw History',
//       route: 'CoinDetails',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/padlock.png'),
//       text: 'Just buy gold Balance',
//       route: 'EarnedBonusPoint',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/share.png'),
//       text: 'Share and Earn',
//       action: shareApp,
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/information.png'),
//       text: 'About Us',
//       route: 'AboutUs',
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/terms-and-conditions.png'),
//       text: 'Terms & Condition',
//       route: 'TermsCondition',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/insurance.png'),
//       text: 'Privacy policy',
//       route: 'PrivacyPolicy',
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/file.png'),
//       text: 'Disclaimer',
//       route: 'Disclaimer',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/terms-and-conditions.png'),
//       text: 'Help',
//       route: 'Help',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/logout.png'),
//       text: 'Sign Out',
//       action: toggleModal,
//       animation: 'fadeInRight',
//       textStyle: {color: 'red'},
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground
//         source={require('../../assets/images/app-bg.jpg')}
//         style={styles.backgroundImage}
//         resizeMode="cover">
//         <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />

//         {loader ? (
//           <View style={styles.loaderContainer}>
//             <LoaderKit
//               style={{width: 50, height: 50}}
//               name={'LineSpinFadeLoader'}
//               color={'#f3d25b'}
//             />
//           </View>
//         ) : (
//           <View style={styles.contentContainer}>
//             <ScrollView
//               style={styles.scrollView}
//               contentContainerStyle={styles.scrollViewContent}
//               showsVerticalScrollIndicator={false}>
//               <View style={styles.menuContainer}>
//                 {menuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={styles.menuItemTouchable}
//                     onPress={() => {
//                       if (item.action) {
//                         item.action();
//                       } else if (item.route) {
//                         navigation.navigate(item.route);
//                       }
//                     }}>
//                     <Animatable.View
//                       animation={item.animation}
//                       style={styles.menuItem}>
//                       <Image
//                         source={item.icon}
//                         resizeMode="cover"
//                         style={[
//                           styles.menuIcon,
//                           {
//                             backgroundColor:
//                               item.text === 'Sign Out'
//                                 ? 'transparent'
//                                 : '#f3d25b',
//                           },
//                         ]}
//                       />
//                       <Text style={[styles.menuText, item.textStyle]}>
//                         {item.text}
//                       </Text>
//                     </Animatable.View>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </ScrollView>

//             <View style={styles.footerImageContainer}>
//               <Image
//                 source={require('../../assets/images/gg12.png')}
//                 resizeMode="contain"
//                 style={styles.footerImage}
//               />
//             </View>
//           </View>
//         )}

//         {/* Logout Modal */}
//         <Modal isVisible={isModalVisible} backdropOpacity={0.7}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Are you sure want logout?</Text>
//             <View style={styles.modalButtonsContainer}>
//               <LinearGradient
//                 start={{x: 1, y: 0}}
//                 end={{x: 0, y: 0}}
//                 colors={['#874701', '#874701', '#874701']}
//                 style={styles.modalButton}>
//                 <TouchableOpacity onPress={toggleModal}>
//                   <Text style={styles.modalButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//               <LinearGradient
//                 start={{x: 1, y: 0}}
//                 end={{x: 0, y: 0}}
//                 colors={['#874701', '#874701', '#874701']}
//                 style={styles.modalButton}>
//                 <TouchableOpacity onPress={removeUser}>
//                   <Text style={styles.modalButtonText}>Yes</Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>
//           </View>
//         </Modal>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default More;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
//   menuContainer: {
//     width: '100%',
//   },
//   menuItemTouchable: {
//     marginBottom: 8,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderColor: '#f3d25b',
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 3,
//   },
//   menuIcon: {
//     width: 25,
//     height: 25,
//   },
//   menuText: {
//     color: 'black',
//     fontSize: 16,
//     paddingLeft: 10,
//     fontFamily: 'Poppins-ExtraBold',
//   },
//   footerImageContainer: {
//     width: '100%',
//     height: 100,
//     justifyContent: 'flex-end',
//   },
//   footerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     textAlign: 'center',
//     fontSize: 17,
//     fontWeight: '600',
//     color: 'black',
//     fontFamily: 'Poppins-SemiBoldItalic',
//     marginBottom: 20,
//   },
//   modalButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   modalButton: {
//     height: 40,
//     width: 100,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontSize: 15,
//     fontFamily: 'Poppins-Regular',
//   },
// });



// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Animatable from 'react-native-animatable';
// import {Share} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import axios from 'axios';
// import LoaderKit from 'react-native-loader-kit';

// const More = () => {
//   const navigation = useNavigation('');

//   // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [user, setUser] = useState('');
//   const userData = async () => {
//     let user = await AsyncStorage.getItem('user');
//     setUser(JSON.parse(user));
//   };
//   useFocusEffect(
//     React.useCallback(() => {
//       if (Object.keys(user).length > 0) {
//         userData();
//       }
//     }, []),
//   );
//   console.log(user?._id, 'user');

//   const generateReferralCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

//   const handleReferralShare = async referralCode => {
//     try {
//       const response = await axios.post(
//         'https://justbuynewbackend.onrender.com/api/v1/referral',
//         {
//           userId: user?._id,
//           referral: referralCode,
//         },
//       );
//       console.log('Referral code shared successfully:', referralCode);
//     } catch (error) {
//       Alert.alert(error.response?.data?.message || 'An error occurred');
//       console.error('Error sharing referral code:', error);
//     }
//   };

//   const shareApp = async () => {
//     try {
//       const referralCode = generateReferralCode(); // Generate the referral code once
//       await handleReferralShare(referralCode); // Use the same code in the API request

//       const deepLinkURL =
//         'https://play.google.com/store/apps/details?id=com.nskparent/' +
//         referralCode; // Use the same code in the share message

//       // Share the deep link with referral code in the message
//       Share.share({
//         message: `Use my referral code: ${referralCode} . Download here: ${deepLinkURL}`,
//         url: deepLinkURL, // This might be ignored depending on platform
//       })
//         .then(result => console.log('Shared successfully:', result))
//         .catch(error => console.error('Error sharing:', error));
//     } catch (error) {
//       console.error('Error sharing app:', error);
//     }
//   };

//   useEffect(() => {
//     userData();
//   }, []);

//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const [removeuser, setRemoveuser] = useState('');

//   const removeUser = async () => {
//     let removeuser = await AsyncStorage.removeItem('user');
//     return setRemoveuser(removeuser), navigation.navigate('SignIn');
//   };

//   const [loader, setLoader] = useState(true);

//   setTimeout(() => {
//     setLoader(false);
//   }, 1000);

//   return (
//     <ImageBackground
//       source={require('../../assets/images/app-bg.jpg')}
//       style={{flex: 1}}
//       resizeMode="cover">
//       <View style={styles.container}>
//         <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
//         <ScrollView style={styles.main}>
//           {loader ? (
//             <>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <LoaderKit
//                   style={{width: 50, height: 50}}
//                   name={'LineSpinFadeLoader'}
//                   color={'#f3d25b'}
//                 />
//               </View>
//             </>
//           ) : (
//             <ScrollView style={{backgroundColor: 'transparent'}}>
//               <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
//               <ScrollView style={{backgroundColor: 'transparent'}}>
//                 <View style={styles.conatiner}>
//                   <View style={styles.booking}>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('BookingDetails');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/choices.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Purchase Histroy</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('CoinDetails');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/choices.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Withdraw History</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('EarnedBonusPoint');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/padlock.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>
//                           Just buy gold Balance
//                         </Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => shareApp()}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/share.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Share and Earn</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('AboutUs');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/information.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>About Us</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('TermsCondition');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/terms-and-conditions.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Terms & Condition</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('PrivacyPolicy');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInLeft"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/insurance.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Privacy policy</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('Disclaimer');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/file.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Disclaimer</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         navigation.navigate('Help');
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/terms-and-conditions.png')}
//                           resizeMode="cover"
//                           style={[
//                             styles.img,
//                             {width: 25, height: 25, backgroundColor: '#f3d25b'},
//                           ]}
//                         />
//                         <Text style={styles.passfont}>Help</Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'row'}}
//                       onPress={() => {
//                         toggleModal();
//                       }}>
//                       <Animatable.View
//                         animation="fadeInRight"
//                         style={styles.profiles1}>
//                         <Image
//                           source={require('../../assets/images/logout.png')}
//                           resizeMode="cover"
//                           style={[styles.img, {width: 25, height: 25}]}
//                         />
//                         <Text style={[styles.passfont, {color: 'red'}]}>
//                           Sign Out
//                         </Text>
//                       </Animatable.View>
//                     </TouchableOpacity>
//                     {/* Modal */}
//                     <View style={{flex: 1}}>
//                       <Modal isVisible={isModalVisible}>
//                         <View style={{backgroundColor: 'white', height: 130}}>
//                           <View
//                             style={{
//                               flexDirection: 'column',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                             }}>
//                             <Text
//                               style={{
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 paddingTop: 20,
//                                 alignItems: 'center',
//                                 fontSize: 17,
//                                 fontWeight: '600',
//                                 color: 'black',
//                                 fontFamily: 'Poppins-SemiBoldItalic',
//                               }}>
//                               Are you sure want logout ?
//                             </Text>
//                           </View>
//                           <View
//                             style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               alignItems: 'center',
//                               padding: 20,
//                             }}>
//                             <LinearGradient
//                               start={{x: 1, y: 0}}
//                               end={{x: 0, y: 0}}
//                               colors={['#874701', '#874701', '#874701']}
//                               style={styles.linearGradientmodel}>
//                               <TouchableOpacity onPress={toggleModal}>
//                                 <Text
//                                   style={{
//                                     color: 'white',
//                                     fontSize: 15,
//                                     fontFamily: 'Poppins-Regular',
//                                   }}>
//                                   Cancel
//                                 </Text>
//                               </TouchableOpacity>
//                             </LinearGradient>
//                             <LinearGradient
//                               start={{x: 1, y: 0}}
//                               end={{x: 0, y: 0}}
//                               colors={['#874701', '#874701', '#874701']}
//                               style={styles.linearGradientmodel}>
//                               <TouchableOpacity onPress={removeUser}>
//                                 <Text
//                                   style={{
//                                     color: 'white',
//                                     fontSize: 15,
//                                     fontFamily: 'Poppins-Regular',
//                                   }}>
//                                   Yes
//                                 </Text>
//                               </TouchableOpacity>
//                             </LinearGradient>
//                           </View>
//                         </View>
//                       </Modal>
//                     </View>
//                   </View>
//                 </View>
//               </ScrollView>
//             </ScrollView>
//           )}
//         </ScrollView>
//       </View>
//       <Image
//         source={require('../../assets/images/gg12.png')}
//         resizeMode="contain"
//         style={{
//           width: '100%',
//           height: 120,
//         }}
//       />
//     </ImageBackground>
//   );
// };

// export default More;

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: 'transparent',
//   },
//   conatiner: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'transparent',
//   },
//   account: {
//     padding: 10,
//     flexDirection: 'row',
//   },
//   img: {
//     width: 60,
//     height: 60,
//   },
//   profiles: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     paddingBottom: 10,
//     borderColor: '#f3d25b',
//     width: '100%',
//   },
//   textfont: {
//     fontSize: 15,
//     color: 'black',
//     paddingLeft: 10,
//     fontWeight: '600',
//   },
//   passfont: {
//     color: 'black',
//     fontSize: 16,
//     paddingLeft: 10,
//     fontFamily: 'Poppins-ExtraBold',
//   },
//   booking: {
//     backgroundColor: '2b2cd6',
//   },
//   profiles1: {
//     flexDirection: 'row',

//     alignItems: 'center',
//     paddingTop: 20,
//     paddingBottom: 17,
//     borderBottomWidth: 1,
//     backgroundColor: '#fff',
//     paddingBottom: 10,
//     marginBottom: 8,
//     paddingLeft: 10,
//     borderColor: '#f3d25b',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 9,
//     },

//     shadowOpacity: 0.48,
//     shadowRadius: 11.95,

//     elevation: 3,
//     width: '100%',
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   linearGradientmodel: {
//     height: 40,
//     width: 100,
//     borderRadius: 100,
//     textAlign: 'center',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     height: '100%',
//   },
// });

// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   Dimensions,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Animatable from 'react-native-animatable';
// import {Share, Alert} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import axios from 'axios';
// import LoaderKit from 'react-native-loader-kit';

// const {width, height} = Dimensions.get('window');

// const More = () => {
//   const navigation = useNavigation('');

//   // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [user, setUser] = useState({});
//   const userData = async () => {
//     try {
//       let userData = await AsyncStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       userData();
//     }, []),
//   );

//   const generateReferralCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

//   const handleReferralShare = async referralCode => {
//     try {
//       const response = await axios.post(
//         'https://justbuynewbackend.onrender.com/api/v1/referral',
//         {
//           userId: user?._id,
//           referral: referralCode,
//         },
//       );
//       console.log('Referral code shared successfully:', referralCode);
//     } catch (error) {
//       Alert.alert(error.response?.data?.message || 'An error occurred');
//       console.error('Error sharing referral code:', error);
//     }
//   };

//   const shareApp = async () => {
//     try {
//       const referralCode = generateReferralCode(); // Generate the referral code once
//       await handleReferralShare(referralCode); // Use the same code in the API request

//       const deepLinkURL =
//         'https://play.google.com/store/apps/details?id=com.nskparent/' +
//         referralCode; // Use the same code in the share message

//       // Share the deep link with referral code in the message
//       Share.share({
//         message: `Use my referral code: ${referralCode} . Download here: ${deepLinkURL}`,
//         url: deepLinkURL, // This might be ignored depending on platform
//       })
//         .then(result => console.log('Shared successfully:', result))
//         .catch(error => console.error('Error sharing:', error));
//     } catch (error) {
//       console.error('Error sharing app:', error);
//     }
//   };

//   useEffect(() => {
//     userData();
//   }, []);

//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const removeUser = async () => {
//     try {
//       await AsyncStorage.removeItem('user');
//       navigation.navigate('SignIn');
//     } catch (error) {
//       console.error('Error removing user:', error);
//     }
//   };

//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const menuItems = [
//     {
//       icon: require('../../assets/images/choices.png'),
//       text: 'Purchase History',
//       route: 'BookingDetails',
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/choices.png'),
//       text: 'Withdraw History',
//       route: 'CoinDetails',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/padlock.png'),
//       text: 'Just buy gold Balance',
//       route: 'EarnedBonusPoint',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/share.png'),
//       text: 'Share and Earn',
//       action: shareApp,
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/information.png'),
//       text: 'About Us',
//       route: 'AboutUs',
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/terms-and-conditions.png'),
//       text: 'Terms & Condition',
//       route: 'TermsCondition',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/insurance.png'),
//       text: 'Privacy policy',
//       route: 'PrivacyPolicy',
//       animation: 'fadeInLeft',
//     },
//     {
//       icon: require('../../assets/images/file.png'),
//       text: 'Disclaimer',
//       route: 'Disclaimer',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/terms-and-conditions.png'),
//       text: 'Help',
//       route: 'Help',
//       animation: 'fadeInRight',
//     },
//     {
//       icon: require('../../assets/images/logout.png'),
//       text: 'Sign Out',
//       action: toggleModal,
//       animation: 'fadeInRight',
//       textStyle: {color: 'red'},
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground
//         source={require('../../assets/images/app-bg.jpg')}
//         style={styles.backgroundImage}
//         resizeMode="cover">
//         <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />

//         {loader ? (
//           <View style={styles.loaderContainer}>
//             <LoaderKit
//               style={{width: 50, height: 50}}
//               name={'LineSpinFadeLoader'}
//               color={'#f3d25b'}
//             />
//           </View>
//         ) : (
//           <View style={styles.contentContainer}>
//             <ScrollView
//               style={styles.scrollView}
//               contentContainerStyle={styles.scrollViewContent}
//               showsVerticalScrollIndicator={false}>
//               <View style={styles.menuContainer}>
//                 {menuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={styles.menuItemTouchable}
//                     onPress={() => {
//                       if (item.action) {
//                         item.action();
//                       } else if (item.route) {
//                         navigation.navigate(item.route);
//                       }
//                     }}>
//                     <Animatable.View
//                       animation={item.animation}
//                       style={styles.menuItem}>
//                       <Image
//                         source={item.icon}
//                         resizeMode="cover"
//                         style={[
//                           styles.menuIcon,
//                           {
//                             backgroundColor:
//                               item.text === 'Sign Out'
//                                 ? 'transparent'
//                                 : '#f3d25b',
//                           },
//                         ]}
//                       />
//                       <Text style={[styles.menuText, item.textStyle]}>
//                         {item.text}
//                       </Text>
//                     </Animatable.View>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </ScrollView>

//             <View style={styles.footerImageContainer}>
//               <Image
//                 source={require('../../assets/images/gg12.png')}
//                 resizeMode="contain"
//                 style={styles.footerImage}
//               />
//             </View>
//           </View>
//         )}

//         {/* Logout Modal */}
//         <Modal isVisible={isModalVisible} backdropOpacity={0.7}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Are you sure want logout?</Text>
//             <View style={styles.modalButtonsContainer}>
//               <LinearGradient
//                 start={{x: 1, y: 0}}
//                 end={{x: 0, y: 0}}
//                 colors={['#874701', '#874701', '#874701']}
//                 style={styles.modalButton}>
//                 <TouchableOpacity onPress={toggleModal}>
//                   <Text style={styles.modalButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//               <LinearGradient
//                 start={{x: 1, y: 0}}
//                 end={{x: 0, y: 0}}
//                 colors={['#874701', '#874701', '#874701']}
//                 style={styles.modalButton}>
//                 <TouchableOpacity onPress={removeUser}>
//                   <Text style={styles.modalButtonText}>Yes</Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>
//           </View>
//         </Modal>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default More;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
//   menuContainer: {
//     width: '100%',
//   },
//   menuItemTouchable: {
//     marginBottom: 8,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderColor: '#f3d25b',
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 3,
//   },
//   menuIcon: {
//     width: 25,
//     height: 25,
//   },
//   menuText: {
//     color: 'black',
//     fontSize: 16,
//     paddingLeft: 10,
//     fontFamily: 'Poppins-ExtraBold',
//   },
//   footerImageContainer: {
//     width: '100%',
//     height: 100,
//     justifyContent: 'flex-end',
//   },
//   footerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     textAlign: 'center',
//     fontSize: 17,
//     fontWeight: '600',
//     color: 'black',
//     fontFamily: 'Poppins-SemiBoldItalic',
//     marginBottom: 20,
//   },
//   modalButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   modalButton: {
//     height: 40,
//     width: 100,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontSize: 15,
//     fontFamily: 'Poppins-Regular',
//   },
// });





import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Platform,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Animatable from "react-native-animatable"
import { Share } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Modal from "react-native-modal"
import axios from "axios"
import LoaderKit from "react-native-loader-kit"
import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const { width, height } = Dimensions.get("window")

const More = () => {
  const navigation = useNavigation("")

  // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [user, setUser] = useState({})
  const userData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      userData()
    }, []),
  )

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleReferralShare = async (referralCode) => {
    try {
      const response = await axios.post("https://justbuynewbackend.onrender.com/api/v1/referral", {
        userId: user?._id,
        referral: referralCode,
      })
      console.log("Referral code shared successfully:", referralCode)
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred")
      console.error("Error sharing referral code:", error)
    }
  }

  const shareApp = async () => {
    try {
      const referralCode = generateReferralCode() // Generate the referral code once
      await handleReferralShare(referralCode) // Use the same code in the API request

      const deepLinkURL = "https://play.google.com/store/apps/details?id=com.nskparent/" + referralCode // Use the same code in the share message

      // Share the deep link with referral code in the message
      Share.share({
        message: `Use my referral code: ${referralCode} . Download here: ${deepLinkURL}`,
        url: deepLinkURL, // This might be ignored depending on platform
      })
        .then((result) => console.log("Shared successfully:", result))
        .catch((error) => console.error("Error sharing:", error))
    } catch (error) {
      console.error("Error sharing app:", error)
    }
  }

  useEffect(() => {
    userData()
  }, [])

  const [isModalVisible, setModalVisible] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  // Updated logout function with proper data management and app security
  const removeUser = async () => {
    setIsLoggingOut(true)
    try {
      // Get current user details before clearing
      const userDetails = await AsyncStorage.getItem("user")
      const parsedUser = userDetails ? JSON.parse(userDetails) : null

      console.log("Starting logout process for user:", parsedUser?.phoneno || "unknown")

      // Clear general login state and session data
      await AsyncStorage.removeItem("userLoggedIn")
      await AsyncStorage.removeItem("userPhone")
      await AsyncStorage.removeItem("user")
      await AsyncStorage.removeItem("staffData")

      // Clear app security flag - important for PIN verification flow
      await AsyncStorage.removeItem("pinVerificationNeeded")
      console.log("Cleared PIN verification needed flag during logout")

      // Clear session-specific data but preserve user-specific onboarding data
      const keys = await AsyncStorage.getAllKeys()
      const sessionKeys = keys.filter(
        (key) =>
          key.startsWith("selectedRestaurant_") ||
          key.startsWith("selectedTable_") ||
          key.includes("session") ||
          key.includes("temp") ||
          // Clear old global keys if they exist
          key === "userPin" ||
          key === "pinCreated" ||
          key === "termsAccepted" ||
          key === "onboardingCompleted",
      )

      if (sessionKeys.length > 0) {
        await AsyncStorage.multiRemove(sessionKeys)
        console.log("Cleared session keys:", sessionKeys)
      }

      // DO NOT clear user-specific PIN and terms data:
      // - userPin_${userId}
      // - termsAccepted_${userId}
      // - onboardingCompleted_${userId}
      // - pinCreated_${userId}

      console.log("Logout completed - PIN and terms data preserved for user, security flags cleared")

      // Close modal and navigate
      setModalVisible(false)

      // Small delay to ensure modal closes smoothly
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        })
      }, 300)
    } catch (error) {
      console.error("Error during logout:", error)
      Alert.alert("Logout Error", "There was an error logging out. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const menuItems = [
    {
      icon: require("../../assets/images/choices.png"),
      text: "Purchase History",
      route: "BookingDetails",
      animation: "fadeInLeft",
      iconName: "history",
    },
    {
      icon: require("../../assets/images/choices.png"),
      text: "Withdraw History",
      route: "CoinDetails",
      animation: "fadeInRight",
      iconName: "account-balance-wallet",
    },
    {
      icon: require("../../assets/images/padlock.png"),
      text: "Just buy gold Balance",
      route: "EarnedBonusPoint",
      animation: "fadeInRight",
      iconName: "account-balance",
    },
    {
      icon: require("../../assets/images/share.png"),
      text: "Share and Earn",
      action: shareApp,
      animation: "fadeInLeft",
      iconName: "share",
    },
    {
      icon: require("../../assets/images/information.png"),
      text: "About Us",
      route: "AboutUs",
      animation: "fadeInLeft",
      iconName: "info",
    },
    {
      icon: require("../../assets/images/terms-and-conditions.png"),
      text: "Terms & Condition",
      route: "TermsCondition",
      animation: "fadeInRight",
      iconName: "description",
    },
    {
      icon: require("../../assets/images/insurance.png"),
      text: "Privacy policy",
      route: "PrivacyPolicy",
      animation: "fadeInLeft",
      iconName: "privacy-tip",
    },
    {
      icon: require("../../assets/images/file.png"),
      text: "Disclaimer",
      route: "Disclaimer",
      animation: "fadeInRight",
      iconName: "gavel",
    },
    {
      icon: require("../../assets/images/terms-and-conditions.png"),
      text: "Help",
      route: "Help",
      animation: "fadeInRight",
      iconName: "help",
    },
    {
      icon: require("../../assets/images/logout.png"),
      text: "Sign Out",
      action: toggleModal,
      animation: "fadeInRight",
      textStyle: { color: "#FF4444" },
      iconName: "logout",
      isSignOut: true,
    },
  ]

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f3d25b" barStyle="dark-content" />

      {/* Header Section */}
      <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#874701" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>More</Text>
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      {loader ? (
        <View style={styles.loaderContainer}>
          <LoaderKit style={{ width: 50, height: 50 }} name={"LineSpinFadeLoader"} color={"#f3d25b"} />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItemTouchable}
                  onPress={() => {
                    if (item.action) {
                      item.action()
                    } else if (item.route) {
                      navigation.navigate(item.route)
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Animatable.View animation={item.animation} style={styles.menuCard}>
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, item.isSignOut && styles.signOutIconContainer]}>
                        <MaterialIcons name={item.iconName} size={24} color={item.isSignOut ? "#FF4444" : "#874701"} />
                      </View>
                      <Text style={[styles.menuText, item.textStyle]}>{item.text}</Text>
                      <MaterialIcons name="chevron-right" size={24} color="#ccc" style={styles.chevronIcon} />
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer Card */}
            <View style={styles.footerCard}>
              <Image source={require("../../assets/images/gg12.png")} resizeMode="contain" style={styles.footerImage} />
            </View>
          </View>
        </ScrollView>
      )}

      {/* Updated Logout Modal with loading state */}
      <Modal isVisible={isModalVisible} backdropOpacity={0.7}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <MaterialIcons name="logout" size={32} color="#FF4444" />
            <Text style={styles.modalTitle}>Sign Out</Text>
          </View>
          <Text style={styles.modalSubtitle}>Are you sure you want to sign out?</Text>

          {isLoggingOut ? (
            <View style={styles.loadingContainer}>
              <LoaderKit style={{ width: 30, height: 30 }} name={"LineSpinFadeLoader"} color={"#874701"} />
              <Text style={styles.loadingText}>Signing out...</Text>
            </View>
          ) : (
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={removeUser}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FF4444", "#FF6666"]}
                  style={styles.confirmButtonGradient}
                >
                  <Text style={styles.confirmButtonText}>Sign Out</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  )
}

export default More

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    backgroundColor: "#f8f9fa",
  },

  // Header Styles
  headerGradient: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#874701",
    fontFamily: "Poppins-SemiBoldItalic",
  },
  headerSpacer: {
    width: 36,
  },

  // Content Styles
  contentContainer: {
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  menuContainer: {
    gap: 12,
  },
  menuItemTouchable: {
    marginBottom: 0,
  },
  menuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#f3d25b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  signOutIconContainer: {
    backgroundColor: "#FFE6E6",
  },
  menuText: {
    flex: 1,
    color: "#030712",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBoldItalic",
  },
  chevronIcon: {
    marginLeft: 10,
  },

  // Footer Card
  footerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  footerImage: {
    width: "100%",
    height: 120,
  },

  // Modal Styles
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#030712",
    fontFamily: "Poppins-SemiBoldItalic",
    marginTop: 10,
  },
  modalSubtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 25,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  confirmButton: {
    flex: 1,
  },
  confirmButtonGradient: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Poppins-SemiBold",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 14,
    color: "#874701",
    fontFamily: "Poppins-Regular",
  },
})
