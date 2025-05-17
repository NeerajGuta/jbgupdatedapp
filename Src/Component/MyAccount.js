// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   Platform,
//   TextInput,
//   Alert,
//   Modal,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import {launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import React, {useState} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// // import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// const MyAccount = () => {
//   const navigation = useNavigation('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [username, setusername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [photo, setPhoto] = useState('');
//   const [password, setpassword] = useState('');
//   const [imageSource, setImageSource] = useState(null);

//   const takePhotoFromCamera1 = () => {
//     ImagePicker.openCamera({
//       compressImageMaxWidth: 300,
//       compressImageMaxHeight: 300,
//       cropping: true,
//       useFrontCamera: true,
//       compressImageQuality: 0.7,
//     }).then(image => {
//       setImageSource(image.path);
//       console.log('Camera Image Selected:', image.path); // Debug
//     });
//   };
//   const onselect2 = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 600,
//       cropping: true,
//     }).then(image => {
//       setImageSource(image.path);
//       console.log('Gallery Image Selected:', image.path); // Debug
//     });
//   };

//   const pickImage = async () => {
//     try {
//       const response = await launchImageLibrary({mediaType: 'photo'});
//       if (!response.didCancel && !response.error) {
//         setImageSource(response.assets[0].uri);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const [user, setUser] = useState('');
//   // Fetch user data from AsyncStorage
//   const userData = async () => {
//     const storedUser = await AsyncStorage.getItem('user');
//     const parsedUser = JSON.parse(storedUser);
//     console.log('Updated User:', parsedUser);
//     setUser(parsedUser);
//   };

//   // console.log('user:', user);

//   const updateCustomer = async () => {
//     try {
//       if (!imageSource && !username && !email && !phone) {
//         Alert.alert('No changes to update');
//         return;
//       }

//       const imageSourceUri = imageSource
//         ? Platform.OS === 'android'
//           ? `file://${imageSource}`
//           : imageSource
//         : null;

//       console.log('Image Source URI:', imageSourceUri);

//       const formData = new FormData();
//       formData.append('userId', user?._id);
//       formData.append('name', username || user?.name);
//       formData.append('email', email || user?.email);
//       formData.append('phoneno', phone || user?.phoneno);

//       if (imageSourceUri) {
//         formData.append('profileimage', {
//           uri: imageSourceUri,
//           name: 'profile.jpg',
//           type: 'image/jpeg',
//         });
//       }

//       console.log('FormData Contents:');
//       formData._parts.forEach(([key, value]) => {
//         console.log(`${key}: ${value?.uri || value}`);
//       });

//       const response = await fetch(
//         'https://justbuygold.co.in/api/v1/user/auth/updateuser',
//         {
//           method: 'PUT',
//           headers: {
//             // Do NOT set 'Content-Type' manually when using FormData
//             Accept: 'application/json',
//             // Include any required authentication headers here
//             // Example:
//             // Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         },
//       );

//       const resultText = await response.text();
//       console.log('Raw Fetch Response:', resultText);

//       const result = JSON.parse(resultText);
//       console.log('Parsed Fetch Response:', result);

//       if (response.ok) {
//         console.log('Updated Successfully');
//         await AsyncStorage.setItem('user', JSON.stringify(result.success));
//         userData(); // Reload user data
//         setImageSource(null); // Clear local image state
//         setUpdateProfile(true);
//         Alert.alert('Updated successfully');
//       } else {
//         console.error('Server Error:', result);
//         Alert.alert('Update failed', result?.message || 'Server Error');
//       }
//     } catch (error) {
//       console.error('Update Error:', error.message || error);
//       Alert.alert('Update failed', error.message || 'Network Error');
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('useFocusEffect Triggered'); // Debug
//       userData();
//     }, []),
//   );

//   const [updateProfile, setUpdateProfile] = useState(true);

//   return (
//     <ScrollView style={{backgroundColor: 'transparent'}}>
//       <StatusBar backgroundColor="transparent" barStyle="light-content" />
//       {updateProfile ? (
//         <>
//           <View style={styles.conatiner}>
//             <View style={[styles.account, {justifyContent: 'space-between'}]}>
//               <View style={styles.profiles}>
//                 {user?.profileimage ? (
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('Imagezoom', {user})}>
//                     <Image
//                       source={{
//                         uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
//                       }}
//                       resizeMode="cover"
//                       style={[
//                         styles.img,
//                         {borderRadius: 100, width: 70, height: 70},
//                       ]}
//                     />
//                   </TouchableOpacity>
//                 ) : (
//                   <>
//                     <Image
//                       source={require('../../assets/images/Buygold.jpg')}
//                       resizeMode="cover"
//                       style={[styles.img, {borderRadius: 100, width: 70}]}
//                     />
//                   </>
//                 )}

