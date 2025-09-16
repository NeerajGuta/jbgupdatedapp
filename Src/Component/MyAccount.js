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
//         'https://justbuynewbackend.onrender.com/api/v1/user/auth/updateuser',
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
//                         uri: `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
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
//                     uri: `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
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
//                               uri: `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
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

/* import {
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
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false); // Add loading state
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

      setIsLoading(true); // Start loading

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
        'https://justbuynewbackend.onrender.com/api/v1/user/auth/updateuser',
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
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Update failed', result?.message || 'Server Error');
      }
    } catch (error) {
      Alert.alert('Update failed', error.message || 'Network Error');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, []),
  );

  // Loading Modal Component
  const LoadingModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoading}
      onRequestClose={() => {}}>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#feac03" />
          <Text style={styles.loadingText}>Updating Profile...</Text>
        </View>
      </View>
    </Modal>
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
                          uri: `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
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
                  <Text style={styles.label}>User Name</Text>
                  <View style={styles.displayContainer}>
                    <Icon name="user" style={styles.icon} />
                    <Text style={styles.displayText}>{user?.name}</Text>
                  </View>

                  <Text style={styles.label}>Email</Text>
                  <View style={styles.displayContainer}>
                    <Ionicons name="mail" style={styles.icon} />
                    <Text style={styles.displayText}>{user?.email}</Text>
                  </View>

                  <Text style={styles.label}>Phone No</Text>
                  <View style={styles.displayContainer}>
                    <FontAwesome6 name="phone" style={styles.icon} />
                    <Text style={styles.displayText}>+91-{user?.phoneno}</Text>
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
                        : `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
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
                  style={[styles.saveButton, isLoading && styles.disabledButton]}
                  onPress={() => {
                    if (!isLoading) {
                      updateCustomer();
                    }
                  }}
                  disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoSection}>
                  <View style={styles.profileImageContainer}>
                    <Image
                      source={{
                        uri: imageSource
                          ? `${imageSource}?${new Date().getTime()}`
                          : `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
                      }}
                      style={styles.largerProfileImage}
                    />
                    <TouchableOpacity
                      style={styles.cameraButton}
                      onPress={() => setModalVisible(true)}
                      disabled={isLoading}>
                      <FontAwesome6 name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.label}>User Name</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="user" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={username}
                      onChangeText={setUsername}
                      placeholder={user?.name}
                      placeholderTextColor="#666"
                      editable={!isLoading}
                    />
                  </View>

                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder={user?.email}
                      keyboardType="email-address"
                      placeholderTextColor="#666"
                      editable={!isLoading}
                    />
                  </View>

                  <Text style={styles.label}>Phone No</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome6 name="phone" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder={user?.phoneno}
                      keyboardType="phone-pad"
                      placeholderTextColor="#666"
                      editable={!isLoading}
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

         
          <LoadingModal />

          {updateProfile && (
            <View style={styles.xyz}>
              <View style={styles.promotionCard}>
                <Text style={styles.promotionText}>
                  Start saving today for better tomorrow
                </Text>
                <Image
                  source={require('../../assets/images/g1.png')}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.promotionCard}>
                <Image
                  source={require('../../assets/images/g2.png')}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
                <Text style={styles.promotionText}>
                  Daily investing by small amount and get bigger value
                </Text>
              </View>

              <View style={styles.promotionCard}>
                <Text style={styles.promotionText}>
                  Refer today for get more surprise
                </Text>
                <Image
                  source={require('../../assets/images/g3.png')}
                  style={styles.promotionImage}
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
    minWidth: 60,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
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
    backgroundColor: '#fff',
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#feac03',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    height: 55,
    paddingHorizontal: 10,
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
  displayText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 10,
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
  xyz: {
    padding: 15,
  },
  promotionCard: {
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
    height: 100,
  },
  promotionText: {
    textTransform: 'uppercase',
    width: '68%',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBoldItalic',
    color: 'black',
    marginHorizontal: 15,
  },
  promotionImage: {
    height: 60,
    width: 90,
  },
  // Loading Modal Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    textAlign: 'center',
  },
});

export default MyAccount; */