//                 <View style={styles.profile}>
//                   <Text
//                     style={[
//                       styles.textfont,
//                       {fontFamily: 'Poppins-ExtraBold'},
//                     ]}>
//                     {user?.name}
//                   </Text>
//                   <Text style={styles.textfont}>+91 {user?.phoneno}</Text>
//                   <Text style={[styles.textfont, {color: 'red'}]}>
//                     {user?.userId}
//                   </Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={{alignSelf: 'center'}}
//                 onPress={() => {
//                   // updateCustomer();
//                   setUpdateProfile(!updateProfile);
//                 }}>
//                 <FontAwesome5
//                   name="edit"
//                   size={28}
//                   style={{color: 'black'}}></FontAwesome5>
//               </TouchableOpacity>
//             </View>
//             <ScrollView>
//               <View style={styles.container}>
//                 <View style={styles.reg}>

//                   <View style={[styles.profiles, {marginVertical: 30}]}>

//                   </View>
//                   <View style={styles.back}>
//                     <Text style={styles.contant}>User Name</Text>
//                     <View style={styles.regback}>
//                       <Icon name="user" style={styles.icons} />
//                       <Text
//                         style={[styles.input, {paddingTop: 12}]}

//                       >
//                         {user?.name}
//                       </Text>
//                     </View>
//                     <Text style={styles.contant}>Email</Text>
//                     <View style={styles.regback}>
//                       <Ionicons name="mail" style={styles.icons} />
//                       <Text style={[styles.input, {paddingTop: 12}]}>
//                         {user?.email}
//                       </Text>
//                     </View>
//                     <Text style={styles.contant}>Phone No</Text>
//                     <View style={styles.regback}>
//                       <FontAwesome6 name="phone" style={styles.icons} />

//                       <Text style={[styles.input, {paddingTop: 12}]}>
//                         +91-{user?.phoneno}
//                       </Text>
//                     </View>

//                     <Image
//                       source={require('../../assets/images/g9.png')}
//                       resizeMode="contain"
//                       style={styles.imgContainer}
//                     />

//                   </View>
//                 </View>
//               </View>
//             </ScrollView>