/* import {
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
  PanResponder,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import ImagePicker from "react-native-image-crop-picker";

const { width, height } = Dimensions.get("window");

const MyAccount = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [user, setUser] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cropRect, setCropRect] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  const [lockAspectRatio, setLockAspectRatio] = useState(true); // Lock to 1:1 for profile pictures

  const imageRef = useRef(null);

  const takePhotoFromCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: "photo",
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.7,
      });
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert("Error", result.errorMessage || "Failed to open camera");
        return;
      }
      if (result.assets && result.assets[0].uri) {
        setTempImage(result.assets[0].uri);
        setCropModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open camera");
    }
  };

  const selectFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.7,
      });
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert("Error", result.errorMessage || "Failed to open gallery");
        return;
      }
      if (result.assets && result.assets[0].uri) {
        setTempImage(result.assets[0].uri);
        setCropModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open gallery");
    }
  };

  // Enhanced PanResponder for dragging the crop rectangle
  const startPos = useRef({ x: 0, y: 0 });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startPos.current = { x: cropRect.x, y: cropRect.y };
      },
      onPanResponderMove: (evt, gestureState) => {
        const dx = gestureState.dx;
        const dy = gestureState.dy;
        const newX = Math.max(0, Math.min(startPos.current.x + dx, width - cropRect.width));
        const newY = Math.max(0, Math.min(startPos.current.y + dy, height - cropRect.height - 100));
        setCropRect((prev) => ({ ...prev, x: newX, y: newY }));
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  // PanResponders for each corner handle
  const handleTopLeft = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setCropRect((prev) => {
          let newWidth = prev.width - gestureState.dx;
          let newHeight = lockAspectRatio ? newWidth : prev.height - gestureState.dy;
          let newX = prev.x + gestureState.dx;
          let newY = lockAspectRatio ? prev.y + gestureState.dx : prev.y + gestureState.dy;

          newWidth = Math.max(50, Math.min(newWidth, width - prev.x));
          newHeight = Math.max(50, Math.min(newHeight, height - prev.y - 100));
          newX = Math.max(0, Math.min(newX, prev.x + prev.width - 50));
          newY = Math.max(0, Math.min(newY, prev.y + prev.height - 50));

          return { ...prev, x: newX, y: newY, width: newWidth, height: newHeight };
        });
      },
    })
  ).current;

  const handleTopRight = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setCropRect((prev) => {
          let newWidth = prev.width + gestureState.dx;
          let newHeight = lockAspectRatio ? newWidth : prev.height - gestureState.dy;
          let newY = lockAspectRatio ? prev.y - gestureState.dx : prev.y + gestureState.dy;

          newWidth = Math.max(50, Math.min(newWidth, width - prev.x));
          newHeight = Math.max(50, Math.min(newHeight, height - prev.y - 100));
          newY = Math.max(0, Math.min(newY, prev.y + prev.height - 50));

          return { ...prev, y: newY, width: newWidth, height: newHeight };
        });
      },
    })
  ).current;

  const handleBottomLeft = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setCropRect((prev) => {
          let newWidth = prev.width - gestureState.dx;
          let newHeight = lockAspectRatio ? newWidth : prev.height + gestureState.dy;
          let newX = prev.x + gestureState.dx;

          newWidth = Math.max(50, Math.min(newWidth, width - prev.x));
          newHeight = Math.max(50, Math.min(newHeight, height - prev.y - 100));
          newX = Math.max(0, Math.min(newX, prev.x + prev.width - 50));

          return { ...prev, x: newX, width: newWidth, height: newHeight };
        });
      },
    })
  ).current;

  const handleBottomRight = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setCropRect((prev) => {
          let newWidth = prev.width + gestureState.dx;
          let newHeight = lockAspectRatio ? newWidth : prev.height + gestureState.dy;

          newWidth = Math.max(50, Math.min(newWidth, width - prev.x));
          newHeight = Math.max(50, Math.min(newHeight, height - prev.y - 100));

          return { ...prev, width: newWidth, height: newHeight };
        });
      },
    })
  ).current;

  const handleCrop = async () => {
    try {
      const croppedImage = await ImagePicker.openCropper({
        path: tempImage,
        width: cropRect.width,
        height: cropRect.height,
        cropperRectangle: {
          x: cropRect.x,
          y: cropRect.y,
          width: cropRect.width,
          height: cropRect.height,
        },
      });
      setImageSource(croppedImage.path);
      setCropModalVisible(false);
      setModalVisible(false);
      Alert.alert("Success", "Image cropped successfully!");
    } catch (error) {
      Alert.alert("Crop Error", "Failed to crop image");
    }
  };

  const userData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUsername(parsedUser.name || "");
        setEmail(parsedUser.email || "");
        setPhone(parsedUser.phoneno || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateCustomer = async () => {
    try {
      if (!imageSource && !username && !email && !phone) {
        Alert.alert("No changes to update");
        return;
      }

      setIsLoading(true);

      const imageSourceUri = imageSource
        ? Platform.OS === "android"
          ? `file://${imageSource}`
          : imageSource
        : null;

      const formData = new FormData();
      formData.append("userId", user?._id);
      formData.append("name", username || user?.name);
      formData.append("email", email || user?.email);
      formData.append("phoneno", phone || user?.phoneno);

      if (imageSourceUri) {
        formData.append("profileimage", {
          uri: imageSourceUri,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      const response = await fetch("https://justbuynewbackend.onrender.com/api/v1/user/auth/updateuser", {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(result.success));
        userData();
        setImageSource(null);
        setUpdateProfile(true);
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Update failed", result?.message || "Server Error");
      }
    } catch (error) {
      Alert.alert("Update failed", error.message || "Network Error");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, [])
  );

  // Loading Modal Component
  const LoadingModal = () => (
    <Modal animationType="fade" transparent={true} visible={isLoading} onRequestClose={() => {}}>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#f3d25b" />
          <Text style={styles.loadingText}>Updating Profile...</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f3d25b" barStyle="dark-content" />

     
      <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#874701" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {updateProfile ? (
          <View style={styles.profileContainer}>
           
            <View style={styles.profileHeaderCard}>
              <View style={styles.profileInfo}>
                {user?.profileimage ? (
                  <TouchableOpacity onPress={() => navigation.navigate("Imagezoom", { user })}>
                    <View style={styles.profileImageWrapper}>
                      <Image
                        source={{
                          uri: `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
                        }}
                        style={styles.profileImage}
                      />
                      <View style={styles.onlineIndicator} />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.profileImageWrapper}>
                    <Image source={require("../../assets/images/Buygold.jpg")} style={styles.profileImage} />
                    <View style={styles.onlineIndicator} />
                  </View>
                )}
                <View style={styles.profileDetails}>
                  <Text style={styles.nameText}>{user?.name || "Loading..."}</Text>
                  <Text style={styles.phoneText}>+91 {user?.phoneno}</Text>
                  <View style={styles.userIdContainer}>
                    <Text style={styles.userIdLabel}>ID: </Text>
                    <Text style={styles.userIdText}>{user?.userId}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => setUpdateProfile(false)}>
                <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.editButtonGradient}>
                  <FontAwesome5 name="edit" size={18} color="#874701" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

           
            <View style={styles.infoCardsContainer}>
              <View style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Icon name="user" style={styles.cardIcon} />
                  <Text style={styles.cardLabel}>User Name</Text>
                </View>
                <Text style={styles.cardValue}>{user?.name}</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Ionicons name="mail" style={styles.cardIcon} />
                  <Text style={styles.cardLabel}>Email Address</Text>
                </View>
                <Text style={styles.cardValue}>{user?.email}</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <FontAwesome6 name="phone" style={styles.cardIcon} />
                  <Text style={styles.cardLabel}>Phone Number</Text>
                </View>
                <Text style={styles.cardValue}>+91-{user?.phoneno}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.profileContainer}>
          
            <View style={styles.editProfileHeader}>
              <View style={styles.editProfileInfo}>
                <View style={styles.compactProfileImageWrapper}>
                  <Image
                    source={{
                      uri: imageSource
                        ? `${imageSource}?${new Date().getTime()}`
                        : `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
                    }}
                    style={styles.compactProfileImage}
                  />
                  <View style={styles.onlineIndicator} />
                </View>
                <View style={styles.compactProfileDetails}>
                  <Text style={styles.compactNameText} numberOfLines={1}>
                    {user?.name || "Loading..."}
                  </Text>
                  <Text style={styles.compactPhoneText} numberOfLines={1}>
                    +91 {user?.phoneno}
                  </Text>
                  <View style={styles.compactUserIdContainer}>
                    <Text style={styles.userIdLabel}>ID: </Text>
                    <Text style={styles.userIdText}>{user?.userId}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.saveButton, isLoading && styles.disabledButton]}
                onPress={() => {
                  if (!isLoading) {
                    updateCustomer();
                  }
                }}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? ["#ccc", "#ccc"] : ["#f3d25b", "#f3d25b"]}
                  style={styles.saveButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#874701" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            
            <View style={styles.editFormContainer}>
            
              <View style={styles.profileImageSection}>
                <Text style={styles.sectionTitle}>Profile Picture</Text>
                <View style={styles.profileImageEditContainer}>
                  <View style={styles.largeProfileImageWrapper}>
                    <Image
                      source={{
                        uri: imageSource
                          ? `${imageSource}?${new Date().getTime()}`
                          : `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`,
                      }}
                      style={styles.largerProfileImage}
                    />
                    <TouchableOpacity
                      style={styles.cameraButton}
                      onPress={() => setModalVisible(true)}
                      disabled={isLoading}
                    >
                      <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.cameraButtonGradient}>
                        <FontAwesome6 name="camera" size={16} color="#874701" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

             
              <View style={styles.formFieldsContainer}>
                <Text style={styles.sectionTitle}>Personal Information</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>User Name</Text>
                  <View style={styles.modernInputContainer}>
                    <Icon name="user" style={styles.inputIcon} />
                    <TextInput
                      style={styles.modernInput}
                      value={username}
                      onChangeText={setUsername}
                      placeholder={user?.name}
                      placeholderTextColor="#999"
                      editable={!isLoading}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.modernInputContainer}>
                    <Ionicons name="mail" style={styles.inputIcon} />
                    <TextInput
                      style={styles.modernInput}
                      value={email}
                      onChangeText={setEmail}
                      placeholder={user?.email}
                      keyboardType="email-address"
                      placeholderTextColor="#999"
                      editable={!isLoading}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.modernInputContainer}>
                    <FontAwesome6 name="phone" style={styles.inputIcon} />
                    <TextInput
                      style={styles.modernInput}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder={user?.phoneno}
                      keyboardType="phone-pad"
                      placeholderTextColor="#999"
                      editable={!isLoading}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

   
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Image Source</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    takePhotoFromCamera();
                    setModalVisible(false);
                  }}
                >
                  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.modalButtonGradient}>
                    <Image source={require("../../assets/images/camera.png")} style={styles.modalIcon} />
                    <Text style={styles.modalButtonText}>Camera</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    selectFromGallery();
                    setModalVisible(false);
                  }}
                >
                  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.modalButtonGradient}>
                    <Image source={require("../../assets/images/gallery.png")} style={styles.modalIcon} />
                    <Text style={styles.modalButtonText}>Gallery</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <LinearGradient colors={["#874701", "#874701"]} style={styles.closeButtonGradient}>
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      
        <Modal
          animationType="fade"
          transparent={false}
          visible={cropModalVisible}
          onRequestClose={() => setCropModalVisible(false)}
        >
          <View style={styles.cropContainer}>
            <Image ref={imageRef} source={{ uri: tempImage }} style={styles.cropImage} resizeMode="contain" />
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
              {...panResponder.panHandlers}
            >
            
              <View style={styles.gridContainer}>
                <View style={styles.gridRow}>
                  <View style={styles.gridCell} />
                  <View style={[styles.gridCell, styles.gridVertical]} />
                  <View style={styles.gridCell} />
                </View>
                <View style={[styles.gridRow, styles.gridHorizontal]}>
                  <View style={styles.gridCell} />
                  <View style={[styles.gridCell, styles.gridVertical]} />
                  <View style={styles.gridCell} />
                </View>
                <View style={styles.gridRow}>
                  <View style={styles.gridCell} />
                  <View style={[styles.gridCell, styles.gridVertical]} />
                  <View style={styles.gridCell} />
                </View>
              </View>

             
              <View style={[styles.resizeHandle, styles.topLeft]} {...handleTopLeft.panHandlers} />
              <View style={[styles.resizeHandle, styles.topRight]} {...handleTopRight.panHandlers} />
              <View style={[styles.resizeHandle, styles.bottomLeft]} {...handleBottomLeft.panHandlers} />
              <View style={[styles.resizeHandle, styles.bottomRight]} {...handleBottomRight.panHandlers} />
            </View>

         
            <View style={styles.cropControls}>
              <TouchableOpacity
                style={styles.aspectButton}
                onPress={() => setLockAspectRatio(!lockAspectRatio)}
              >
                <LinearGradient
                  colors={lockAspectRatio ? ["#f3d25b", "#f3d25b"] : ["#ccc", "#ccc"]}
                  style={styles.aspectButtonGradient}
                >
                  <Text style={styles.aspectButtonText}>
                    {lockAspectRatio ? "Locked (1:1)" : "Free"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.cropButtons}>
                <TouchableOpacity
                  style={styles.cancelCropButton}
                  onPress={() => setCropModalVisible(false)}
                >
                  <LinearGradient colors={["#874701", "#874701"]} style={styles.cropButtonGradient}>
                    <Text style={styles.cropButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmCropButton} onPress={handleCrop}>
                  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.cropButtonGradient}>
                    <Text style={[styles.cropButtonText, { color: "#874701" }]}>Crop</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

    
        <LoadingModal />

        
        {updateProfile && (
          <View style={styles.promotionalSection}>
            <Text style={styles.promotionalTitle}>Investment Tips</Text>

            <View style={styles.promotionCard}>
              <View style={styles.promotionContent}>
                <Text style={styles.promotionText}>Start saving today for better tomorrow</Text>
                <Image
                  source={require("../../assets/images/g1.png")}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.promotionCard}>
              <View style={styles.promotionContent}>
                <Image
                  source={require("../../assets/images/g2.png")}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
                <Text style={styles.promotionText}>Daily investing by small amount and get bigger value</Text>
              </View>
            </View>

            <View style={styles.promotionCard}>
              <View style={styles.promotionContent}>
                <Text style={styles.promotionText}>Refer today for get more surprise</Text>
                <Image
                  source={require("../../assets/images/g3.png")}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flex: 1,
  },

  // Header Styles
  headerGradient: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#874701",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSpacer: {
    width: 36,
  },

  // Profile Container
  profileContainer: {
    padding: 15,
  },

  // Profile Header Card (View Mode)
  profileHeaderCard: {
  backgroundColor: "#D6DBE6",
  borderRadius: 20,
  padding: 20,
  marginBottom: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 6,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderLeftWidth: 4, // Add this
  borderLeftColor: "#005801", // Add this - green color
},
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#f3d25b",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  profileDetails: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  userIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D6DBE6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  userIdLabel: {
    fontSize: 12,
    color: "#999",
  },
  userIdText: {
    fontSize: 12,
    color: "#874701",
    fontWeight: "600",
  },
  editButton: {
    marginLeft: 10,
  },
  editButtonGradient: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Information Cards
  infoCardsContainer: {
    gap: 15,
  },
  infoCard: {
  backgroundColor: "#D6DBE6",
  borderRadius: 15,
  padding: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 4,
  borderLeftWidth: 4,
  borderLeftColor: "#005801", // Changed to green
},
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 20,
    color: "#005801",
    marginRight: 12,
  },
  cardLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 18,
    color: "#030712",
    fontWeight: "600",
    marginLeft: 32,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  // Edit Profile Header - Fixed Layout
  editProfileHeader: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editProfileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  compactProfileImageWrapper: {
    position: "relative",
  },
  compactProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f3d25b",
  },
  compactProfileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  compactNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 2,
  },
  compactPhoneText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  compactUserIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  saveButton: {
    flexShrink: 0,
  },
  saveButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#874701",
    fontSize: 14,
    fontWeight: "700",
  },

  // Edit Form Container
  editFormContainer: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#030712",
    fontWeight: "700",
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#f3d25b",
  },

  // Profile Image Section - Compact
  profileImageSection: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImageEditContainer: {
    alignItems: "center",
  },
  largeProfileImageWrapper: {
    position: "relative",
  },
  largerProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#f3d25b",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cameraButtonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Form Fields
  formFieldsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#030712",
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 5,
  },
  modernInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    fontSize: 18,
    color: "#f3d25b",
    marginRight: 12,
  },
  modernInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#030712",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 25,
    gap: 20,
  },
  modalButton: {
    flex: 1,
  },
  modalButtonGradient: {
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#874701",
  },
  closeButton: {
    width: "100%",
  },
  closeButtonGradient: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Enhanced Crop Modal Styles
  cropContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  cropImage: {
    width: width,
    height: height - 100,
  },
  cropRectangle: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#f3d25b",
    backgroundColor: "rgba(243, 210, 91, 0.2)",
  },
  gridContainer: {
    flex: 1,
    flexDirection: "column",
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
  },
  gridCell: {
    flex: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 0.5,
  },
  gridVertical: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  gridHorizontal: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  resizeHandle: {
    width: 20,
    height: 20,
    backgroundColor: "#f3d25b",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  topLeft: {
    top: -10,
    left: -10,
  },
  topRight: {
    top: -10,
    right: -10,
  },
  bottomLeft: {
    bottom: -10,
    left: -10,
  },
  bottomRight: {
    bottom: -10,
    right: -10,
  },
  cropControls: {
    position: "absolute",
    bottom: 20,
    width: width - 40,
    alignItems: "center",
  },
  aspectButton: {
    marginBottom: 10,
  },
  aspectButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  aspectButtonText: {
    color: "#874701",
    fontSize: 14,
    fontWeight: "600",
  },
  cropButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
  },
  cancelCropButton: {
    flex: 1,
  },
  confirmCropButton: {
    flex: 1,
  },
  cropButtonGradient: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cropButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Loading Modal Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  loadingContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#030712",
    textAlign: "center",
  },

  // Promotional Section
  promotionalSection: {
    padding: 15,
    paddingTop: 0,
  },
  promotionalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 20,
    textAlign: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  promotionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    overflow: "hidden",
  },
  promotionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3d25b",
  },
  promotionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#874701",
    textTransform: "uppercase",
    marginRight: 15,
  },
  promotionImage: {
    width: 60,
    height: 60,
  },
});

export default MyAccount; */