//             {/* modal */}
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={() => {
//                 setModalVisible(!modalVisible);
//               }}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Text style={styles.modalText}>Complete action using</Text>
//                   <View style={styles.choose}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         takePhotoFromCamera1(), setModalVisible(!modalVisible);
//                       }}
//                       style={styles.gallercam}>
//                       <Image
//                         source={require('../../assets/images/camera.png')}
//                         style={styles.icon}
//                       />
//                       <Text style={{color: 'black'}}>Camera</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => {
//                         onselect2(), setModalVisible(!modalVisible);
//                       }}
//                       style={styles.gallercam}>
//                       <Image
//                         source={require('../../assets/images/gallery.png')}
//                         style={styles.icon}
//                       />
//                       <Text style={{color: 'black'}}>Gallery</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <TouchableOpacity
//                     style={[styles.button, styles.buttonClose]}
//                     onPress={() => setModalVisible(!modalVisible)}>
//                     <Text style={styles.textStyle}>Close</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </>
//       ) : (
//         <>
//           <View style={styles.conatiner}>
//             <View style={[styles.account, {justifyContent: 'space-between'}]}>
//               <View style={styles.profiles}>
//                 <Image
//                   source={{
//                     uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
//                   }}
//                   resizeMode="cover"
//                   style={[
//                     styles.img,
//                     {borderRadius: 100, width: 70, height: 70},
//                   ]}
//                 />
//                 <View style={styles.profile}>
//                   <Text
//                     style={[
//                       styles.textfont,
//                       {fontFamily: 'Poppins-ExtraBold'},
//                     ]}>
//                     {user?.name}
//                   </Text>
//                   <Text style={styles.textfont}>+91 {user?.phoneno}</Text>
//                   <Text style={[styles.textfont, {color: 'red'}]}>
//                     {user?.userId}
//                   </Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={{alignSelf: 'center'}}
//                 onPress={() => {
//                   updateCustomer();
//                   setUpdateProfile(!updateProfile);
//                 }}>
//                 <Text style={[styles.cabs, {color: 'black'}]}>Save</Text>
//               </TouchableOpacity>
//             </View>
//             <ScrollView>
//               <View style={styles.container}>
//                 <View style={styles.reg}>

//                   <View style={[styles.profiles, {marginVertical: 30}]}>
//                     <Image
//                       source={
//                         imageSource
//                           ? {uri: `${imageSource}?${new Date().getTime()}`}
//                           : {
//                               uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
//                             }
//                       }
//                       resizeMode="cover"
//                       style={styles.img}
//                     />

//                     <TouchableOpacity
//                       // onPress={pickImage}
//                       onPress={() => setModalVisible(true)}>
//                       <FontAwesome6
//                         name="camera"
//                         size={25}
//                         color="white"
//                         style={{
//                           position: 'absolute',
//                           top: '67%',
//                           right: '100%',
//                         }}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                   <View style={[styles.back, {paddingTop: 60}]}>
//                     <Text style={styles.contant}>User Name</Text>
//                     <View style={styles.regback}>
//                       <Icon name="user" style={styles.icons} />

//                       <TextInput
//                         style={styles.input}
//                         value={username}
//                         onChangeText={username => setusername(username)}
//                         placeholder={user?.name}
//                         keyboardType="default"
//                         placeholderTextColor={'black'}
//                       />
//                     </View>
//                     <Text style={styles.contant}>Email</Text>
//                     <View style={styles.regback}>
//                       <Ionicons name="mail" style={styles.icons} />

//                       <TextInput
//                         style={styles.input}
//                         value={email}
//                         onChangeText={email => setEmail(email)}
//                         placeholder={user?.email}
//                         keyboardType="email-address"
//                         placeholderTextColor={'black'}
//                       />
//                     </View>

//                   </View>
//                 </View>
//               </View>
//             </ScrollView>
//             {/* modal */}
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={() => {
//                 setModalVisible(!modalVisible);
//               }}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Text style={styles.modalText}>Complete action using</Text>
//                   <View style={styles.choose}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         takePhotoFromCamera1(), setModalVisible(!modalVisible);
//                       }}
//                       style={styles.gallercam}>
//                       <Image
//                         source={require('../../assets/images/camera.png')}
//                         style={styles.icon}
//                       />
//                       <Text style={{color: 'black'}}>Camera</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => {
//                         onselect2(), setModalVisible(!modalVisible);
//                       }}
//                       style={styles.gallercam}>
//                       <Image
//                         source={require('../../assets/images/gallery.png')}
//                         style={styles.icon}
//                       />
//                       <Text style={{color: 'black'}}>Gallery</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <TouchableOpacity
//                     style={[styles.button, styles.buttonClose]}
//                     onPress={() => setModalVisible(!modalVisible)}>
//                     <Text style={styles.textStyle}>Close</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default MyAccount;

// const styles = StyleSheet.create({
//   conatiner: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     height: '100%',
//   },
//   account: {
//     padding: 8,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//   },
//   img: {
//     width: 60,
//     height: 60,
//   },
//   img1: {
//     width: 30,
//     height: 30,
//   },
//   imgContainer: {
//     width: 'fit-content',
//     height: 200,
//     marginTop: 20,
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
//     lineHeight: 22,
//     fontFamily: 'Poppins-MediumItalic',
//   },
//   passfont: {
//     color: 'black',
//     fontSize: 15,
//     fontWeight: '500',
//     paddingLeft: 10,
//   },
//   booking: {
//     padding: 10,
//   },
//   profiles1: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 17,
//     paddingBottom: 17,
//     borderBottomWidth: 1,
//     backgroundColor: 'white',
//     paddingBottom: 10,
//     marginBottom: 8,
//     paddingLeft: 10,
//     borderColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 9,
//     },
//     shadowOpacity: 0.48,
//     shadowRadius: 11.95,

//     elevation: 15,
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
//   // image: {
//   //   height: '100%',
//   // },
//   reg: {
//     width: '100%',
//   },
//   updatepro: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 20,
//   },
//   cabs: {
//     color: 'white',
//     fontSize: 18,
//     // fontWeight: '700',
//     fontFamily: 'Poppins-MediumItalic',
//   },
//   img: {
//     width: 130,
//     height: 130,
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   profiles: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     // paddingBottom: 150,
//   },
//   register: {
//     position: 'relative',
//     marginTop: 110,
//   },
//   text1: {
//     color: 'white',
//     fontSize: 25,
//     fontWeight: 'bold',
//     padding: 10,
//   },
//   back: {
//     height: '100%',
//     backgroundColor: 'white',
//     padding: 20,
//     paddingBottom: 200,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     position: 'relative',
//   },
//   regback: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   icons: {
//     position: 'absolute',
//     zIndex: 999,
//     left: 8,
//     fontSize: 22,
//     color: '#874701',
//   },
//   icons2: {
//     position: 'absolute',
//     zIndex: 999,
//     right: 8,
//     fontSize: 22,
//     color: '#874701',
//   },
//   input: {
//     height: 45,
//     marginTop: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderRadius: 6,
//     color: 'black',
//     // padding: 15,
//     paddingLeft: 38,
//     width: '100%',
//     borderColor: '#874701',
//     backgroundColor: 'white',
//     // shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 3,
//     fontFamily: 'Poppins-MediumItalic',
//   },
//   contant: {
//     fontSize: 15,
//     color: 'black',
//     fontWeight: '700',
//   },
//   btn: {
//     textAlign: 'center',
//     fontSize: 20,
//     backgroundColor: '#874701',
//     color: 'white',
//     fontWeight: 'bold',
//     padding: 2,
//     marginTop: 12,
//     marginBottom: 10,
//     borderRadius: 100,
//     width: '100%',
//   },
//   btn2: {
//     textAlign: 'center',
//     fontSize: 20,
//     borderColor: '#874701',
//     borderWidth: 2,
//     color: 'black',
//     fontWeight: 'bold',
//     padding: 8,
//     marginTop: 12,
//     marginBottom: 10,
//     borderRadius: 100,
//     width: '100%',
//   },
//   centeredView: {
//     position: 'absolute',
//     bottom: 50,
//     width: 360,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   choose: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   gallercam: {
//     alignItems: 'center',
//   },
//   icon: {
//     width: 50,
//     height: 50,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     width: 100,
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//     marginTop: 15,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  ImageBackground,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');

const MyAccount = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [user, setUser] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(true);
  const [cropRect, setCropRect] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });

  const imageRef = useRef(null);

  const takePhotoFromCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.7,
      });
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open camera');
        return;
      }
      if (result.assets && result.assets[0].uri) {
        setTempImage(result.assets[0].uri);
        setCropModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const selectFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.7,
      });
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open gallery');
        return;
      }
      if (result.assets && result.assets[0].uri) {
        setTempImage(result.assets[0].uri);
        setCropModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

  const startPos = useRef({x: 0, y: 0});

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        // Save the current cropRect position
        startPos.current = {x: cropRect.x, y: cropRect.y};
      },

      onPanResponderMove: (evt, gestureState) => {
        const dx = gestureState.dx;
        const dy = gestureState.dy;

        const newX = Math.max(
          0,
          Math.min(startPos.current.x + dx, width - cropRect.width),
        );
        const newY = Math.max(
          0,
          Math.min(startPos.current.y + dy, height - cropRect.height - 100),
        );

        setCropRect(prev => ({...prev, x: newX, y: newY}));
      },

      onPanResponderRelease: () => {},
    }),
  ).current;

  const resizePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setCropRect(prev => {
          let newWidth = prev.width + gestureState.dx;
          let newHeight = prev.height + gestureState.dy;
          newWidth = Math.max(50, Math.min(newWidth, width - prev.x));
          newHeight = Math.max(50, Math.min(newHeight, height - prev.y - 100));
          return {...prev, width: newWidth, height: newHeight};
        });
      },
    }),
  ).current;

  const handleCrop = () => {
    setImageSource(tempImage);
    setCropModalVisible(false);
    setModalVisible(false);
    Alert.alert('Crop', 'Image cropped successfully (simulated).');
  };

  const userData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUsername(parsedUser.name || '');
        setEmail(parsedUser.email || '');
        setPhone(parsedUser.phoneno || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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

      const response = await fetch(
        'https://justbuygold.co.in/api/v1/user/auth/updateuser',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(result.success));
        userData();
        setImageSource(null);
        setUpdateProfile(true);
        Alert.alert('Updated successfully');
      } else {
        Alert.alert('Update failed', result?.message || 'Server Error');
      }
    } catch (error) {
      Alert.alert('Update failed', error.message || 'Network Error');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/images/app-bg.jpg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {updateProfile ? (
            <View style={styles.profileContainer}>
              <View style={styles.account}>
                <View style={styles.profileInfo}>
                  {user?.profileimage ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Imagezoom', {user})}>
                      <Image
                        source={{
                          uri: `https://justbuygold.co.in/User/${user?.profileimage}`,
                        }}
                        style={styles.profileImage}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Image
                      source={require('../../assets/images/Buygold.jpg')}
                      style={styles.profileImage}
                    />
                  )}
                  <View style={styles.profileDetails}>
                    <Text style={styles.nameText}>
                      {user?.name || 'Loading...'}
                    </Text>
                    <Text style={styles.phoneText}>+91 {user?.phoneno}</Text>
                    <Text style={styles.userIdText}>{user?.userId}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setUpdateProfile(false)}>
                  <FontAwesome5 name="edit" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoSection}>
                  {/* User Name */}
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 8,
                    }}>
                    User Name
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#feac03',
                      borderRadius: 10,
                      backgroundColor: '#f5f5f5',
                      marginBottom: 15,
                      height: 55,
                      paddingHorizontal: 10,
                    }}>
                    <Icon
                      name="user"
                      style={{fontSize: 18, marginRight: 10, color: '#feac03'}}
                    />
                    <Text
                      style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
                      {user?.name}
                    </Text>
                  </View>

                  {/* Email */}
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 8,
                    }}>
                    Email
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#feac03',
                      borderRadius: 10,
                      backgroundColor: '#f5f5f5',
                      marginBottom: 15,
                      height: 55,
                      paddingHorizontal: 10,
                    }}>
                    <Ionicons
                      name="mail"
                      style={{fontSize: 18, marginRight: 10, color: '#feac03'}}
                    />
                    <Text
                      style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
                      {user?.email}
                    </Text>
                  </View>

                  {/* Phone No */}
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 8,
                    }}>
                    Phone No
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#feac03',
                      borderRadius: 10,
                      backgroundColor: '#f5f5f5',
                      marginBottom: 15,
                      height: 55,
                      paddingHorizontal: 10,
                    }}>
                    <FontAwesome6
                      name="phone"
                      style={{fontSize: 18, marginRight: 10, color: '#feac03'}}
                    />
                    <Text
                      style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
                      +91-{user?.phoneno}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.profileContainer}>
              <View style={styles.account}>
                <View style={styles.profileInfo}>
                  <Image
                    source={{
                      uri: imageSource
                        ? `${imageSource}?${new Date().getTime()}`
                        : `https://justbuygold.co.in/User/${user?.profileimage}`,
                    }}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileDetails}>
                    <Text style={styles.nameText}>
                      {user?.name || 'Loading...'}
                    </Text>
                    <Text style={styles.phoneText}>+91 {user?.phoneno}</Text>
                    <Text style={styles.userIdText}>{user?.userId}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    updateCustomer();
                    setUpdateProfile(true);
                  }}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoSection}>
                  <View style={styles.profileImageContainer}>
                    <Image
                      source={{
                        uri: imageSource
                          ? `${imageSource}?${new Date().getTime()}`
                          : `https://justbuygold.co.in/User/${user?.profileimage}`,
                      }}
                      style={styles.largerProfileImage}
                    />
                    <TouchableOpacity
                      style={styles.cameraButton}
                      onPress={() => setModalVisible(true)}>
                      <FontAwesome6 name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.label}>User Name</Text>
                  <View
                    style={[styles.inputContainer, {backgroundColor: '#fff'}]}>
                    <Icon name="user" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={username}
                      onChangeText={setUsername}
                      placeholder={user?.name}
                      placeholderTextColor="#666"
                    />
                  </View>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={[styles.inputContainer, {backgroundColor: '#fff'}]}>
                    <Ionicons name="mail" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder={user?.email}
                      keyboardType="email-address"
                      placeholderTextColor="#666"
                    />
                  </View>
                  <Text style={styles.label}>Phone No</Text>
                  <View
                    style={[styles.inputContainer, {backgroundColor: '#fff'}]}>
                    <FontAwesome6 name="phone" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder={user?.phoneno}
                      keyboardType="phone-pad"
                      placeholderTextColor="#666"
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Image Source</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      takePhotoFromCamera();
                      setModalVisible(false);
                    }}>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.modalIcon}
                    />
                    <Text style={styles.modalButtonText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      selectFromGallery();
                      setModalVisible(false);
                    }}>
                    <Image
                      source={require('../../assets/images/gallery.png')}
                      style={styles.modalIcon}
                    />
                    <Text style={styles.modalButtonText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={false}
            visible={cropModalVisible}
            onRequestClose={() => setCropModalVisible(false)}>
            <View style={styles.cropContainer}>
              <Image
                ref={imageRef}
                source={{uri: tempImage}}
                style={styles.cropImage}
                resizeMode="contain"
              />
              <View
                style={[
                  styles.cropRectangle,
                  {
                    left: cropRect.x,
                    top: cropRect.y,
                    width: cropRect.width,
                    height: cropRect.height,
                  },
                ]}
                {...panResponder.panHandlers}>
                <View
                  style={styles.resizeHandle}
                  {...resizePanResponder.panHandlers}
                />
              </View>
              <View style={styles.cropButtons}>
                <TouchableOpacity
                  style={styles.cancelCropButton}
                  onPress={() => setCropModalVisible(false)}>
                  <Text style={styles.cancelCropButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmCropButton}
                  onPress={handleCrop}>
                  <Text style={styles.cancelCropButtonText}>Crop</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {updateProfile && (
            <View style={styles.xyz}>
              {/* 1st: Text then Image */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 4,
                  borderColor: '#feac03',
                  marginBottom: 13,
                  borderRadius: 35,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#f3d25b',
                  width: '90%',
                  marginLeft: 17,
                  height: 100,
                }}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    width: '68%',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-SemiBoldItalic',
                    color: 'black',
                    marginLeft: 25,
                  }}>
                  Start saving today for better tomorrow
                </Text>

                <Image
                  source={require('../../assets/images/g1.png')}
                  style={{height: 60, width: 90}}
                  resizeMode="contain"
                />
              </View>

              {/* 2nd: Image then Text */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 4,
                  borderColor: '#feac03',
                  marginBottom: 13,
                  borderRadius: 35,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#f3d25b',
                  width: '90%',
                  marginLeft: 17,
                  height: 100,
                }}>
                <Image
                  source={require('../../assets/images/g2.png')}
                  style={{height: 60, width: 110, marginLeft: -25}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    textTransform: 'uppercase',
                    width: '68%',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-SemiBoldItalic',
                    color: 'black',
                    marginRight: 20,
                  }}>
                  Daily investing by small amount and get bigger value
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 4,
                  borderColor: '#feac03',
                  marginBottom: 13,
                  borderRadius: 35,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#f3d25b',
                  width: '90%',
                  marginLeft: 17,
                  height: 100,
                }}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    width: '68%',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-SemiBoldItalic',
                    color: 'black',
                    marginLeft: 20,
                  }}>
                  Refer today for get more surprise
                </Text>
                <Image
                  source={require('../../assets/images/g3.png')}
                  style={{height: 60, width: 110, marginRight: -18}}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#feac03',
  },
  profileDetails: {
    marginLeft: 15,
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'Poppins-ExtraBold',
    color: '#333',
  },
  phoneText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  userIdText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff3333',
  },
  editButton: {
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#feac03',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  infoContainer: {
    paddingTop: 20,
  },
  infoSection: {
    paddingHorizontal: 15,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  largerProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#feac03',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#feac03',
    borderRadius: 15,
    padding: 8,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#feac03',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    fontSize: 14,
    fontWeight: '500',
  },

  icon: {
    fontSize: 20,
    color: '#feac03',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: '#333',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  inputText: {
    flex: 1,
    padding: 15,
    color: '#333',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: width - 40,
    alignItems: 'center',
  },
  xyz: {
    color: '#fff',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    alignItems: 'center',
    padding: 10,
  },
  modalIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#feac03',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  cropContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropImage: {
    width: width,
    height: height - 100,
  },
  cropRectangle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  resizeHandle: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 20,
    height: 20,
    backgroundColor: '#feac03',
    borderRadius: 10,
  },
  cropButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'space-between',
    width: width - 40,
  },
  cancelCropButton: {
    backgroundColor: '#ff3333',
    padding: 15,
    borderRadius: 10,
  },
  confirmCropButton: {
    backgroundColor: '#feac03',
    padding: 15,
    borderRadius: 10,
  },
  cancelCropButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  promotionContainer: {
    padding: 15,
  },
  promotionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#feac03',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    paddingVertical: 20,
  },
  promotionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    textTransform: 'uppercase',
    marginRight: 10,
  },
  promotionImage: {
    width: 80,
    height: 40,
  },
});

export default MyAccount;