"use client"

import { useState, useCallback } from "react"
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
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import ImagePicker from "react-native-image-crop-picker"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")

const MyAccount = () => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [imageSource, setImageSource] = useState(null)
  const [user, setUser] = useState(null)
  const [updateProfile, setUpdateProfile] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [imageProcessing, setImageProcessing] = useState(false)

  // Get safe area insets for proper spacing
  const insets = useSafeAreaInsets()

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "Camera Permission",
          message: "This app needs access to camera to take profile pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        })
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  // FIXED: Perfect camera function with device-compatible settings
  const takePhotoFromCamera = async () => {
    try {
      setModalVisible(false)
      setImageProcessing(true)

      // Request permission first
      const hasPermission = await requestCameraPermission()
      if (!hasPermission) {
        Alert.alert("Permission Required", "Camera permission is required to take photos.")
        setImageProcessing(false)
        return
      }

      // FIXED: Enhanced camera settings for all devices
      const image = await ImagePicker.openCamera({
        width: 800,
        height: 800,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
        compressImageQuality: 0.95,
        mediaType: "photo",
        includeBase64: false,
        includeExif: false,

        // FIXED: Universal UI customization that works on all devices
        cropperActiveWidgetColor: "#f3d25b",
        cropperStatusBarColor: "#000000", // Black for better visibility
        cropperToolbarColor: "#f3d25b",
        cropperToolbarWidgetColor: "#874701",
        cropperTitleText: "Move and Scale Your Photo",
        cropperChooseText: "✓ Use Photo",
        cropperCancelText: "✗ Retake",

        // FIXED: Enhanced controls for better device compatibility
        enableRotationGesture: true,
        showCropGuidelines: true,
        showCropFrame: true,
        hideBottomControls: false,
        freeStyleCropEnabled: false,
        avoidEmptySpaceAroundImage: false, // FIXED: Allow space for better visibility
        cropperToolbarTitle: "Edit Your Profile Photo",
        loadingLabelText: "Processing your photo...",
        writeTempFile: true,

        // FIXED: Better visibility settings
        cropperCircleOverlayColor: "rgba(0,0,0,0.5)", // Lighter overlay
        disableCropperColorSetters: false,
        cropperRotationEnabled: true,
        cropperScaleEnabled: true,

        // FIXED: Device compatibility settings
        useFrontCamera: true,
        forceJpg: true,

        // FIXED: Additional settings for device compatibility
        cropperChooseColor: "#f3d25b",
        cropperCancelColor: "#ff4444",
        cropperRotateButtonsHidden: false,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,

        // FIXED: Safe area and status bar handling
        cropperStatusBarHidden: false, // Keep status bar visible
        cropperToolbarHidden: false, // Keep toolbar visible
      })

      if (image && image.path) {
        setImageSource(image.path)
        Alert.alert("Success! 📸", "Your profile picture has been updated successfully!", [
          { text: "Great!", style: "default" },
        ])
      }
    } catch (error) {
      console.log("Camera error:", error)
      if (error.code === "E_PICKER_CANCELLED") {
        // User cancelled - no error message needed
      } else if (error.code === "E_NO_CAMERA_PERMISSION") {
        Alert.alert("Permission Required", "Please enable camera permission in your device settings.")
      } else {
        Alert.alert("Camera Error", "Unable to take photo. Please try again.")
      }
    } finally {
      setImageProcessing(false)
    }
  }

  // FIXED: Perfect gallery function with device-compatible settings
  const selectFromGallery = async () => {
    try {
      setModalVisible(false)
      setImageProcessing(true)

      // FIXED: Enhanced gallery settings for all devices
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
        compressImageQuality: 0.95,
        mediaType: "photo",
        includeBase64: false,
        includeExif: false,

        // FIXED: Universal UI customization that works on all devices
        cropperActiveWidgetColor: "#f3d25b",
        cropperStatusBarColor: "#000000", // Black for better visibility
        cropperToolbarColor: "#f3d25b",
        cropperToolbarWidgetColor: "#874701",
        cropperTitleText: "Move and Scale Your Photo",
        cropperChooseText: "✓ Use Photo",
        cropperCancelText: "✗ Choose Different",

        // FIXED: Enhanced controls for better device compatibility
        enableRotationGesture: true,
        showCropGuidelines: true,
        showCropFrame: true,
        hideBottomControls: false,
        freeStyleCropEnabled: false,
        avoidEmptySpaceAroundImage: false, // FIXED: Allow space for better visibility
        cropperToolbarTitle: "Edit Your Profile Photo",
        loadingLabelText: "Processing your photo...",
        writeTempFile: true,

        // FIXED: Better visibility settings
        cropperCircleOverlayColor: "rgba(0,0,0,0.5)", // Lighter overlay
        disableCropperColorSetters: false,
        cropperRotationEnabled: true,
        cropperScaleEnabled: true,

        // FIXED: Gallery specific settings for device compatibility
        smartAlbums: ["UserLibrary", "PhotoStream", "Panoramas", "Videos", "Bursts"],
        multiple: false,
        forceJpg: true,
        sortOrder: "desc",

        // FIXED: Additional settings for device compatibility
        cropperChooseColor: "#f3d25b",
        cropperCancelColor: "#ff4444",
        cropperRotateButtonsHidden: false,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,

        // FIXED: Safe area and status bar handling
        cropperStatusBarHidden: false, // Keep status bar visible
        cropperToolbarHidden: false, // Keep toolbar visible
      })

      if (image && image.path) {
        setImageSource(image.path)
        Alert.alert("Success! 🖼️", "Your profile picture has been updated successfully!", [
          { text: "Awesome!", style: "default" },
        ])
      }
    } catch (error) {
      console.log("Gallery error:", error)
      if (error.code === "E_PICKER_CANCELLED") {
        // User cancelled - no error message needed
      } else {
        Alert.alert("Gallery Error", "Unable to select photo. Please try again.")
      }
    } finally {
      setImageProcessing(false)
    }
  }

  const userData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setUsername(parsedUser.name || "")
        setEmail(parsedUser.email || "")
        setPhone(parsedUser.phoneno || "")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const updateCustomer = async () => {
    try {
      if (!imageSource && !username && !email && !phone) {
        Alert.alert("No Changes", "Please make some changes before saving.")
        return
      }

      setIsLoading(true)

      const imageSourceUri = imageSource ? (Platform.OS === "android" ? `file://${imageSource}` : imageSource) : null

      const formData = new FormData()
      formData.append("userId", user?._id)
      formData.append("name", username || user?.name)
      formData.append("email", email || user?.email)
      formData.append("phoneno", phone || user?.phoneno)

      if (imageSourceUri) {
        formData.append("profileimage", {
          uri: imageSourceUri,
          name: "profile.jpg",
          type: "image/jpeg",
        })
      }

      const response = await fetch("https://justbuynewbackend.onrender.com/api/v1/user/auth/updateuser", {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(result.success))
        userData()
        setImageSource(null)
        setUpdateProfile(true)
        Alert.alert("Profile Updated! ✅", "Your profile has been successfully updated.", [
          { text: "Perfect!", style: "default" },
        ])
      } else {
        Alert.alert("Update Failed", result?.message || "Server error occurred. Please try again.")
      }
    } catch (error) {
      Alert.alert("Network Error", "Please check your internet connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      userData()
    }, []),
  )

  // Get profile image URL with cache busting
  const getProfileImageUrl = () => {
    if (imageSource) {
      return `${imageSource}?${new Date().getTime()}`
    }
    if (user?.profileimage) {
      return `https://justbuynewbackend.onrender.com/User/${user.profileimage}?${new Date().getTime()}`
    }
    return null
  }

  // Enhanced Loading Modal
  const LoadingModal = () => (
    <Modal animationType="fade" transparent={true} visible={isLoading} onRequestClose={() => {}}>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#f3d25b" />
          <Text style={styles.loadingText}>Updating Your Profile...</Text>
          <Text style={styles.loadingSubtext}>Please wait a moment</Text>
        </View>
      </View>
    </Modal>
  )

  // FIXED: Enhanced Image Processing Modal with better messaging
  const ImageProcessingModal = () => (
    <Modal animationType="fade" transparent={true} visible={imageProcessing} onRequestClose={() => {}}>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#f3d25b" />
          <Text style={styles.loadingText}>Opening Photo Editor...</Text>
          <Text style={styles.loadingSubtext}>Preparing your perfect shot! 📸</Text>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor="#f3d25b" barStyle="dark-content" />

      {/* Header Section */}
      <LinearGradient
        colors={["#f3d25b", "#f3d25b"]}
        style={[styles.headerGradient, { paddingTop: Math.max(insets.top + 10, 40) }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#874701" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContentContainer,
          { paddingBottom: Math.max(insets.bottom, 15) + 35 }, // Extra space for tab bar
        ]}
      >
        {updateProfile ? (
          <View style={styles.profileContainer}>
            {/* Profile Header Card */}
            <View style={styles.profileHeaderCard}>
              <View style={styles.profileInfo}>
                <TouchableOpacity onPress={() => navigation.navigate("ImageZoom", { user })}>
                  <View style={styles.profileImageWrapper}>
                    {getProfileImageUrl() ? (
                      <Image source={{ uri: getProfileImageUrl() }} style={styles.profileImage} />
                    ) : (
                      <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</Text>
                      </View>
                    )}
                    <View style={styles.onlineIndicator} />
                  </View>
                </TouchableOpacity>
                <View style={styles.profileDetails}>
                  <Text style={styles.nameText}>{user?.name || "Loading..."}</Text>
                  <Text style={styles.phoneText}>+91 {user?.phoneno}</Text>
                  <View style={styles.userIdContainer}>
                    <Text style={styles.userIdLabel}>ID: </Text>
                    <Text style={styles.userIdText}>{user?.userId}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => setUpdateProfile(false)}>
                <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.editButtonGradient}>
                  <FontAwesome5 name="edit" size={18} color="#874701" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Information Cards */}
            <View style={styles.infoCardsContainer}>
              <View style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Icon name="user" style={styles.cardIcon} />
                  <Text style={styles.cardLabel}>User Name</Text>
                </View>
                <Text style={styles.cardValue}>{user?.name}</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Ionicons name="mail" style={styles.cardIcon} />
                  <Text style={styles.cardLabel}>Email Address</Text>
                </View>
                <Text style={styles.cardValue}>{user?.email}</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <FontAwesome6 name="phone" style={styles.cardIcon} />
                  <Text style={styles.cardLabel}>Phone Number</Text>
                </View>
                <Text style={styles.cardValue}>+91-{user?.phoneno}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.profileContainer}>
            {/* Edit Profile Header */}
            <View style={styles.editProfileHeader}>
              <View style={styles.editProfileInfo}>
                <View style={styles.compactProfileImageWrapper}>
                  {getProfileImageUrl() ? (
                    <Image source={{ uri: getProfileImageUrl() }} style={styles.compactProfileImage} />
                  ) : (
                    <View style={styles.compactAvatarPlaceholder}>
                      <Text style={styles.compactAvatarText}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </Text>
                    </View>
                  )}
                  <View style={styles.onlineIndicator} />
                </View>
                <View style={styles.compactProfileDetails}>
                  <Text style={styles.compactNameText} numberOfLines={1}>
                    {user?.name || "Loading..."}
                  </Text>
                  <Text style={styles.compactPhoneText} numberOfLines={1}>
                    +91 {user?.phoneno}
                  </Text>
                  <View style={styles.compactUserIdContainer}>
                    <Text style={styles.userIdLabel}>ID: </Text>
                    <Text style={styles.userIdText}>{user?.userId}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.saveButton, isLoading && styles.disabledButton]}
                onPress={() => {
                  if (!isLoading) {
                    updateCustomer()
                  }
                }}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? ["#ccc", "#ccc"] : ["#f3d25b", "#f3d25b"]}
                  style={styles.saveButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#874701" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Edit Form */}
            <View style={styles.editFormContainer}>
              {/* Profile Image Section */}
              <View style={styles.profileImageSection}>
                <Text style={styles.sectionTitle}>Profile Picture</Text>
                <View style={styles.profileImageEditContainer}>
                  <View style={styles.largeProfileImageWrapper}>
                    {getProfileImageUrl() ? (
                      <Image source={{ uri: getProfileImageUrl() }} style={styles.largerProfileImage} />
                    ) : (
                      <View style={styles.largeAvatarPlaceholder}>
                        <Text style={styles.largeAvatarText}>
                          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.cameraButton}
                      onPress={() => setModalVisible(true)}
                      disabled={isLoading || imageProcessing}
                    >
                      <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.cameraButtonGradient}>
                        <FontAwesome6 name="camera" size={16} color="#874701" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.imageHint}>Tap the camera icon to update your photo</Text>
                </View>
              </View>

              {/* Form Fields */}
              <View style={styles.formFieldsContainer}>
                <Text style={styles.sectionTitle}>Personal Information</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>User Name</Text>
                  <View style={styles.modernInputContainer}>
                    <Icon name="user" style={styles.inputIcon} />
                    <TextInput
                      style={styles.modernInput}
                      value={username}
                      onChangeText={setUsername}
                      placeholder={user?.name}
                      placeholderTextColor="#999"
                      editable={!isLoading}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.modernInputContainer}>
                    <Ionicons name="mail" style={styles.inputIcon} />
                    <TextInput
                      style={styles.modernInput}
                      value={email}
                      onChangeText={setEmail}
                      placeholder={user?.email}
                      keyboardType="email-address"
                      placeholderTextColor="#999"
                      editable={!isLoading}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.modernInputContainer}>
                    <FontAwesome6 name="phone" style={styles.inputIcon} />
                    <TextInput
                      style={styles.modernInput}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder={user?.phoneno}
                      keyboardType="phone-pad"
                      placeholderTextColor="#999"
                      editable={!isLoading}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* FIXED: Enhanced Photo Selection Modal with better instructions */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Update Profile Picture</Text>
                <Text style={styles.modalSubtitle}>Choose how you'd like to add your photo</Text>
              </View>

              {/* FIXED: Added helpful hint for cropping */}
              <View style={styles.modalHintContainer}>
                <Text style={styles.modalHint}>
                  📸 After selecting, you'll be able to crop and adjust your photo perfectly!
                </Text>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera} disabled={imageProcessing}>
                  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.modalButtonGradient}>
                    <View style={styles.modalButtonIcon}>
                      <Icon name="camera" size={32} color="#874701" />
                    </View>
                    <Text style={styles.modalButtonText}>Take Photo</Text>
                    <Text style={styles.modalButtonSubtext}>Use your camera</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={selectFromGallery} disabled={imageProcessing}>
                  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.modalButtonGradient}>
                    <View style={styles.modalButtonIcon}>
                      <Icon name="image" size={32} color="#874701" />
                    </View>
                    <Text style={styles.modalButtonText}>Choose Photo</Text>
                    <Text style={styles.modalButtonSubtext}>From your gallery</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <LinearGradient colors={["#874701", "#874701"]} style={styles.closeButtonGradient}>
                    <Text style={styles.closeButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Loading Modals */}
        <LoadingModal />
        <ImageProcessingModal />

        {/* Promotional Cards - Only show in view mode */}
        {updateProfile && (
          <View style={styles.promotionalSection}>
            <Text style={styles.promotionalTitle}>Investment Tips</Text>

            <View style={styles.promotionCard}>
              <View style={styles.promotionContent}>
                <Text style={styles.promotionText}>Start saving today for better tomorrow</Text>
                <Image
                  source={require("../../assets/images/g1.png")}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.promotionCard}>
              <View style={styles.promotionContent}>
                <Image
                  source={require("../../assets/images/g2.png")}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
                <Text style={styles.promotionText}>Daily investing by small amount and get bigger value</Text>
              </View>
            </View>

            <View style={styles.promotionCard}>
              <View style={styles.promotionContent}>
                <Text style={styles.promotionText}>Refer today for get more surprise</Text>
                <Image
                  source={require("../../assets/images/g3.png")}
                  style={styles.promotionImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // SafeAreaView container - CRITICAL for proper display (Same as Home)
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#ffffff", // Match the header color
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  // NEW: Content container for proper spacing (Same as Home)
  scrollContentContainer: {
    flexGrow: 1,
  },

  // Header Styles - Updated for SafeAreaView
  headerGradient: {
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#874701",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSpacer: {
    width: 36,
  },

  // Profile Container
  profileContainer: {
    padding: 15,
  },

  // Profile Header Card (View Mode)
  profileHeaderCard: {
    backgroundColor: "#D6DBE6",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#005801",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#f3d25b",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f3d25b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#874701",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#874701",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  profileDetails: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  userIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D6DBE6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  userIdLabel: {
    fontSize: 12,
    color: "#999",
  },
  userIdText: {
    fontSize: 12,
    color: "#874701",
    fontWeight: "600",
  },
  editButton: {
    marginLeft: 10,
  },
  editButtonGradient: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Information Cards
  infoCardsContainer: {
    gap: 15,
  },
  infoCard: {
    backgroundColor: "#D6DBE6",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#005801",
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 20,
    color: "#005801",
    marginRight: 12,
  },
  cardLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 18,
    color: "#030712",
    fontWeight: "600",
    marginLeft: 32,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  // Edit Profile Header
  editProfileHeader: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editProfileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  compactProfileImageWrapper: {
    position: "relative",
  },
  compactProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f3d25b",
  },
  compactAvatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f3d25b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#874701",
  },
  compactAvatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#874701",
  },
  compactProfileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  compactNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 2,
  },
  compactPhoneText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  compactUserIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  saveButton: {
    flexShrink: 0,
  },
  saveButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#874701",
    fontSize: 14,
    fontWeight: "700",
  },

  // Edit Form Container
  editFormContainer: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#030712",
    fontWeight: "700",
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#f3d25b",
  },

  // Profile Image Section
  profileImageSection: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImageEditContainer: {
    alignItems: "center",
  },
  largeProfileImageWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  largerProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#f3d25b",
  },
  largeAvatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f3d25b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#874701",
  },
  largeAvatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#874701",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cameraButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  imageHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },

  // Form Fields
  formFieldsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#030712",
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 5,
  },
  modernInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    fontSize: 18,
    color: "#f3d25b",
    marginRight: 12,
  },
  modernInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#030712",
  },

  // Enhanced Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 0,
    width: width - 30,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "#f3d25b",
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#874701",
    marginBottom: 5,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#874701",
    textAlign: "center",
    opacity: 0.8,
  },
  // FIXED: Added hint container for better user guidance
  modalHintContainer: {
    padding: 15,
    backgroundColor: "#f8f9fa",
  },
  modalHint: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  modalButtons: {
    flexDirection: "row",
    padding: 20,
    gap: 15,
  },
  modalButton: {
    flex: 1,
  },
  modalButtonGradient: {
    alignItems: "center",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  modalButtonIcon: {
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#874701",
    marginBottom: 4,
    textAlign: "center",
  },
  modalButtonSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  modalFooter: {
    padding: 20,
    paddingTop: 0,
  },
  closeButton: {
    width: "100%",
  },
  closeButtonGradient: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Enhanced Loading Modal Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  loadingContent: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 35,
    alignItems: "center",
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#030712",
    textAlign: "center",
    fontWeight: "600",
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },

  // Promotional Section
  promotionalSection: {
    padding: 15,
    paddingTop: 0,
  },
  promotionalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#030712",
    marginBottom: 20,
    textAlign: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  promotionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    overflow: "hidden",
  },
  promotionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3d25b",
  },
  promotionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#874701",
    textTransform: "uppercase",
    marginRight: 15,
  },
  promotionImage: {
    width: 60,
    height: 60,
  },
})

export default MyAccount
