// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   ImageBackground,
//   fontFamily,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Video from 'react-native-video';
// // import video from '../../assets/images/video.mp4';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RazorpayCheckout from 'react-native-razorpay';
// import {useNavigation} from '@react-navigation/native';
// import {Image} from 'react-native-animatable';
// import {WebView} from 'react-native-webview';
// import Modal from 'react-native-modal';
// import Swiper from 'react-native-swiper';

// function Home() {
//   const navigation = useNavigation('');
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const carouselImages = [
//     require('../../assets/images/g9.png'),
//     require('../../assets/images/g10.png'),
//   ];

//   // Get Gst+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [data, setData] = useState({});
//   const getGst = async () => {
//     const config = {
//       url: '/getGst',
//       method: 'get',
//       baseURL: 'https://justbuynewbackend.onrender.com/api/v1/gst',
//       headers: {'conttent-type': 'application/json'},
//     };
//     try {
//       const result = await axios(config);
//       if (result.status === 200) {
//         setData(result.data.success);
//         setLoading(true);
//       } else {
//         Alert.alert('Something went wrong');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get all transiction---
//   const [alltransiction, setAlltransiction] = useState([]);
//   // console.log('History', alltransiction);
//   const userTransaction = async _id => {
//     let user = await AsyncStorage.getItem('user');
//     user = JSON.parse(user);
//     try {
//       await axios
//         .get(
//           'https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/' +
//             user?._id,
//         )
//         .then(res => {
//           if (res.status == 200) {
//             console.log(
//               'idddddddddddddddddddddddddddddddddddddddddd',
//               user?._id,
//             );
//             setAlltransiction(res.data.success);
//             // console.log(res.data.success);
//             setLoading(true);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //

//   const [allcoin, setallcoin] = useState([]);
//   const getCoins = async () => {
//     try {
//       const storedUser = await AsyncStorage.getItem('user');
//       const parsedUser = JSON.parse(storedUser);

//       setLoading(false); // Start loading before fetching
//       const res = await axios.get(
//         `https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/${parsedUser?._id}`,
//       );

//       if (res.status === 200) {
//         setallcoin(res.data.success);
//         // console.log(res.data.success);
//       } else {
//         console.log(res.error);
//         // Alert.alert('Error', 'Failed to fetch coins data.');
//       }
//     } catch (error) {
//       console.log(error);
//       // Alert.alert('Error', 'An error occurred while fetching coins data.');
//     } finally {
//       setLoading(true); // Stop loading after fetching
//     }
//   };

//   // Get Gold Rate+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [gold, setgold] = useState();
//   const [Amount, setamount] = useState();
//   // console.log(Amount, '₹');
//   const [rate, setRate] = useState([]);
//   const [objRate, setObjRate] = useState({});
//   const [goldRate, setGoldRate] = useState(0);
//   // console.log(objRate, 'objRate>>>>>>>>>>>>>>>>...');
//   const getRate = async () => {
//     try {
//       await axios
//         .get('https://justbuynewbackend.onrender.com/api/v1/rate/allrate')
//         .then(res => {
//           if (res.status === 200) {
//             setRate(res.data.success);
//             setObjRate(res.data?.success[0]);
//             setGoldRate(res.data?.success[0]?.rate);
//             setLoading(true);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // console.log('rate:', rate, 'objrate:', objRate);
//   // Total Gst++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   let NewGst = data?.Sgst + data?.Cgst;

//   // Get Video++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [video, setvideo] = useState([]);
//   const getVideo = async () => {
//     try {
//       await axios
//         .get('https://justbuynewbackend.onrender.com/api/v1/video/allvideo')
//         .then(res => {
//           if (res.status === 200) {
//             setvideo(res.data.success);
//             setLoading(true);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error.success);
//     }
//   };

//   // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [user, setUser] = useState('');
//   const userData = async () => {
//     let user = await AsyncStorage.getItem('user');
//     setUser(JSON.parse(user));
//   };

//   useEffect(() => {
//     getRate();
//     getGst();
//     getVideo();
//     userData();
//     getCoins();
//     userTransaction();
//   }, []);

//   // All transicition
//   const transicitionData = alltransiction?.reduce(
//     (a, i) => a + Number(i?.gold),
//     0,
//   );
//   // console.log('transicitionData', transicitionData);

//   // All gold Store
//   // const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

//   const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

//   console.log('coinsdata.................................', coinsData);
//   console.log(
//     'transicitionData.................................',
//     transicitionData,
//   );

//   // console.log(allcoin, 'coinsData');
//   // Total Store gold
//   const totalgoldStore = transicitionData - coinsData;
//   // console.log('Total gold Store', totalgoldStore);

//   // AddCoinsRequest+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [mobile, setMobile] = useState('');

//   const handleChange = mobile => {
//     const formattedMobile = mobile.replace(/[^0-9]/g, '');
//     if (formattedMobile !== mobile) {
//       Alert.alert('Only numbers are allowed');
//     }
//     setMobile(formattedMobile);
//   };

//   const addRequest = async () => {
//     if (!mobile) return Alert.alert('Enter required gold coins');
//     if (mobile < 1) return Alert.alert('Please enter more than 1 gram');
//     if (mobile > totalgoldStore)
//       return Alert.alert("Don't have sufficent gold in your Savings");
//     try {
//       const config = {
//         url: '/addCoins',
//         method: 'post',
//         baseURL: 'https://justbuynewbackend.onrender.com/api/v1/coins',
//         headers: {'content-type': 'application/json'},
//         data: {
//           UserId: user?._id,
//           username: user?.name,
//           email: user?.email,
//           usphone: user?.phoneno,
//           phone: user?.phoneno,
//           coins: Number(mobile), // This sends the required amount
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         // console.log(res.data.success);
//         toggleModal();
//         Alert.alert('Request Sent');
//         setamount('');
//         setgold('');
//         setMobile('');
//         getCoins();
//       } else {
//         Alert.alert('Something Wrong ');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Total calculation++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   const [gramCompleted, setGramCompleted] = useState(false);
//   const calculate = (price, Amount) => {
//     let ab = Number(Amount) / Number(price);
//     let gst = 100 / (100 + NewGst);
//     amt = ab * gst;
//     // console.log('rvejvf', Number(ab), Amount);
//     setgold(amt?.toFixed(4));
//     // setgold(Number(ab));
//     setGramCompleted(Number.isInteger(ab));

//     setamount(Amount);
//   };
//   // console.log('Amount', Number(Amount));

//   const calculate2 = (price, gold) => {
//     // console.log('price:', price, 'gold:', gold);
//     setgold(gold);
//     let ab = Number(gold) * Number(price);
//     setamount(ab?.toFixed(2));
//     setGramCompleted(Number.isInteger(gold));
//     // console.log('price:', price, 'gold:', gold, 'Amount:', Amount);
//   };

//   useEffect(() => {
//     if (Object.keys(data).length != 0 && Object.keys(objRate).length != 0) {
//       let NewGst1 = data?.Sgst + data?.Cgst;
//       // setamount(
//       //   (
//       //     Number(objRate.rate) +
//       //     (objRate.rate * (NewGst1 + objRate?.percentage)) / 100
//       //   )?.toFixed(3),
//       // );
//     }
//   }, [objRate]);

//   // useEffect(() => {
//   //   if (gold >= 1 && totalgoldStore) {
//   //     setGramCompleted(true);
//   //   } else {
//   //     setGramCompleted(false);
//   //   }
//   // }, [gold]);

//   // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   const [paymentid, setpaymentId] = useState('');
//   const placeorder = async paymentid => {
//     try {
//       const config = {
//         url: '/transaction',
//         method: 'post',
//         baseURL: 'https://justbuynewbackend.onrender.com/api/v1/transactions',
//         headers: {'content-type': 'application/json'},
//         data: {
//           UserId: user?._id,
//           amount: Amount,
//           gold: gold,
//           PaymentId: paymentid,
//           totalCoin: totalgoldStore - Number(gold), // Corrected calculation
//         },
//       };
//       // console.log('user', user._id, Amount, gold);
//       await axios(config).then(async function (res) {
//         if (res.status === 200) {
//           // console.log('success');
//           Alert.alert('Successfully');
//           await userTransaction(); // Ensure transactions are refreshed
//           await getCoins(); // Refresh coins data
//           navigation.navigate('Home1');
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isDisabled = !Amount || !gold;
//   // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ phonepay
//   // const generateUniqueTransactionId = () => {
//   //   const timestamp = Date.now().toString();
//   //   const randomComponent = Math.floor(Math.random() * 1000000).toString();
//   //   // console.log('timestamp', timestamp - randomComponent);
//   //   return `${timestamp}-${randomComponent}`;
//   // };

//   // const [paymentUrl, setPaymentUrl] = useState();
//   // const postTransaction = async data => {
//   //   try {
//   //     const newMerchantTransactionId = generateUniqueTransactionId();
//   //     const config = {
//   //       url: '/makepayment',
//   //       method: 'post',
//   //       baseURL: 'https://justbuynewbackend.onrender.com/api/v1/transactions',
//   //       data: {
//   //         merchantTransactionId: newMerchantTransactionId,
//   //         merchantUserId: '2342343',
//   //         amount: Math.round(Amount * 100),
//   //         redirectUrl: 'com.justbuygold://payment-success',
//   //         callbackUrl: 'com.justbuygold://payment-success',
//   //         mobileNumber: user?.phoneno,
//   //       },
//   //     };

//   //     const res = await axios(config);

//   //     if (res.status === 200) {
//   //       // console.log('ghat', res.data.url.url);
//   //       setPaymentUrl(res.data.url.url);
//   //       navigation.navigate('Paymentpage', {
//   //         paymentUrl: res.data.url.url,
//   //         user: user,
//   //         gold: gold,
//   //         amount: Amount,
//   //         newMerchantTransactionId: newMerchantTransactionId,
//   //         status: 'Paid',
//   //       });
//   //       setgold('');
//   //       setamount('');
//   //     }
//   //   } catch (error) {
//   //     console.log('Error while fetching payment URL:', error);
//   //   }
//   // };

//   // react-native-razorpay+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   const posttransaction = async () => {
//     try {
//       var options = {
//         key: 'rzp_test_FAe0X6xLYXaXHe',
//         amount: Amount * 100,
//         // amount: '500',
//         currency: 'INR',
//         name: 'JustBuyGold',
//         description: 'Order Amount',
//         image: './assets/images/newlogo.png',
//         customerId: user?._id,
//         handler: function (response) {
//           // Alert.alert(response.razorpay_payment_id);
//           setpaymentId(response.razorpay_payment_id);
//         },

//         prefill: {
//           name: user?.name,
//           email: user?.email,
//           contact: user?.phoneno,
//         },
//         theme: {color: '#F37254'},
//       };
//       RazorpayCheckout.open(options)
//         .then(data => {
//           // handle success
//           Alert.alert(`Success: ${data.razorpay_payment_id}`);
//           placeorder(data.razorpay_payment_id);
//           setamount('');
//           setgold('');
//         })
//         .catch(error => {
//           // handle failure
//           Alert.alert(`Error: ${error.code} | ${error.description}`);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <>
//           <ImageBackground
//             source={require('../../assets/images/app-bg.jpg')}
//             style={{flex: 1}}
//             resizeMode="cover">
//             <View style={styles.container}>
//               <StatusBar
//                 backgroundColor="transparent"
//                 barStyle="light-content"
//               />

//               <ScrollView
//                 style={{
//                   backgroundColor: '#transparent',
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     alignContent: 'center',
//                     paddingTop: 10,
//                     paddingLeft: 15,
//                     paddingRight: 15,
//                     backgroundColor: '#transparent',
//                   }}>
//                   <Image
//                     source={require('../../assets/images/jbg.png')}
//                     style={{height: 80, width: 80}}
//                   />
//                   <Image
//                     source={require('../../assets/images/g5.png')}
//                     style={{height: 35, width: 250, objectFit: 'contain'}}
//                   />
//                   {/* <Text
//                 style={{
//                   color: '#FFD700',
//                   fontSize: 25,
//                   fontWeight: '600',
//                 }}>
//                 Just Buy Gold
//               </Text> */}
//                 </View>
//                 {rate?.slice(0, 1)?.map((ele, index) => {
//                   // console.log('rate', ele.rate);
//                   return (
//                     <View style={styles.loan}>
//                       {/* with gst {NewGst} % */}
//                       {/* G = (15/100) * 115 = $17.25 */}

//                       <View style={styles.content} key={ele?._id}>
//                         <Text style={[styles.passage, {fontSize: 20}]}>
//                           Gold Rate
//                         </Text>
//                         <Text style={styles.passage}>
//                           ₹{Number(ele.rate)?.toFixed(3)} / gm
//                         </Text>
//                       </View>

//                       <View style={styles.items}>
//                         <View
//                           style={{
//                             marginHorizontal: 30,
//                             marginVertical: 20,
//                             flexDirection: 'row',
//                             justifyContent: 'center',
//                             gap: 10,
//                             padding: 4,
//                             borderWidth: 2,
//                             height: 95,
//                             borderColor: 'transparent',
//                             borderRadius: 23,
//                             paddingHorizontal: 30,
//                           }}>
//                           <View
//                             style={{
//                               marginHorizontal: 30,
//                               // marginVertical: 20,
//                               flexDirection: 'row',
//                               justifyContent: 'center',
//                               gap: 20,
//                               padding: 4,
//                               borderWidth: 2,
//                               height: 75,
//                               borderColor: 'transparent',
//                               borderRadius: 13,
//                             }}>
//                             <View style={styles.chipContainer}>
//                               <Text style={styles.chip}>Gold</Text>
//                               <Text style={styles.chip}>{ele?.name}k</Text>
//                               <Text style={styles.chip}>999</Text>
//                             </View>
//                           </View>
//                           {/* <Text style={styles.chip}>999</Text> */}
//                         </View>
//                         <View style={styles.itemicon}>
//                           <TextInput
//                             style={styles.input}
//                             placeholder={gold ? `${gold} Grams` : 'Grams'}
//                             placeholderTextColor="#000"
//                             keyboardType="number-pad"
//                             value={gold}
//                             onChangeText={gold =>
//                               calculate2(
//                                 // ele.rate*gold + NewGst*ele.rate*gold/100,
//                                 (ele.rate * (100 + NewGst)) / 100,
//                                 gold,
//                               )
//                             }
//                           />
//                           {/* (Number(ele.rate) +(ele.rate * (NewGst + ele?.percentage)) / 100) */}
//                           {/* <TextInput
//                             style={styles.input}
//                             placeholder={gold ? `${gold} Grams` : 'Grams'}
//                             placeholderTextColor="#f3d25b"
//                             keyboardType="number-pad"
//                             value={gold}
//                             onChangeText={newGold => {
//                               setgold(newGold); // Assuming you use useState or a similar hook
//                               if (!newGold) {
//                                 setamount(''); // Reset Amount when gold is emptied
//                               } else {
//                                 calculate2(
//                                   Number(ele.rate) +
//                                     (ele.rate * (NewGst + ele?.percentage)) /
//                                       100,
//                                   newGold,
//                                 );
//                               }
//                             }}
//                           /> */}
//                           <Text>
//                             <FontAwesome name="exchange" style={styles.icons} />
//                           </Text>
//                           {/* <TextInput
//                         style={styles.input}
//                         placeholder={Amount ? `${Amount} Amount` : 'Amount'}
//                         placeholderTextColor="#f3d25b"
//                         keyboardType="number-pad"
//                         value={Amount}
//                         onChangeText={Amount =>
//                           calculate(
//                             Number(ele.rate) +
//                               (ele.rate * (NewGst + ele?.percentage)) / 100,
//                             Amount,
//                           )
//                         }
//                       /> */}
//                           <TextInput
//                             style={styles.input}
//                             placeholder={Amount ? `${Amount} ` : 'Amount'}
//                             placeholderTextColor="#000"
//                             keyboardType="number-pad"
//                             value={Amount}
//                             onChangeText={newAmount => {
//                               setamount(newAmount); // Update the Amount state
//                               if (!newAmount) {
//                                 setgold(''); // Optionally reset gold when Amount is cleared
//                               } else {
//                                 calculate(ele.rate, newAmount);
//                               }
//                             }}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                   );
//                 })}
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -35,
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       if (!isDisabled) {
//                         navigation.navigate('Pay', {
//                           Amount,
//                           gold,
//                           goldRate,
//                         });
//                       }
//                     }}
//                     disabled={isDisabled}
//                     style={{opacity: isDisabled ? 0.5 : 1}}
//                     // onPress={posttransaction}
//                     //  onPress={postTransaction}
//                   >
//                     <ImageBackground
//                       source={require('../../assets/images/buybg.png')}
//                       style={{height: 50, width: 300, zIndex: 9999}}>
//                       <Text
//                         style={{
//                           color: 'black',
//                           fontSize: 25,
//                           fontFamily: 'Poppins-SemiBoldItalic',
//                           alignSelf: 'center',
//                           zIndex: 9999,
//                           fontWeight: '20',
//                         }}>
//                         Buy
//                       </Text>
//                     </ImageBackground>

//                     {/* <LinearGradient
//                   start={{x: 0.0, y: 1.25}}
//                   end={{x: 1.5, y: 1.25}}
//                   // locations={[0, 0.5, 0.6]}
//                   colors={['#FFD700', '#FFD700', '#FFD700',]}
//                   style={styles.linearGradient}> */}
//                     {/* <View style={styles.linearGradient}>
//                   <Text style={styles.btn}>Buy</Text>
//                 </View> */}
//                     {/* </LinearGradient> */}
//                   </TouchableOpacity>
//                 </View>

//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     backgroundColor: 'transparent',
//                   }}>
//                   <ImageBackground
//                     source={require('../../assets/images/gold-coins.png')}
//                     // resizeMode="stretch"
//                     style={styles.images1}>
//                     <Text
//                       style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
//                       {(transicitionData - coinsData).toFixed(4)}
//                     </Text>
//                     <Text
//                       style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
//                       Grams
//                     </Text>
//                   </ImageBackground>

//                   {totalgoldStore >= 1 && (
//                     <TouchableOpacity
//                       onPress={() => {
//                         toggleModal();
//                       }}>
//                       <View
//                         style={[
//                           styles.regback1,
//                           {flexDirection: 'row', justifyContent: 'center'},
//                         ]}>
//                         <Text style={styles.btn2}> Request For The Coins</Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}

//                   {gramCompleted && (
//                     <TouchableOpacity
//                       onPress={() => {
//                         toggleModal();
//                         setGramCompleted(!gramCompleted);
//                       }}>
//                       <View
//                         style={[
//                           styles.regback1,
//                           {flexDirection: 'row', justifyContent: 'center'},
//                         ]}>
//                         <Text style={styles.btn2}> Request For The Coins</Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                 </View>

//                 <View style={styles.swiperContainer}>
//                   <Swiper
//                     style={styles.wrapper}
//                     showsButtons={false}
//                     autoplay
//                     autoplayTimeout={3}
//                     dotStyle={styles.dot}
//                     activeDotStyle={styles.activeDot}>
//                     {carouselImages.map((image, index) => (
//                       <View key={index} style={styles.slide}>
//                         <Image
//                           source={image}
//                           resizeMode="contain"
//                           style={styles.swiperImage}
//                         />
//                       </View>
//                     ))}
//                   </Swiper>
//                 </View>
//               </ScrollView>

//               <View style={{flex: 1}}>
//                 {/* <Button title="Show modal" onPress={toggleModal} /> */}

//                 <Modal isVisible={isModalVisible}>
//                   <View
//                     style={{
//                       backgroundColor: 'white',
//                       height: 320,
//                       borderRadius: 5,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           paddingTop: 20,
//                           paddingBottom: 10,
//                           alignItems: 'center',
//                           fontSize: 20,
//                           fontWeight: '700',
//                           color: 'black',
//                         }}>
//                         Gold in your pocket
//                       </Text>
//                     </View>
//                     <View style={styles.request}>
//                       <View style={styles.request}>
//                         <Text
//                           style={[
//                             styles.input1,
//                             {
//                               fontSize: 20,
//                               height: 47,
//                               width: '50%',
//                               alignSelf: 'center',
//                               textAlign: 'center',
//                               fontWeight: '600',
//                               backgroundColor: '#f3d25b',
//                               borderColor: '#f3d25b',
//                             },
//                           ]}>
//                           {(transicitionData - coinsData).toFixed(4)} Grams
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           paddingTop: 20,
//                           paddingBottom: 10,
//                           alignItems: 'center',
//                           fontSize: 20,
//                           fontWeight: '700',
//                           color: 'black',
//                           alignSelf: 'center',
//                         }}>
//                         Required Gold Coin
//                       </Text>
//                       <View style={styles.request}>
//                         <TextInput
//                           style={[
//                             styles.input1,
//                             {
//                               fontSize: 17,
//                               width: '50%',
//                               alignSelf: 'center',
//                               textAlign: 'center',
//                               color: 'black',
//                             },
//                           ]}
//                           placeholderTextColor={'black'}
//                           placeholder="Grams"
//                           value={mobile}
//                           keyboardType="number-pad"
//                           onChangeText={handleChange}
//                         />
//                       </View>
//                       {/* <View style={styles.request}>
//                     <TextInput
//                       style={[styles.input1, {fontSize: 16}]}
//                       placeholder={user?.name}
//                       value={name}
//                       keyboardType="default"
//                       onChangeText={name => setName(name)}
//                     />
//                   </View> */}
//                       {/* <View style={styles.request}>
//                     <TextInput
//                       style={[styles.input1, {fontSize: 16}]}
//                       placeholder={user?.email}
//                       value={email}
//                       keyboardType="email-address"
//                       onChangeText={email => setEmail(email)}
//                     />
//                   </View> */}
//                       {/* <View style={styles.request}>
//                     <TextInput
//                       style={[styles.input1, {fontSize: 16}]}
//                       value={mobile}
//                       placeholder={user?.phoneno}
//                       keyboardType="number-pad"
//                       onChangeText={mobile => setMobile(mobile)}
//                     />
//                   </View> */}
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         padding: 20,
//                       }}>
//                       <LinearGradient
//                         start={{x: 1, y: 0}}
//                         end={{x: 0, y: 0}}
//                         colors={['#874701', '#874701', '#874701']}
//                         style={styles.linearGradientmodel}>
//                         <TouchableOpacity onPress={toggleModal}>
//                           <Text
//                             style={{color: 'white', fontSize: 15, width: 50}}>
//                             Cancel
//                           </Text>
//                         </TouchableOpacity>
//                       </LinearGradient>
//                       <LinearGradient
//                         start={{x: 1, y: 0}}
//                         end={{x: 0, y: 0}}
//                         colors={['#874701', '#874701', '#874701']}
//                         style={styles.linearGradientmodel}>
//                         <TouchableOpacity
//                           onPress={() => {
//                             addRequest();
//                           }}>
//                           <Text
//                             style={{
//                               display: 'flex',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               textAlign: 'center',
//                               color: 'white',
//                               fontSize: 15,
//                               width: 80,
//                             }}>
//                             Send request
//                           </Text>
//                         </TouchableOpacity>
//                       </LinearGradient>
//                     </View>
//                   </View>
//                 </Modal>
//               </View>
//               {/* Modal */}
//             </View>
//           </ImageBackground>
//         </>
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           {/* <Text>
//             <ActivityIndicator size="big" color="#874701" />
//           </Text> */}
//         </View>
//       )}
//     </>
//   );
// }

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     fontFamily: 'Poppins-SemiBoldItalic',
//     // backgroundColor: '#2b2cd6',
//   },
//   image: {
//     flex: 1,
//   },
//   loan: {
//     width: '100%',
//     padding: 10,
//     // backgroundColor: '#2b2cd6',
//   },
//   content: {
//     paddingTop: 4,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 8,
//   },
//   passage: {
//     color: '#f3d25b',
//     fontSize: 22,
//     // fontWeight: '500',
//     fontFamily: 'Poppins-SemiBoldItalic',
//   },
//   xyz: {
//     paddingHorizontal: 14,
//   },
//   items: {
//     borderWidth: 4,
//     borderColor: '#feac03',
//     borderRadius: 10,
//     width: '100%',
//     paddingBottom: 16,
//     // backgroundColor: '#2b2cd6',
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     borderColor: '#f7c94f',
//     // borderWidth: 5,
//     borderRadius: 50,
//     paddingVertical: 1,
//     paddingHorizontal: 30,
//     backgroundColor: 'white',
//     height: 45,
//     marginVertical: 10,
//     borderWidth: 4,
//     fontSize: 2,
//     borderRadius: 13,
//     width: '140%',

//     padding: 30,
//     gap: 25,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontFamily: 'popins-semiBoldItalic',
//   },
//   chip: {
//     color: '#000',
//     textAlign: 'center',
//     fontSize: 22,
//     fontFamily: 'Poppins-SemiBoldItalic',
//   },
//   swiperContainer: {
//     height: 200,
//     marginTop: 20,
//   },
//   swiperImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   input: {
//     height: 45,
//     marginVertical: 10,
//     borderWidth: 4,
//     fontSize: 16,
//     borderRadius: 13,
//     color: 'black',

//     placeholderTextColor: 'black',
//     textAlign: 'center',
//     fontWeight: '900',
//     width: 130,
//     borderColor: '#feac03',
//     backgroundColor: 'white',
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2,
//     // },
//     // shadowOpacity: 0.25,
//     // shadowRadius: 3.84,
//     // elevation: 2,
//   },
//   itemicon: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     gap: 5,
//   },
//   icons: {
//     fontSize: 22,
//     color: '#fff',
//   },
//   button: {
//     backgroundColor: '#f3d25b',
//   },
//   btn: {
//     fontSize: 18,
//     color: '#874701',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   linearGradient: {
//     // flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     color: '#874701',
//     marginBottom: 7,
//     width: 100,
//     height: 30,
//     borderRadius: 100,
//     backgroundColor: '#f3d25b',
//   },
//   images1: {
//     marginVertical: 5, // Increased margin to add spacing around the circle
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: 200,
//     height: 150, // Increased height of the circle
//     paddingVertical: 10, // Added padding inside the circle
//   },

//   containervideo: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10, // Increased margin to add spacing between the video and the circle
//     marginTop: 20, // Ensured spacing above the video
//     borderColor: '#f3d25b',
//     borderWidth: 2,
//     marginRight: 60,
//     marginLeft: 60,
//   },

//   videoPlayer: {
//     width: 235,
//     height: 130,
//   },
//   playPauseButton: {
//     marginTop: 20,
//     position: 'absolute',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   input1: {
//     height: 45,
//     marginTop: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderRadius: 6,
//     color: 'black',
//     padding: 10,
//     width: '94%',
//     borderColor: '#874701',
//     backgroundColor: 'white',
//     marginLeft: 10,
//     marginRight: 30,
//     // shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 2,
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
//   btn2: {
//     textAlign: 'center',
//     backgroundColor: '#f3d25b',
//     fontSize: 17,
//     borderColor: '#f3d25b',
//     borderWidth: 2,
//     color: 'black',
//     fontWeight: '700',
//     padding: 3,
//     marginTop: 0,
//     marginBottom: 10,
//     borderRadius: 100,
//     width: 200,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   ImageBackground,
//   fontFamily,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Video from 'react-native-video';
// // import video from '../../assets/images/video.mp4';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RazorpayCheckout from 'react-native-razorpay';
// import {useNavigation} from '@react-navigation/native';
// import {Image} from 'react-native-animatable';
// import {WebView} from 'react-native-webview';
// import Modal from 'react-native-modal';
// import Swiper from 'react-native-swiper';

// function Home() {
//   const navigation = useNavigation('');
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

//   // Validation function for amount - will be used only when Buy button is clicked
//   const validateAmount = amount => {
//     const numAmount = Number(amount);
//     if (numAmount < 100) {
//       Alert.alert('Minimum Amount', 'Amount should be at least ₹100');
//       return false;
//     } else if (numAmount > 200000) {
//       Alert.alert('Maximum Amount', 'Amount should not exceed ₹2,00,000');
//       return false;
//     }
//     return true;
//   };

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const carouselImages = [
//     require('../../assets/images/g9.png'),
//     require('../../assets/images/g10.png'),
//   ];

//   // Get Gst+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [data, setData] = useState({});
//   const getGst = async () => {
//     const config = {
//       url: '/getGst',
//       method: 'get',
//       baseURL: 'https://justbuynewbackend.onrender.com/api/v1/gst',
//       headers: {'conttent-type': 'application/json'},
//     };
//     try {
//       const result = await axios(config);
//       if (result.status === 200) {
//         setData(result.data.success);
//         setLoading(true);
//       } else {
//         Alert.alert('Something went wrong');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get all transiction---
//   const [alltransiction, setAlltransiction] = useState([]);

//   const userTransaction = async _id => {
//     let user = await AsyncStorage.getItem('user');
//     user = JSON.parse(user);
//     try {
//       await axios
//         .get(
//           'https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/' +
//             user?._id,
//         )
//         .then(res => {
//           if (res.status == 200) {
//             console.log(
//               'idddddddddddddddddddddddddddddddddddddddddd',
//               user?._id,
//             );
//             setAlltransiction(res.data.success);

//             setLoading(true);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //

//   const [allcoin, setallcoin] = useState([]);
//   const getCoins = async () => {
//     try {
//       const storedUser = await AsyncStorage.getItem('user');
//       const parsedUser = JSON.parse(storedUser);

//       setLoading(false); // Start loading before fetching
//       const res = await axios.get(
//         `https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/${parsedUser?._id}`,
//       );

//       if (res.status === 200) {
//         setallcoin(res.data.success);
//         // console.log(res.data.success);
//       } else {
//         console.log(res.error);
//         // Alert.alert('Error', 'Failed to fetch coins data.');
//       }
//     } catch (error) {
//       console.log(error);
//       // Alert.alert('Error', 'An error occurred while fetching coins data.');
//     } finally {
//       setLoading(true); // Stop loading after fetching
//     }
//   };

//   // Get Gold Rate+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [gold, setgold] = useState();
//   const [Amount, setamount] = useState();
//   // console.log(Amount, '₹');
//   const [rate, setRate] = useState([]);
//   const [objRate, setObjRate] = useState({});
//   const [goldRate, setGoldRate] = useState(0);
//   // console.log(objRate, 'objRate>>>>>>>>>>>>>>>>...');
//   const getRate = async () => {
//     try {
//       await axios
//         .get('https://justbuynewbackend.onrender.com/api/v1/rate/allrate')
//         .then(res => {
//           if (res.status === 200) {
//             setRate(res.data.success);
//             setObjRate(res.data?.success[0]);
//             setGoldRate(res.data?.success[0]?.rate);
//             setLoading(true);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // console.log('rate:', rate, 'objrate:', objRate);
//   // Total Gst++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   let NewGst = data?.Sgst + data?.Cgst;

//   // Get Video++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [video, setvideo] = useState([]);
//   const getVideo = async () => {
//     try {
//       await axios
//         .get('https://justbuynewbackend.onrender.com/api/v1/video/allvideo')
//         .then(res => {
//           if (res.status === 200) {
//             setvideo(res.data.success);
//             setLoading(true);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error.success);
//     }
//   };

//   // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [user, setUser] = useState('');
//   const userData = async () => {
//     let user = await AsyncStorage.getItem('user');
//     setUser(JSON.parse(user));
//   };

//   useEffect(() => {
//     getRate();
//     getGst();
//     getVideo();
//     userData();
//     getCoins();
//     userTransaction();
//   }, []);

//   // All transicition
//   const transicitionData = alltransiction?.reduce(
//     (a, i) => a + Number(i?.gold),
//     0,
//   );
//   // console.log('transicitionData', transicitionData);

//   // All gold Store
//   // const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

//   const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

//   console.log('coinsdata.................................', coinsData);
//   console.log(
//     'transicitionData.................................',
//     transicitionData,
//   );

//   // console.log(allcoin, 'coinsData');
//   // Total Store gold
//   const totalgoldStore = transicitionData - coinsData;
//   // console.log('Total gold Store', totalgoldStore);

//   // AddCoinsRequest+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   const [mobile, setMobile] = useState('');

//   const handleChange = mobile => {
//     const formattedMobile = mobile.replace(/[^0-9]/g, '');
//     if (formattedMobile !== mobile) {
//       Alert.alert('Only numbers are allowed');
//     }
//     setMobile(formattedMobile);
//   };

//   const addRequest = async () => {
//     if (!mobile) return Alert.alert('Enter required gold coins');
//     if (mobile < 1) return Alert.alert('Please enter more than 1 gram');
//     if (mobile > totalgoldStore)
//       return Alert.alert("Don't have sufficent gold in your Savings");
//     try {
//       const config = {
//         url: '/addCoins',
//         method: 'post',
//         baseURL: 'https://justbuynewbackend.onrender.com/api/v1/coins',
//         headers: {'content-type': 'application/json'},
//         data: {
//           UserId: user?._id,
//           username: user?.name,
//           email: user?.email,
//           usphone: user?.phoneno,
//           phone: user?.phoneno,
//           coins: Number(mobile), // This sends the required amount
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         // console.log(res.data.success);
//         toggleModal();
//         Alert.alert('Request Sent');
//         setamount('');
//         setgold('');
//         setMobile('');
//         getCoins();
//       } else {
//         Alert.alert('Something Wrong ');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Total calculation++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   const [gramCompleted, setGramCompleted] = useState(false);
//   const calculate = (price, Amount) => {
//     // No validation here - just calculate
//     let ab = Number(Amount) / Number(price);
//     let gst = 100 / (100 + NewGst);
//     amt = ab * gst;
//     // console.log('rvejvf', Number(ab), Amount);
//     setgold(amt?.toFixed(4));
//     // setgold(Number(ab));
//     setGramCompleted(Number.isInteger(ab));

//     setamount(Amount);
//   };
//   // console.log('Amount', Number(Amount));

//   const calculate2 = (price, gold) => {
//     // console.log('price:', price, 'gold:', gold);
//     setgold(gold);
//     let ab = Number(gold) * Number(price);

//     // No validation here - just calculate
//     setamount(ab?.toFixed(2));
//     setGramCompleted(Number.isInteger(gold));
//     // console.log('price:', price, 'gold:', gold, 'Amount:', Amount);
//   };

//   useEffect(() => {
//     if (Object.keys(data).length != 0 && Object.keys(objRate).length != 0) {
//       let NewGst1 = data?.Sgst + data?.Cgst;
//       // setamount(
//       //   (
//       //     Number(objRate.rate) +
//       //     (objRate.rate * (NewGst1 + objRate?.percentage)) / 100
//       //   )?.toFixed(3),
//       // );
//     }
//   }, [objRate]);

//   // useEffect(() => {
//   //   if (gold >= 1 && totalgoldStore) {
//   //     setGramCompleted(true);
//   //   } else {
//   //     setGramCompleted(false);
//   //   }
//   // }, [gold]);

//   // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   const [paymentid, setpaymentId] = useState('');
//   const placeorder = async paymentid => {
//     try {
//       const config = {
//         url: '/transaction',
//         method: 'post',
//         baseURL: 'https://justbuynewbackend.onrender.com/api/v1/transactions',
//         headers: {'content-type': 'application/json'},
//         data: {
//           UserId: user?._id,
//           amount: Amount,
//           gold: gold,
//           PaymentId: paymentid,
//           totalCoin: totalgoldStore - Number(gold), // Corrected calculation
//         },
//       };
//       // console.log('user', user._id, Amount, gold);
//       await axios(config).then(async function (res) {
//         if (res.status === 200) {
//           // console.log('success');
//           Alert.alert('Successfully');
//           await userTransaction(); // Ensure transactions are refreshed
//           await getCoins(); // Refresh coins data
//           navigation.navigate('Home1');
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isDisabled = !Amount || !gold;
//   // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ phonepay
//   // const generateUniqueTransactionId = () => {
//   //   const timestamp = Date.now().toString();
//   //   const randomComponent = Math.floor(Math.random() * 1000000).toString();
//   //   // console.log('timestamp', timestamp - randomComponent);
//   //   return `${timestamp}-${randomComponent}`;
//   // };

//   // const [paymentUrl, setPaymentUrl] = useState();
//   // const postTransaction = async data => {
//   //   try {
//   //     const newMerchantTransactionId = generateUniqueTransactionId();
//   //     const config = {
//   //       url: '/makepayment',
//   //       method: 'post',
//   //       baseURL: 'https://justbuynewbackend.onrender.com/api/v1/transactions',
//   //       data: {
//   //         merchantTransactionId: newMerchantTransactionId,
//   //         merchantUserId: '2342343',
//   //         amount: Math.round(Amount * 100),
//   //         redirectUrl: 'com.justbuygold://payment-success',
//   //         callbackUrl: 'com.justbuygold://payment-success',
//   //         mobileNumber: user?.phoneno,
//   //       },
//   //     };

//   //     const res = await axios(config);

//   //     if (res.status === 200) {
//   //       // console.log('ghat', res.data.url.url);
//   //       setPaymentUrl(res.data.url.url);
//   //       navigation.navigate('Paymentpage', {
//   //         paymentUrl: res.data.url.url,
//   //         user: user,
//   //         gold: gold,
//   //         amount: Amount,
//   //         newMerchantTransactionId: newMerchantTransactionId,
//   //         status: 'Paid',
//   //       });
//   //       setgold('');
//   //       setamount('');
//   //     }
//   //   } catch (error) {
//   //     console.log('Error while fetching payment URL:', error);
//   //   }
//   // };

//   // react-native-razorpay+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   const posttransaction = async () => {
//     // Validate amount before proceeding with payment
//     if (!validateAmount(Amount)) {
//       return;
//     }

//     try {
//       var options = {
//         key: 'rzp_test_FAe0X6xLYXaXHe',
//         amount: Amount * 100,
//         // amount: '500',
//         currency: 'INR',
//         name: 'JustBuyGold',
//         description: 'Order Amount',
//         image: './assets/images/newlogo.png',
//         customerId: user?._id,
//         handler: function (response) {
//           // Alert.alert(response.razorpay_payment_id);
//           setpaymentId(response.razorpay_payment_id);
//         },

//         prefill: {
//           name: user?.name,
//           email: user?.email,
//           contact: user?.phoneno,
//         },
//         theme: {color: '#F37254'},
//       };
//       RazorpayCheckout.open(options)
//         .then(data => {
//           // handle success
//           Alert.alert(`Success: ${data.razorpay_payment_id}`);
//           placeorder(data.razorpay_payment_id);
//           setamount('');
//           setgold('');
//         })
//         .catch(error => {
//           // handle failure
//           Alert.alert(`Error: ${error.code} | ${error.description}`);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <>
//           <ImageBackground
//             source={require('../../assets/images/app-bg.jpg')}
//             style={{flex: 1}}
//             resizeMode="cover">
//             <View style={styles.container}>
//               <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />

//               <ScrollView
//                 style={{
//                   backgroundColor: '#transparent',
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     alignContent: 'center',
//                     paddingTop: 10,
//                     paddingLeft: 15,
//                     paddingRight: 15,
//                     backgroundColor: '#transparent',
//                   }}>
//                   <Image
//                     source={require('../../assets/images/newlogo.png')}
//                     style={{height: 110, width: 90, marginTop: 20}}
//                   />
//                   <Image
//                     source={require('../../assets/images/g5.png')}
//                     style={{height: 35, width: 250, objectFit: 'contain'}}
//                   />
//                   {/* <Text
//                 style={{
//                   color: '#FFD700',
//                   fontSize: 25,
//                   fontWeight: '600',
//                 }}>
//                 Just Buy Gold
//               </Text> */}
//                 </View>
//                 {rate?.slice(0, 1)?.map((ele, index) => {
//                   // console.log('rate', ele.rate);
//                   return (
//                     <View style={styles.loan}>
//                       {/* with gst {NewGst} % */}
//                       {/* G = (15/100) * 115 = $17.25 */}

//                       <View style={styles.content} key={ele?._id}>
//                         <Text style={[styles.passage, {fontSize: 20}]}>
//                           Gold Rate
//                         </Text>
//                         <Text style={styles.passage}>
//                           ₹{Number(ele.rate)?.toFixed(2)} / gm
//                         </Text>
//                       </View>

//                       <View style={styles.items}>
//                         <View
//                           style={{
//                             marginHorizontal: 30,
//                             marginVertical: 20,
//                             flexDirection: 'row',
//                             justifyContent: 'center',
//                             gap: 10,
//                             padding: 4,
//                             borderWidth: 2,
//                             height: 95,
//                             borderColor: 'transparent',
//                             borderRadius: 23,
//                             paddingHorizontal: 30,
//                           }}>
//                           <View
//                             style={{
//                               marginHorizontal: 30,
//                               // marginVertical: 20,
//                               flexDirection: 'row',
//                               justifyContent: 'center',
//                               gap: 20,
//                               padding: 4,
//                               borderWidth: 2,
//                               height: 75,
//                               borderColor: 'transparent',
//                               borderRadius: 13,
//                             }}>
//                             <View style={styles.chipContainer}>
//                               <Text style={styles.chip}>Gold</Text>
//                               <Text style={styles.chip}>{ele?.name}k</Text>
//                               <Text style={styles.chip}>999</Text>
//                             </View>
//                           </View>
//                           {/* <Text style={styles.chip}>999</Text> */}
//                         </View>
//                         <View style={styles.itemicon}>
//                           <TextInput
//                             style={styles.input}
//                             placeholder={gold ? `${gold} Grams` : 'Grams'}
//                             placeholderTextColor="#000"
//                             keyboardType="number-pad"
//                             value={gold}
//                             onChangeText={gold =>
//                               calculate2(
//                                 // ele.rate*gold + NewGst*ele.rate*gold/100,
//                                 (ele.rate * (100 + NewGst)) / 100,
//                                 gold,
//                               )
//                             }
//                           />
//                           {/* (Number(ele.rate) +(ele.rate * (NewGst + ele?.percentage)) / 100) */}
//                           {/* <TextInput
//                             style={styles.input}
//                             placeholder={gold ? `${gold} Grams` : 'Grams'}
//                             placeholderTextColor="#f3d25b"
//                             keyboardType="number-pad"
//                             value={gold}
//                             onChangeText={newGold => {
//                               setgold(newGold); // Assuming you use useState or a similar hook
//                               if (!newGold) {
//                                 setamount(''); // Reset Amount when gold is emptied
//                               } else {
//                                 calculate2(
//                                   Number(ele.rate) +
//                                     (ele.rate * (NewGst + ele?.percentage)) /
//                                       100,
//                                   newGold,
//                                 );
//                               }
//                             }}
//                           /> */}
//                           {/* <Text>
//                             <FontAwesome name="exchange" style={styles.icons} />
//                           </Text> */}
//                           <View style={{marginTop: -16}}>
//                             <FontAwesome name="exchange" style={styles.icons} />
//                           </View>

//                           {/* <TextInput
//                         style={styles.input}
//                         placeholder={Amount ? `${Amount} Amount` : 'Amount'}
//                         placeholderTextColor="#f3d25b"
//                         keyboardType="number-pad"
//                         value={Amount}
//                         onChangeText={Amount =>
//                           calculate(
//                             Number(ele.rate) +
//                               (ele.rate * (NewGst + ele?.percentage)) / 100,
//                             Amount,
//                           )
//                         }
//                       /> */}
//                           <TextInput
//                             style={styles.input}
//                             placeholder={
//                               Amount
//                                 ? Amount === '0.00'
//                                   ? 'Amount'
//                                   : `${Amount}`
//                                 : 'Amount'
//                             }
//                             placeholderTextColor="#000"
//                             keyboardType="number-pad"
//                             value={Amount === '0.00' ? '' : Amount}
//                             onChangeText={newAmount => {
//                               setamount(newAmount); // Update the Amount state
//                               if (!newAmount) {
//                                 setgold(''); // Optionally reset gold when Amount is cleared
//                               } else {
//                                 calculate(ele.rate, newAmount);
//                               }
//                             }}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                   );
//                 })}
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -35,
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       if (!isDisabled) {
//                         // Validate amount only when Buy button is clicked
//                         if (validateAmount(Amount)) {
//                           navigation.navigate('Pay', {
//                             Amount,
//                             gold,
//                             goldRate,
//                           });
//                         }
//                       }
//                     }}
//                     disabled={isDisabled}
//                     style={{opacity: isDisabled ? 0.5 : 1}}
//                     // onPress={posttransaction}
//                     //  onPress={postTransaction}
//                   >
//                     <ImageBackground
//                       source={require('../../assets/images/buybg.png')}
//                       style={{
//                         height: 50,
//                         width: 300,
//                         zIndex: 9999,
//                         marginTop: 10,
//                       }}>
//                       <Text
//                         style={{
//                           color: 'black',
//                           fontSize: 25,
//                           fontFamily: 'Poppins-SemiBoldItalic',
//                           alignSelf: 'center',
//                           zIndex: 9999,
//                           fontWeight: '20',
//                         }}>
//                         Buy
//                       </Text>
//                     </ImageBackground>

//                     {/* <LinearGradient
//                   start={{x: 0.0, y: 1.25}}
//                   end={{x: 1.5, y: 1.25}}
//                   // locations={[0, 0.5, 0.6]}
//                   colors={['#FFD700', '#FFD700', '#FFD700',]}
//                   style={styles.linearGradient}> */}
//                     {/* <View style={styles.linearGradient}>
//                   <Text style={styles.btn}>Buy</Text>
//                 </View> */}
//                     {/* </LinearGradient> */}
//                   </TouchableOpacity>
//                 </View>

//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     backgroundColor: 'transparent',
//                   }}>
//                   <ImageBackground
//                     source={require('../../assets/images/gold-coins.png')}
//                     // resizeMode="stretch"
//                     style={styles.images1}>
//                     <Text
//                       style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
//                       {(transicitionData - coinsData).toFixed(4)}
//                     </Text>
//                     <Text
//                       style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
//                       Grams
//                     </Text>
//                   </ImageBackground>

//                   {totalgoldStore >= 1 && (
//                     <TouchableOpacity
//                       onPress={() => {
//                         toggleModal();
//                       }}>
//                       <View
//                         style={[
//                           styles.regback1,
//                           {flexDirection: 'row', justifyContent: 'center'},
//                         ]}>
//                         <Text style={styles.btn2}> Request For The Coins</Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}

//                   {gramCompleted && (
//                     <TouchableOpacity
//                       onPress={() => {
//                         toggleModal();
//                         setGramCompleted(!gramCompleted);
//                       }}>
//                       <View
//                         style={[
//                           styles.regback1,
//                           {flexDirection: 'row', justifyContent: 'center'},
//                         ]}>
//                         <Text style={styles.btn2}> Request For The Coins</Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                 </View>

//                 <View style={styles.swiperContainer}>
//                   <Swiper
//                     style={styles.wrapper}
//                     showsButtons={false}
//                     autoplay
//                     autoplayTimeout={3}
//                     dotStyle={styles.dot}
//                     activeDotStyle={styles.activeDot}>
//                     {carouselImages.map((image, index) => (
//                       <View key={index} style={styles.slide}>
//                         <Image
//                           source={image}
//                           resizeMode="contain"
//                           style={styles.swiperImage}
//                         />
//                       </View>
//                     ))}
//                   </Swiper>
//                 </View>
//               </ScrollView>

//               <View style={{flex: 1}}>
//                 <Modal isVisible={isModalVisible}>
//                   <View
//                     style={{
//                       backgroundColor: 'white',
//                       height: 320,
//                       borderRadius: 5,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           paddingTop: 20,
//                           paddingBottom: 10,
//                           alignItems: 'center',
//                           fontSize: 20,
//                           fontWeight: '700',
//                           color: 'black',
//                         }}>
//                         Gold in your pocket
//                       </Text>
//                     </View>
//                     <View style={styles.request}>
//                       <View style={styles.request}>
//                         <Text
//                           style={[
//                             styles.input1,
//                             {
//                               fontSize: 20,
//                               height: 47,
//                               width: '50%',
//                               alignSelf: 'center',
//                               textAlign: 'center',
//                               fontWeight: '600',
//                               backgroundColor: '#f3d25b',
//                               borderColor: '#f3d25b',
//                             },
//                           ]}>
//                           {(transicitionData - coinsData).toFixed(4)} Grams
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           paddingTop: 20,
//                           paddingBottom: 10,
//                           alignItems: 'center',
//                           fontSize: 20,
//                           fontWeight: '700',
//                           color: 'black',
//                           alignSelf: 'center',
//                         }}>
//                         Required Gold Coin
//                       </Text>
//                       <View style={styles.request}>
//                         <TextInput
//                           style={[
//                             styles.input1,
//                             {
//                               fontSize: 17,
//                               width: '50%',
//                               alignSelf: 'center',
//                               textAlign: 'center',
//                               color: 'black',
//                             },
//                           ]}
//                           placeholderTextColor={'black'}
//                           placeholder="Grams"
//                           value={mobile}
//                           keyboardType="number-pad"
//                           onChangeText={handleChange}
//                         />
//                       </View>
//                       {/* <View style={styles.request}>
//                     <TextInput
//                       style={[styles.input1, {fontSize: 16}]}
//                       placeholder={user?.name}
//                       value={name}
//                       keyboardType="default"
//                       onChangeText={name => setName(name)}
//                     />
//                   </View> */}
//                       {/* <View style={styles.request}>
//                     <TextInput
//                       style={[styles.input1, {fontSize: 16}]}
//                       placeholder={user?.email}
//                       value={email}
//                       keyboardType="email-address"
//                       onChangeText={email => setEmail(email)}
//                     />
//                   </View> */}
//                       {/* <View style={styles.request}>
//                     <TextInput
//                       style={[styles.input1, {fontSize: 16}]}
//                       value={mobile}
//                       placeholder={user?.phoneno}
//                       keyboardType="number-pad"
//                       onChangeText={mobile => setMobile(mobile)}
//                     />
//                   </View> */}
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         padding: 20,
//                       }}>
//                       <LinearGradient
//                         start={{x: 1, y: 0}}
//                         end={{x: 0, y: 0}}
//                         colors={['#874701', '#874701', '#874701']}
//                         style={styles.linearGradientmodel}>
//                         <TouchableOpacity onPress={toggleModal}>
//                           <Text
//                             style={{color: 'white', fontSize: 15, width: 50}}>
//                             Cancel
//                           </Text>
//                         </TouchableOpacity>
//                       </LinearGradient>
//                       <LinearGradient
//                         start={{x: 1, y: 0}}
//                         end={{x: 0, y: 0}}
//                         colors={['#874701', '#874701', '#874701']}
//                         style={styles.linearGradientmodel}>
//                         <TouchableOpacity
//                           onPress={() => {
//                             addRequest();
//                           }}>
//                           <Text
//                             style={{
//                               display: 'flex',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               textAlign: 'center',
//                               color: 'white',
//                               fontSize: 15,
//                               width: 80,
//                             }}>
//                             Send request
//                           </Text>
//                         </TouchableOpacity>
//                       </LinearGradient>
//                     </View>
//                   </View>
//                 </Modal>
//               </View>
//               {/* Modal */}
//             </View>
//           </ImageBackground>
//         </>
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           {/* <Text>
//             <ActivityIndicator size="big" color="#874701" />
//           </Text> */}
//         </View>
//       )}
//     </>
//   );
// }

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     fontFamily: 'Poppins-SemiBoldItalic',
//     // backgroundColor: '#2b2cd6',
//   },
//   image: {
//     flex: 1,
//   },
//   loan: {
//     width: '100%',
//     padding: 10,
//     // backgroundColor: '#2b2cd6',
//   },
//   content: {
//     paddingTop: 4,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 8,
//   },
//   passage: {
//     color: '#f3d25b',
//     fontSize: 22,
//     // fontWeight: '500',
//     fontFamily: 'Poppins-SemiBoldItalic',
//   },
//   xyz: {
//     paddingHorizontal: 14,
//   },
//   items: {
//     borderWidth: 4,
//     borderColor: '#f3d25b',
//     borderRadius: 10,
//     width: '100%',
//     paddingBottom: 16,
//     // backgroundColor: '#2b2cd6',
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     borderColor: '#f3d25b',
//     // borderWidth: 5,
//     borderRadius: 50,
//     paddingVertical: 1,
//     paddingHorizontal: 30,
//     backgroundColor: 'white',
//     height: 45,
//     marginVertical: 10,
//     borderWidth: 4,
//     fontSize: 2,
//     borderRadius: 13,
//     width: '140%',

//     padding: 30,
//     gap: 25,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontFamily: 'popins-semiBoldItalic',
//   },
//   chip: {
//     color: '#000',
//     textAlign: 'center',
//     fontSize: 22,
//     fontFamily: 'Poppins-SemiBoldItalic',
//   },
//   swiperContainer: {
//     height: 200,
//     marginTop: 20,
//   },
//   swiperImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   input: {
//     height: 45,
//     marginVertical: 10,
//     borderWidth: 4,
//     fontSize: 16,
//     borderRadius: 13,
//     color: 'black',

//     placeholderTextColor: 'black',
//     textAlign: 'center',
//     fontWeight: '900',
//     width: 130,
//     borderColor: '#f3d25b',
//     backgroundColor: 'white',
//     marginTop: -10,
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2,
//     // },
//     // shadowOpacity: 0.25,
//     // shadowRadius: 3.84,
//     // elevation: 2,
//   },
//   itemicon: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     gap: 10,
//     marginTop: -14,
//   },
//   icons: {
//     fontSize: 22,
//     color: '#fff',
//   },
//   button: {
//     backgroundColor: '#f3d25b',
//   },
//   btn: {
//     fontSize: 18,
//     color: '#874701',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   linearGradient: {
//     // flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     color: '#874701',
//     marginBottom: 7,
//     width: 100,
//     height: 30,
//     borderRadius: 100,
//     backgroundColor: '#f3d25b',
//   },
//   images1: {
//     marginVertical: 5, // Increased margin to add spacing around the circle
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: 200,
//     height: 150, // Increased height of the circle
//     paddingVertical: 10, // Added padding inside the circle
//   },

//   containervideo: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10, // Increased margin to add spacing between the video and the circle
//     marginTop: 20, // Ensured spacing above the video
//     borderColor: '#f3d25b',
//     borderWidth: 2,
//     marginRight: 60,
//     marginLeft: 60,
//   },

//   videoPlayer: {
//     width: 235,
//     height: 130,
//   },
//   playPauseButton: {
//     marginTop: 20,
//     position: 'absolute',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   input1: {
//     height: 45,
//     marginTop: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderRadius: 6,
//     color: 'black',
//     padding: 10,
//     width: '94%',
//     borderColor: '#874701',
//     backgroundColor: 'white',
//     marginLeft: 10,
//     marginRight: 30,
//     // shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 2,
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
//   btn2: {
//     textAlign: 'center',
//     backgroundColor: '#f3d25b',
//     fontSize: 17,
//     borderColor: '#f3d25b',
//     borderWidth: 2,
//     color: 'black',
//     fontWeight: '700',
//     padding: 3,
//     marginTop: 0,
//     marginBottom: 10,
//     borderRadius: 100,
//     width: 200,
//   },
// });



/* 
import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import RazorpayCheckout from "react-native-razorpay"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { Image } from "react-native-animatable"
import Modal from "react-native-modal"
import Swiper from "react-native-swiper"

// Exit Confirmation Modal Component
const ExitConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Exit Application</Text>
          <Text style={styles.modalText}>Are You Sure Want To Exit?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#874701", "#874701", "#874701"]}
                style={styles.exitButton}
              >
                <Text style={styles.exitButtonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#f3d25b", "#f3d25b", "#f3d25b"]}
                style={styles.exitButton}
              >
                <Text style={[styles.exitButtonText, { color: "#000" }]}>Yes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

function Home() {
  const navigation = useNavigation("")
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [exitModalVisible, setExitModalVisible] = useState(false)
  const [selectedGoldType, setSelectedGoldType] = useState(0)

  // Handle back button press ONLY when this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setExitModalVisible(true)
        return true // Prevents default back action
      }

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

      return () => backHandler.remove()
    }, []),
  )

  // Validation function for amount - will be used only when Buy button is clicked
  const validateAmount = (amount) => {
    const numAmount = Number(amount)
    if (numAmount < 100) {
      Alert.alert("Minimum Amount", "Amount should be at least ₹100")
      return false
    } else if (numAmount > 200000) {
      Alert.alert("Maximum Amount", "Amount should not exceed ₹2,00,000")
      return false
    }
    return true
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  const carouselImages = [require("../../assets/images/g9.png"), require("../../assets/images/g9.png")]

  // Get Gst+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [data, setData] = useState({})
  const getGst = async () => {
    const config = {
      url: "/getGst",
      method: "get",
      baseURL: "https://justbuynewbackend.onrender.com/api/v1/gst",
      headers: { "conttent-type": "application/json" },
    }
    try {
      const result = await axios(config)
      if (result.status === 200) {
        setData(result.data.success)
        setLoading(true)
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get all transiction---
  const [alltransiction, setAlltransiction] = useState([])

  const userTransaction = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/" + user?._id).then((res) => {
        if (res.status == 200) {
          console.log("idddddddddddddddddddddddddddddddddddddddddd", user?._id)
          setAlltransiction(res.data.success)

          setLoading(true)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  //

  const [allcoin, setallcoin] = useState([])
  const getCoins = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      const parsedUser = JSON.parse(storedUser)

      setLoading(false) // Start loading before fetching
      const res = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/${parsedUser?._id}`)

      if (res.status === 200) {
        setallcoin(res.data.success)
        // console.log(res.data.success);
      } else {
        console.log(res.error)
        // Alert.alert('Error', 'Failed to fetch coins data.');
      }
    } catch (error) {
      console.log(error)
      // Alert.alert('Error', 'An error occurred while fetching coins data.');
    } finally {
      setLoading(true) // Stop loading after fetching
    }
  }

  // Get Gold Rate+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [gold, setgold] = useState()
  const [Amount, setamount] = useState()
  // console.log(Amount, '₹');
  const [rate, setRate] = useState([])
  const [objRate, setObjRate] = useState({})
  const [goldRate, setGoldRate] = useState(0)
  // console.log(objRate, 'objRate>>>>>>>>>>>>>>>>...');
  const getRate = async () => {
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/rate/allrate").then((res) => {
        if (res.status === 200) {
          setRate(res.data.success)
          setObjRate(res.data?.success[0])
          setGoldRate(res.data?.success[0]?.rate)
          setLoading(true)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // console.log('rate:', rate, 'objrate:', objRate);
  // Total Gst++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const NewGst = data?.Sgst + data?.Cgst

  // Get Video++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [video, setvideo] = useState([])
  const getVideo = async () => {
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/video/allvideo").then((res) => {
        if (res.status === 200) {
          setvideo(res.data.success)
          setLoading(true)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error.success)
    }
  }

  // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [user, setUser] = useState("")
  const userData = async () => {
    const user = await AsyncStorage.getItem("user")
    setUser(JSON.parse(user))
  }

  useEffect(() => {
    getRate()
    getGst()
    getVideo()
    userData()
    getCoins()
    userTransaction()
  }, [])

  // All transicition
  const transicitionData = alltransiction?.reduce((a, i) => a + Number(i?.gold), 0)
  // console.log('transicitionData', transicitionData);

  // All gold Store
  // const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

  const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0)

  console.log("coinsdata.................................", coinsData)
  console.log("transicitionData.................................", transicitionData)

  // console.log(allcoin, 'coinsData');
  // Total Store gold
  const totalgoldStore = transicitionData - coinsData
  // console.log('Total gold Store', totalgoldStore);

  // AddCoinsRequest+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [mobile, setMobile] = useState("")

  const handleChange = (mobile) => {
    const formattedMobile = mobile.replace(/[^0-9]/g, "")
    if (formattedMobile !== mobile) {
      Alert.alert("Only numbers are allowed")
    }
    setMobile(formattedMobile)
  }

  const addRequest = async () => {
    if (!mobile) return Alert.alert("Enter required gold coins")
    if (mobile < 1) return Alert.alert("Please enter more than 1 gram")
    if (mobile > totalgoldStore) return Alert.alert("Don't have sufficent gold in your Savings")
    try {
      const config = {
        url: "/addCoins",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/coins",
        headers: { "content-type": "application/json" },
        data: {
          UserId: user?._id,
          username: user?.name,
          email: user?.email,
          usphone: user?.phoneno,
          phone: user?.phoneno,
          coins: Number(mobile), // This sends the required amount
        },
      }
      const res = await axios(config)
      if (res.status === 200) {
        // console.log(res.data.success);
        toggleModal()
        Alert.alert("Request Sent")
        setamount("")
        setgold("")
        setMobile("")
        getCoins()
      } else {
        Alert.alert("Something Wrong ")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Total calculation++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [gramCompleted, setGramCompleted] = useState(false)

  // Get current gold type multiplier from your rate data
  const getCurrentMultiplier = () => {
    const currentRate = rate[selectedGoldType]
    return currentRate ? currentRate.multiplier || 1 : 1
  }

  const calculate = (price, Amount) => {
    // No validation here - just calculate
    const multiplier = getCurrentMultiplier()
    const adjustedPrice = price * multiplier
    const ab = Number(Amount) / Number(adjustedPrice)
    const gst = 100 / (100 + NewGst)
    const amt = ab * gst
    // console.log('rvejvf', Number(ab), Amount);
    setgold(amt?.toFixed(4))
    // setgold(Number(ab));
    setGramCompleted(Number.isInteger(ab))

    setamount(Amount)
  }
  // console.log('Amount', Number(Amount));

  const calculate2 = (price, gold) => {
    // console.log('price:', price, 'gold:', gold);
    setgold(gold)
    const multiplier = getCurrentMultiplier()
    const adjustedPrice = price * multiplier
    const ab = Number(gold) * Number(adjustedPrice)

    // No validation here - just calculate
    setamount(ab?.toFixed(2))
    setGramCompleted(Number.isInteger(gold))
    // console.log('price:', price, 'gold:', gold, 'Amount:', Amount);
  }

  useEffect(() => {
    if (Object.keys(data).length != 0 && Object.keys(objRate).length != 0) {
      const NewGst1 = data?.Sgst + data?.Cgst
      // setamount(
      //   (
      //     Number(objRate.rate) +
      //     (objRate.rate * (NewGst1 + objRate?.percentage)) / 100
      //   )?.toFixed(3),
      // );
    }
  }, [objRate])

  // Reset calculations when gold type changes
  useEffect(() => {
    if (gold || Amount) {
      // Recalculate with new multiplier
      if (gold && objRate?.rate) {
        const price = (objRate.rate * (100 + NewGst)) / 100
        calculate2(price, gold)
      } else if (Amount && objRate?.rate) {
        const price = (objRate.rate * (100 + NewGst)) / 100
        calculate(price, Amount)
      }
    }
  }, [selectedGoldType])

  // useEffect(() => {
  //   if (gold >= 1 && totalgoldStore) {
  //     setGramCompleted(true);
  //   } else {
  //     setGramCompleted(false);
  //   }
  // }, [gold]);

  // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [paymentid, setpaymentId] = useState("")
  const placeorder = async (paymentid) => {
    try {
      const config = {
        url: "/transaction",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/transactions",
        headers: { "content-type": "application/json" },
        data: {
          UserId: user?._id,
          amount: Amount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: totalgoldStore - Number(gold), // Corrected calculation
        },
      }
      // console.log('user', user._id, Amount, gold);
      await axios(config).then(async (res) => {
        if (res.status === 200) {
          // console.log('success');
          Alert.alert("Successfully")
          await userTransaction() // Ensure transactions are refreshed
          await getCoins() // Refresh coins data
          navigation.navigate("Home1")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const isDisabled = !Amount || !gold
  // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ phonepay
  // const generateUniqueTransactionId = () => {
  //   const timestamp = Date.now().toString();
  //   const randomComponent = Math.floor(Math.random() * 1000000).toString();
  //   // console.log('timestamp', timestamp - randomComponent);
  //   return `${timestamp}-${randomComponent}`;
  // };

  // const [paymentUrl, setPaymentUrl] = useState();
  // const postTransaction = async data => {
  //   try {
  //     const newMerchantTransactionId = generateUniqueTransactionId();
  //     const config = {
  //       url: '/makepayment',
  //       method: 'post',
  //       baseURL: 'https://justbuynewbackend.onrender.com/api/v1/transactions',
  //       data: {
  //         merchantTransactionId: newMerchantTransactionId,
  //         merchantUserId: '2342343',
  //         amount: Math.round(Amount * 100),
  //         redirectUrl: 'com.justbuygold://payment-success',
  //         callbackUrl: 'com.justbuygold://payment-success',
  //         mobileNumber: user?.phoneno,
  //       },
  //     };

  //     const res = await axios(config);

  //     if (res.status === 200) {
  //       // console.log('ghat', res.data.url.url);
  //       setPaymentUrl(res.data.url.url);
  //       navigation.navigate('Paymentpage', {
  //         paymentUrl: res.data.url.url,
  //         user: user,
  //         gold: gold,
  //         amount: Amount,
  //         newMerchantTransactionId: newMerchantTransactionId,
  //         status: 'Paid',
  //       });
  //       setgold('');
  //       setamount('');
  //     }
  //   } catch (error) {
  //     console.log('Error while fetching payment URL:', error);
  //   }
  // };

  // react-native-razorpay+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const posttransaction = async () => {
    // Validate amount before proceeding with payment
    if (!validateAmount(Amount)) {
      return
    }

    try {
      var options = {
        key: "rzp_test_FAe0X6xLYXaXHe",
        amount: Amount * 100,
        // amount: '500',
        currency: "INR",
        name: "JustBuyGold",
        description: "Order Amount",
        image: "./assets/images/newlogo.png",
        customerId: user?._id,
        handler: (response) => {
          // Alert.alert(response.razorpay_payment_id);
          setpaymentId(response.razorpay_payment_id)
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneno,
        },
        theme: { color: "#F37254" },
      }
      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          Alert.alert(`Success: ${data.razorpay_payment_id}`)
          placeorder(data.razorpay_payment_id)
          setamount("")
          setgold("")
        })
        .catch((error) => {
          // handle failure
          Alert.alert(`Error: ${error.code} | ${error.description}`)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading ? (
        <>
          <View style={styles.container}>
            <StatusBar backgroundColor="#f3d25b" barStyle="dark-content" />

            <ScrollView style={styles.scrollContainer}>
             
              <View style={styles.swiperContainer}>
                <Swiper
                  style={styles.wrapper}
                  showsButtons={false}
                  autoplay
                  autoplayTimeout={3}
                  dotStyle={styles.dot}
                  activeDotStyle={styles.activeDot}
                >
                  {carouselImages.map((image, index) => (
                    <View key={index} style={styles.slide}>
                      <Image source={image} resizeMode="contain" style={styles.swiperImage} />
                    </View>
                  ))}
                </Swiper>
              </View>

          
              {rate?.slice(0, 1)?.map((ele, index) => {

                return (
                  <View style={styles.loan} key={index}>
                  

                    <View style={styles.content} key={ele?._id}>
                      <Text style={[styles.passage, { fontSize: 20 }]}>Gold Rate</Text>
                      <Text style={styles.passage}>₹{Number(ele.rate)?.toFixed(2)} / gm</Text>
                    </View>

                    
                    <View style={styles.quickBuyContainer}>
                     
                      <Text style={styles.quickBuyHeader}>Quick Buy</Text>

                      
                      <View style={styles.goldTypeContainer}>
                        {rate?.map((rateItem, rateIndex) => (
                          <TouchableOpacity
                            key={rateItem._id}
                            style={[styles.goldTypeTab, selectedGoldType === rateIndex && styles.selectedGoldTypeTab]}
                            onPress={() => setSelectedGoldType(rateIndex)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.goldTypeLabel,
                                selectedGoldType === rateIndex && styles.selectedGoldTypeLabel,
                              ]}
                            >
                              Gold
                            </Text>
                            <Text
                              style={[
                                styles.goldTypeSubtitle,
                                selectedGoldType === rateIndex && styles.selectedGoldTypeSubtitle,
                              ]}
                            >
                              {rateItem?.name}k-{rateItem?.purity || "999"}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                   
                      <View style={styles.inputSection}>
                       
                        <View style={styles.inputContainer}>
                          <View style={styles.inputHeader}>
                            <Text style={styles.inputLabel}>Grams</Text>
                            <FontAwesome name="balance-scale" style={styles.inputIcon} />
                          </View>
                          <TextInput
                            style={styles.modernInput}
                            placeholder="0"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                            value={gold}
                            onChangeText={(gold) =>
                              calculate2(
                                // ele.rate*gold + NewGst*ele.rate*gold/100,
                                (ele.rate * (100 + NewGst)) / 100,
                                gold,
                              )
                            }
                          />
                        </View>

                      
                        <View style={styles.exchangeContainer}>
                          <FontAwesome name="exchange" style={styles.exchangeIcon} />
                        </View>

                      
                        <View style={styles.inputContainer}>
                          <View style={styles.inputHeader}>
                            <Text style={styles.inputLabel}>Amount</Text>
                            <Text style={styles.rupeeSymbol}>₹</Text>
                          </View>
                          <TextInput
                            style={styles.modernInput}
                            placeholder="0"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                            value={Amount === "0.00" ? "" : Amount}
                            onChangeText={(newAmount) => {
                              setamount(newAmount)
                              if (!newAmount) {
                                setgold("")
                              } else {
                                calculate(ele.rate, newAmount)
                              }
                            }}
                          />
                        </View>
                      </View>

                     
                      <Text style={styles.gstText}>GST Included</Text>

                     
                      <TouchableOpacity
                        onPress={() => {
                          if (!isDisabled) {
                            if (validateAmount(Amount)) {
                              navigation.navigate("Pay", {
                                Amount,
                                gold,
                                goldRate,
                              })
                            }
                          }
                        }}
                        disabled={isDisabled}
                        style={[styles.buyNowButton, { opacity: isDisabled ? 0.5 : 1 }]}
                      >
                        <Text style={styles.buyNowText}>Buy Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}

           
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  marginTop: 20,
                }}
              >
                <ImageBackground source={require("../../assets/images/gold-coins.png")} style={styles.images1}>
                  <Text style={{ color: "black", fontSize: 20, fontWeight: "700" }}>
                    {(transicitionData - coinsData).toFixed(4)}
                  </Text>
                  <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>Grams</Text>
                </ImageBackground>

                {totalgoldStore >= 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal()
                    }}
                  >
                    <View style={[styles.regback1, { flexDirection: "row", justifyContent: "center" }]}>
                      <Text style={styles.btn2}> Request For The Coins</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {gramCompleted && (
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal()
                      setGramCompleted(!gramCompleted)
                    }}
                  >
                    <View style={[styles.regback1, { flexDirection: "row", justifyContent: "center" }]}>
                      <Text style={styles.btn2}> Request For The Coins</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>

            <View style={{ flex: 1 }}>
              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 320,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingTop: 20,
                        paddingBottom: 10,
                        alignItems: "center",
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                      }}
                    >
                      Gold in your pocket
                    </Text>
                  </View>
                  <View style={styles.request}>
                    <View style={styles.request}>
                      <Text
                        style={[
                          styles.input1,
                          {
                            fontSize: 20,
                            height: 47,
                            width: "50%",
                            alignSelf: "center",
                            textAlign: "center",
                            fontWeight: "600",
                            backgroundColor: "#f3d25b",
                            borderColor: "#f3d25b",
                          },
                        ]}
                      >
                        {(transicitionData - coinsData).toFixed(4)} Grams
                      </Text>
                    </View>
                    <Text
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingTop: 20,
                        paddingBottom: 10,
                        alignItems: "center",
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                        alignSelf: "center",
                      }}
                    >
                      Required Gold Coin
                    </Text>
                    <View style={styles.request}>
                      <TextInput
                        style={[
                          styles.input1,
                          {
                            fontSize: 17,
                            width: "50%",
                            alignSelf: "center",
                            textAlign: "center",
                            color: "black",
                          },
                        ]}
                        placeholderTextColor={"black"}
                        placeholder="Grams"
                        value={mobile}
                        keyboardType="number-pad"
                        onChangeText={handleChange}
                      />
                    </View>
                  
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <LinearGradient
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      colors={["#874701", "#874701", "#874701"]}
                      style={styles.linearGradientmodel}
                    >
                      <TouchableOpacity onPress={toggleModal}>
                        <Text style={{ color: "white", fontSize: 15, width: 50 }}>Cancel</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      colors={["#874701", "#874701", "#874701"]}
                      style={styles.linearGradientmodel}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          addRequest()
                        }}
                      >
                        <Text
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            color: "white",
                            fontSize: 15,
                            width: 80,
                          }}
                        >
                          Send request
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </Modal>
            </View>
           
          </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          
        </View>
      )}

      
      <ExitConfirmationModal
        isVisible={exitModalVisible}
        onClose={() => setExitModalVisible(false)}
        onConfirm={() => BackHandler.exitApp()}
      />
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "Poppins-SemiBoldItalic",
    backgroundColor: "#ffffff", // White background as requested
  },
  scrollContainer: {
    backgroundColor: "#f8f9fa", // Light grayish-white background similar to screenshot
  },
  image: {
    flex: 1,
  },
  loan: {
    width: "100%",
    padding: 10,
    // backgroundColor: '#2b2cd6',
  },
  content: {
    paddingTop: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  passage: {
    color: "#030712",
    fontSize: 22,
    // fontWeight: '500',
    fontFamily: "Poppins-SemiBoldItalic",
  },
  xyz: {
    paddingHorizontal: 14,
  },

  // Modern Quick Buy Interface Styles with Gold Colors
  quickBuyContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickBuyHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    marginBottom: 20,
    fontFamily: "Poppins-SemiBoldItalic",
  },
  goldTypeContainer: {
    flexDirection: "row",
    marginBottom: 25,
    gap: 8,
  },
  goldTypeTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedGoldTypeTab: {
    backgroundColor: "#f3d25b", // Changed from green to gold
    borderColor: "#f3d25b",
  },
  goldTypeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
    fontFamily: "Poppins-SemiBoldItalic",
  },
  selectedGoldTypeLabel: {
    color: "#874701", // Dark gold text on gold background
  },
  goldTypeSubtitle: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Poppins-SemiBoldItalic",
  },
  selectedGoldTypeSubtitle: {
    color: "#874701", // Dark gold text on gold background
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 15,
  },
  inputContainer: {
    flex: 1,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins-SemiBoldItalic",
  },
  inputIcon: {
    fontSize: 16,
    color: "#666",
  },
  rupeeSymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  modernInput: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16, // Reduced font size for better fit
    fontWeight: "600",
    color: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    textAlign: "center",
    minHeight: 50, // Ensure minimum height
    flex: 1, // Allow stretching
  },
  exchangeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  exchangeIcon: {
    fontSize: 20,
    color: "#666",
    transform: [{ rotate: "90deg" }],
  },
  gstText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-SemiBoldItalic",
  },
  buyNowButton: {
    backgroundColor: "#f3d25b", // Changed from green to gold
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buyNowText: {
    color: "#874701", // Dark gold text on gold background
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins-SemiBoldItalic",
  },

  // Original styles preserved
  swiperContainer: {
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  swiperImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  images1: {
    marginVertical: 5, // Increased margin to add spacing around the circle
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: 200,
    height: 150, // Increased height of the circle
    paddingVertical: 10, // Added padding inside the circle
  },
  input1: {
    height: 45,
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 6,
    color: "black",
    padding: 10,
    width: "94%",
    borderColor: "#874701",
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 30,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  linearGradientmodel: {
    height: 40,
    width: 100,
    borderRadius: 100,
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    textAlign: "center",
    backgroundColor: "#f3d25b",
    fontSize: 17,
    borderColor: "#f3d25b",
    borderWidth: 2,
    color: "black",
    fontWeight: "700",
    padding: 3,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 100,
    width: 200,
  },
  regback1: {
    // Add any missing styles for regback1 if needed
  },
  request: {
    // Add any missing styles for request container if needed
  },
  // Exit confirmation modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  exitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    minWidth: 100,
    alignItems: "center",
  },
  exitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  wrapper: {},
  dot: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: "#f3d25b",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
 */


import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
  Keyboard,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import RazorpayCheckout from "react-native-razorpay"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { Image } from "react-native-animatable"
import Modal from "react-native-modal"
import Swiper from "react-native-swiper"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Exit Confirmation Modal Component
const ExitConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Exit Application</Text>
          <Text style={styles.modalText}>Are You Sure Want To Exit?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#874701", "#874701", "#874701"]}
                style={styles.exitButton}
              >
                <Text style={styles.exitButtonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#f3d25b", "#f3d25b", "#f3d25b"]}
                style={styles.exitButton}
              >
                <Text style={[styles.exitButtonText, { color: "#000" }]}>Yes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

// Sell Modal Component
const SellModal = ({ isVisible, onClose, onConfirm, balance, mobile, setMobile, handleChange }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={styles.sellModalContainer}>
        <View style={styles.sellModalContent}>
          <Text style={styles.sellModalTitle}>Request</Text>

          <Text style={styles.sellBalanceDisplay}>{balance.toFixed(4)} Grams Available</Text>

          <Text style={styles.sellModalSubtitle}>Enter Grams to Request</Text>

          <TextInput
            style={styles.sellInput}
            placeholderTextColor={"#666"}
            placeholder="Enter grams"
            value={mobile}
            keyboardType="number-pad"
            onChangeText={handleChange}
          />

          <View style={styles.sellButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#666", "#666", "#666"]}
                style={styles.sellButton}
              >
                <Text style={styles.sellButtonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#005801", "#005801", "#005801"]}
                style={styles.sellButton}
              >
                <Text style={styles.sellButtonText}>Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

function Home() {
  const navigation = useNavigation("")
  const [loading, setLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [sellModalVisible, setSellModalVisible] = useState(false)
  const [exitModalVisible, setExitModalVisible] = useState(false)
  const [selectedGoldType, setSelectedGoldType] = useState(0)
  const [gold, setgold] = useState("")
  const [Amount, setamount] = useState("")
  const [rate, setRate] = useState([])
  const [objRate, setObjRate] = useState({})
  const [goldRate, setGoldRate] = useState(0)
  const [data, setData] = useState({})
  const [alltransiction, setAlltransiction] = useState([])
  const [allcoin, setallcoin] = useState([])
  const [video, setvideo] = useState([])
  const [user, setUser] = useState(null)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  // Get safe area insets for proper spacing
  const insets = useSafeAreaInsets()

  // Handle back button press ONLY when this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setExitModalVisible(true)
        return true
      }

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

      return () => backHandler.remove()
    }, []),
  )

  useFocusEffect(
    React.useCallback(() => {
      const setStatusBar = () => {
        StatusBar.setBackgroundColor("#005801", true)
        StatusBar.setBarStyle("light-content", true)
      }

      setStatusBar()
      const timeoutId = setTimeout(setStatusBar, 100)

      return () => {
        clearTimeout(timeoutId)
      }
    }, []),
  )

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData()
      if (!isInitialLoad) {
        refreshDataSilently()
      }
    }, [isInitialLoad]),
  )

  // Fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    getRate()
    getGst()
    getVideo()
    fetchUserData()
    getCoins()
    userTransaction()
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidHideListener?.remove()
      keyboardDidShowListener?.remove()
    }
  }, [])

  // Get Gst
  const getGst = async () => {
    const config = {
      url: "/getGst",
      method: "get",
      baseURL: "https://justbuynewbackend.onrender.com/api/v1/gst",
      headers: { "conttent-type": "application/json" },
    }
    try {
      const result = await axios(config)
      if (result.status === 200) {
        setData(result.data.success)
        setLoading(true)
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get all transiction
  const userTransaction = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    try {
      await axios
        .get("https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/" + user?._id)
        .then((res) => {
          if (res.status == 200) {
            console.log("idddddddddddddddddddddddddddddddddddddddddd", user?._id)
            setAlltransiction(res.data.success)
            if (isInitialLoad) {
              setLoading(true)
            }
          } else {
            console.log(res.error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getCoins = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      const parsedUser = JSON.parse(storedUser)

      if (isInitialLoad) {
        setLoading(false)
      }

      const res = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/${parsedUser?._id}`)

      if (res.status === 200) {
        setallcoin(res.data.success)
      } else {
        console.log(res.error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      if (isInitialLoad) {
        setLoading(true)
        setIsInitialLoad(false)
      }
    }
  }

  // Get Gold Rate
  const getRate = async () => {
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/rate/allrate").then((res) => {
        if (res.status === 200) {
          setRate(res.data.success)
          setObjRate(res.data?.success[0])
          setGoldRate(res.data?.success[0]?.rate)
          setLoading(true)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Total Gst
  const NewGst = data?.Sgst + data?.Cgst

  // Get Video
  const getVideo = async () => {
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/video/allvideo").then((res) => {
        if (res.status === 200) {
          setvideo(res.data.success)
          setLoading(true)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error.success)
    }
  }

  // All transicition
  const transicitionData = alltransiction?.reduce((a, i) => a + Number(i?.gold), 0)
  const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0)

  console.log("coinsdata.................................", coinsData)
  console.log("transicitionData.................................", transicitionData)

  // Total Store gold
  const totalgoldStore = transicitionData - coinsData

  // Static data for remaining options (2nd and 3rd)
  const staticMetalData = [
    {
      id: 2,
      name: "Gold",
      purity: "22k-916",
      rate: 0.0,
      balance: 0.0,
    },
    {
      id: 3,
      name: "Silver",
      purity: "24k-995",
      rate: 0.0,
      balance: 0.0,
    },
  ]

  // Combine backend data (first) with static data (remaining)
  const getAllMetalData = () => {
    if (rate.length > 0) {
      const backendFirst = {
        id: 1,
        name: "Gold",
        purity: `${rate[0]?.name}k-${rate[0]?.purity || "999"}`,
        rate: rate[0]?.rate || 0,
        balance: transicitionData - coinsData || 0,
      }
      return [backendFirst, ...staticMetalData]
    }
    return staticMetalData
  }

  const metalData = getAllMetalData()

  // Sell functionality
  const [mobile, setMobile] = useState("")

  const handleChange = (mobile) => {
    const formattedMobile = mobile.replace(/[^0-9]/g, "")
    if (formattedMobile !== mobile) {
      Alert.alert("Only numbers are allowed")
    }
    setMobile(formattedMobile)
  }

  const sellGold = async () => {
    if (!mobile) return Alert.alert("Enter grams to sell")
    if (mobile < 1) return Alert.alert("Please enter more than 1 gram")
    if (mobile > totalgoldStore) return Alert.alert("Don't have sufficient gold in your balance")

    try {
      const config = {
        url: "/addCoins",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/coins",
        headers: { "content-type": "application/json" },
        data: {
          UserId: user?._id,
          username: user?.name,
          email: user?.email,
          usphone: user?.phoneno,
          phone: user?.phoneno,
          coins: Number(mobile),
        },
      }
      const res = await axios(config)
      if (res.status === 200) {
        setSellModalVisible(false)
        Alert.alert("Request Sent Successfully")
        setamount("0")
        setgold("0")
        setMobile("0")
        getCoins()
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Total calculation
  const [gramCompleted, setGramCompleted] = useState(false)

  // Get current gold type multiplier from your rate data
  const getCurrentMultiplier = () => {
    if (selectedGoldType === 0 && rate.length > 0) {
      return rate[0].multiplier || 1
    }
    return 1
  }

  // FIXED: Calculate grams from amount (GST inclusive)
  const calculateGrams = (inputAmount) => {
    setamount(inputAmount)
    if (inputAmount && inputAmount !== "0" && selectedGoldType !== null && metalData.length > 0) {
      const selectedMetal = metalData[selectedGoldType]
      const multiplier = getCurrentMultiplier()
      const adjustedPrice = selectedMetal.rate * multiplier

      // Calculate base amount (amount without GST)
      const baseAmount = (Number.parseFloat(inputAmount) * 100) / (100 + NewGst)

      // Calculate grams from base amount
      const calculatedGrams = (baseAmount / adjustedPrice).toFixed(4)
      setgold(calculatedGrams)
    } else {
      setgold("0")
    }
  }

  // FIXED: Calculate amount from grams (GST inclusive)
  const calculateAmount = (inputGrams) => {
    setgold(inputGrams)
    if (inputGrams && inputGrams !== "0" && selectedGoldType !== null && metalData.length > 0) {
      const selectedMetal = metalData[selectedGoldType]
      const multiplier = getCurrentMultiplier()
      const adjustedPrice = selectedMetal.rate * multiplier

      // Calculate base amount (without GST)
      const baseAmount = Number.parseFloat(inputGrams) * adjustedPrice

      // Add GST to get final amount
      const finalAmount = (baseAmount * (100 + NewGst)) / 100

      setamount(finalAmount.toFixed(2))
    } else {
      setamount("0")
    }
  }

  // Update selected metal when type changes
  useEffect(() => {
    if (selectedGoldType !== null && metalData.length > 0) {
      if (selectedGoldType === 0 && rate.length > 0) {
        setObjRate(rate[0])
        setGoldRate(rate[0].rate)
      } else {
        const staticIndex = selectedGoldType - 1
        if (staticIndex >= 0 && staticIndex < staticMetalData.length) {
          setObjRate(staticMetalData[staticIndex])
          setGoldRate(staticMetalData[staticIndex].rate)
        }
      }

      if (gold) {
        calculateAmount(gold)
      } else if (Amount) {
        calculateGrams(Amount)
      }
    }
  }, [selectedGoldType, rate, transicitionData, coinsData])

  useEffect(() => {
    if (Object.keys(data).length != 0 && Object.keys(objRate).length != 0) {
      const NewGst1 = data?.Sgst + data?.Cgst
    }
  }, [objRate])

  // Reset calculations when gold type changes
  useEffect(() => {
    setgold("0")
    setamount("0")
  }, [selectedGoldType])

  // Transaction
  const [paymentid, setpaymentId] = useState("")
  const placeorder = async (paymentid) => {
    try {
      const config = {
        url: "/transaction",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/transactions",
        headers: { "content-type": "application/json" },
        data: {
          UserId: user?._id,
          amount: Amount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: totalgoldStore - Number(gold),
        },
      }
      await axios(config).then(async (res) => {
        if (res.status === 200) {
          Alert.alert("Successfully")
          await userTransaction()
          await getCoins()
          navigation.navigate("Home1")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const isDisabled = !Amount || !gold

  // react-native-razorpay
  const posttransaction = async () => {
    if (!validateAmount(Amount)) {
      return
    }

    try {
      var options = {
        key: "rzp_test_FAe0X6xLYXaXHe",
        amount: Amount * 100,
        currency: "INR",
        name: "JustBuyGold",
        description: "Order Amount",
        image: "./assets/images/newlogo.png",
        customerId: user?._id,
        handler: (response) => {
          setpaymentId(response.razorpay_payment_id)
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneno,
        },
        theme: { color: "#F37254" },
      }
      RazorpayCheckout.open(options)
        .then((data) => {
          Alert.alert(`Success: ${data.razorpay_payment_id}`)
          placeorder(data.razorpay_payment_id)
          setamount("0")
          setgold("0")
        })
        .catch((error) => {
          Alert.alert(`Error: ${error.code} | ${error.description}`)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // Validation function for amount
  const validateAmount = (amount) => {
    const numAmount = Number(amount)
    if (numAmount < 100) {
      Alert.alert("Minimum Amount", "Amount should be at least ₹100")
      return false
    } else if (numAmount > 200000) {
      Alert.alert("Maximum Amount", "Amount should not exceed ₹2,00,000")
      return false
    }
    return true
  }

  // Action buttons for quick actions
  const actionButtons = [
    {
      name: "Redeem",
      icon: "card-giftcard",
      color: "#005801",
      action: () => Alert.alert("Redeem", "Redeem feature coming soon!"),
    },
    {
      name: "Request",
      icon: "shopping-cart",
      color: "#005801",
      action: () => {
        if (totalgoldStore >= 1) {
          setSellModalVisible(true)
        } else {
          Alert.alert("Insufficient Balance", "You need at least 1 gram to sell")
        }
      },
    },
    {
      name: "Savings Plan",
      icon: "account-balance-wallet",
      color: "#005801",
      action: () => Alert.alert("Savings Plan", "Savings Plan feature coming soon!"),
    },
    {
      name: "Look Book",
      icon: "book",
      color: "#005801",
      action: () => Alert.alert("Look Book", "Look Book feature coming soon!"),
    },
    {
      name: "Deposit Plan",
      icon: "timeline",
      color: "#005801",
      action: () => Alert.alert("Deposit Plan", "Deposit Plan feature coming soon!"),
    },
  ]

  const carouselImages = [require("../../assets/images/g9.png"), require("../../assets/images/g9.png")]

  const refreshDataSilently = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      const parsedUser = JSON.parse(storedUser)

      const coinsRes = await axios.get(
        `https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/${parsedUser?._id}`,
      )
      if (coinsRes.status === 200) {
        setallcoin(coinsRes.data.success)
      }

      const transRes = await axios.get(
        "https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/" + parsedUser?._id,
      )
      if (transRes.status === 200) {
        setAlltransiction(transRes.data.success)
      }
    } catch (error) {
      console.log("Silent refresh error:", error)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {loading ? (
        <>
          <View style={styles.container}>
            {/* Greeting Section */}
            <View style={[styles.greetingContainer, { paddingTop: Math.max(insets.top, 10) }]}>
              <View style={styles.greetingMainContent}>
                <View style={styles.greetingLeftContent}>
                  <View style={styles.greetingContent}>
                    <Text style={styles.helloText}>Hello</Text>
                    <Text style={styles.handIcon}>👋 </Text>
                  </View>
                  <Text style={styles.usernameText}>{user?.name || "User"} !</Text>
                </View>

                {/* G5 Image on top right */}
                <View style={styles.greetingRightContent}>
                  <Image source={require("../../assets/images/g5.png")} style={styles.g5Image} />
                </View>
              </View>
            </View>

           <ScrollView
  style={styles.scrollContainer}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={[
    styles.scrollContentContainer,
    { 
      paddingBottom: isKeyboardVisible 
        ? 5  // Minimal padding when keyboard is visible
        : Math.max(insets.bottom, 15) + 50  // Reduced padding when keyboard is hidden
    }
  ]}
>
              {/* Carousel Images Section */}
              <View style={styles.swiperContainer}>
                <Swiper
                  style={styles.wrapper}
                  showsButtons={false}
                  autoplay
                  autoplayTimeout={3}
                  dotStyle={styles.dot}
                  activeDotStyle={styles.activeDot}
                >
                  {carouselImages.map((image, index) => (
                    <View key={index} style={styles.slide}>
                      <Image source={image} resizeMode="cover" style={styles.swiperImage} />
                    </View>
                  ))}
                </Swiper>
              </View>

              {/* Balance Section - Fixed Grid Layout */}
              <View style={styles.balanceMainContainer}>
                <View style={styles.balanceContainer}>
                  <View style={styles.balanceGrid}>
                    {/* Header Row with Coins and Metal Names */}
                    <View style={styles.balanceHeaderRow}>
                      <View style={styles.headerLabelColumn}>{/* Empty space for alignment */}</View>

                      <View style={styles.metalColumnsContainer}>
                        {/* Gold 24k Column */}
                        <View style={styles.metalColumn}>
                          <Image source={require("../../assets/images/start.png")} style={styles.goldCoin} />
                          <Text style={styles.metalName}>Gold</Text>
                          <Text style={styles.purityText}>24k-999</Text>
                        </View>

                        {/* Gold 22k Column */}
                        <View style={styles.metalColumn}>
                          <Image source={require("../../assets/images/start.png")} style={styles.goldCoin} />
                          <Text style={styles.metalName}>Gold</Text>
                          <Text style={styles.purityText}>22k-916</Text>
                        </View>

                        {/* Silver Column */}
                        <View style={styles.metalColumn}>
                          <Image source={require("../../assets/images/silver.png")} style={styles.silverCoin} />
                          <Text style={styles.metalName}>Silver</Text>
                          <Text style={styles.purityText}>24k-995</Text>
                        </View>
                      </View>
                    </View>

                    {/* Balance in gms Row */}
                    <View style={styles.balanceDataRow}>
                      <View style={styles.rowLabel}>
                        <Text style={styles.rowLabelText}>Balance{"\n"}in gms</Text>
                      </View>

                      <View style={styles.metalColumnsContainer}>
                        {/* Gold 24k Balance */}
                        <View style={styles.valueCell}>
                          <Text style={styles.valueCellText}>
                            {rate.length > 0 ? (transicitionData - coinsData || 0).toFixed(4) : "0.0000"}
                          </Text>
                        </View>

                        {/* Gold 22k Balance */}
                        <View style={styles.valueCell}>
                          <Text style={styles.valueCellText}>0.0000</Text>
                        </View>

                        {/* Silver Balance */}
                        <View style={styles.valueCell}>
                          <Text style={styles.valueCellText}>0.0000</Text>
                        </View>
                      </View>
                    </View>

                    {/* Current rate Row */}
                    <View style={styles.balanceDataRow}>
                      <View style={styles.rowLabel}>
                        <Text style={styles.rowLabelText}>Current{"\n"}rate(₹)/gm</Text>
                      </View>

                      <View style={styles.metalColumnsContainer}>
                        {/* Gold 24k Rate */}
                        <View style={styles.valueCell}>
                          <Text style={styles.valueCellText}>
                            {rate.length > 0 ? (rate[0]?.rate || 0).toLocaleString() : "11,266.0"}
                          </Text>
                        </View>

                        {/* Gold 22k Rate */}
                        <View style={styles.valueCell}>
                          <Text style={styles.valueCellText}>0</Text>
                        </View>

                        {/* Silver Rate */}
                        <View style={styles.valueCell}>
                          <Text style={styles.valueCellText}>0</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* GST Text */}
                  <Text style={styles.gstText}>Rates are exclusive of GST</Text>
                </View>
              </View>

              {/* Quick Buy Section */}
              <View style={styles.quickBuyContainer}>
                <Text style={styles.quickBuyHeader}>Quick Buy</Text>

                {/* Metal Type Selector */}
                <View style={styles.metalTypeContainer}>
                  {metalData.map((metal, index) => (
                    <TouchableOpacity
                      key={metal.id}
                      style={[styles.metalTypeTab, selectedGoldType === index && styles.selectedMetalTypeTab]}
                      onPress={() => setSelectedGoldType(index)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[styles.metalTypeLabel, selectedGoldType === index && styles.selectedMetalTypeLabel]}
                      >
                        {metal.name}
                      </Text>
                      <Text
                        style={[
                          styles.metalTypeSubtitle,
                          selectedGoldType === index && styles.selectedMetalTypeSubtitle,
                        ]}
                      >
                        {metal.purity}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Input Section */}
                <View style={styles.inputSection}>
                  {/* Grams Input */}
                  <View style={styles.inputContainer}>
                    <View style={styles.inputHeader}>
                      <View style={styles.spacer} />
                      <Text style={styles.inputLabel}>Grams</Text>
                      <FontAwesome name="balance-scale" style={styles.inputIcon} />
                    </View>
                    <TextInput
                      style={styles.modernInput}
                      placeholder="0"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={gold === "0" ? "" : gold}
                      onChangeText={calculateAmount}
                      onFocus={() => setKeyboardVisible(true)}
                      onBlur={() => setKeyboardVisible(false)}
                    />
                  </View>

                  {/* Exchange Icon */}
                  <View style={styles.exchangeContainer}>
                    <FontAwesome name="exchange" style={styles.exchangeIcon} />
                  </View>

                  {/* Amount Input */}
                  <View style={styles.inputContainer}>
                    <View style={styles.inputHeader}>
                      <View style={styles.spacer} />
                      <Text style={styles.inputLabel}>Amount</Text>
                      <Text style={styles.rupeeSymbol}>₹</Text>
                    </View>
                    <TextInput
                      style={styles.modernInput}
                      placeholder="0"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={Amount === "0" || Amount === "0.00" ? "" : Amount}
                      onChangeText={calculateGrams}
                      onFocus={() => setKeyboardVisible(true)}
                      onBlur={() => setKeyboardVisible(false)}
                    />
                  </View>
                </View>

                {/* GST Included Text */}
                <Text style={styles.gstIncludedText}>GST Included</Text>

                {/* Buy Now Button */}
                <TouchableOpacity
                  onPress={() => {
                    if (selectedGoldType === 0 && !isDisabled) {
                      if (validateAmount(Amount)) {
                        navigation.navigate("Pay", {
                          Amount,
                          gold,
                          goldRate: metalData[selectedGoldType]?.rate || 0,
                        })
                      }
                    }
                  }}
                  disabled={isDisabled || selectedGoldType !== 0}
                  style={[styles.buyNowButton, { opacity: isDisabled || selectedGoldType !== 0 ? 0.3 : 1 }]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buyNowText}>{selectedGoldType === 0 ? "Buy Now" : "Coming Soon"}</Text>
                </TouchableOpacity>
              </View>

              {/* Quick Actions Section - Individual Cards */}
              <View style={styles.actionsContainer}>
                <View style={styles.actionsGrid}>
                  {actionButtons.map((action, index) => (
                    <TouchableOpacity key={index} style={styles.actionItem} onPress={action.action} activeOpacity={0.7}>
                      <View style={styles.actionCard}>
                        <View style={[styles.actionCardIcon, { backgroundColor: action.color }]}>
                          <MaterialIcons name={action.icon} size={20} color="white" />
                        </View>
                      </View>
                      <Text style={styles.actionCardText}>{action.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Sell Modal */}
            <SellModal
              isVisible={sellModalVisible}
              onClose={() => setSellModalVisible(false)}
              onConfirm={sellGold}
              balance={totalgoldStore || 0}
              mobile={mobile}
              setMobile={setMobile}
              handleChange={handleChange}
            />
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Exit Confirmation Modal */}
      <ExitConfirmationModal
        isVisible={exitModalVisible}
        onClose={() => setExitModalVisible(false)}
        onConfirm={() => BackHandler.exitApp()}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  // SafeAreaView container - CRITICAL for proper display
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#005801", // Match the green header color
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  // NEW: Content container for proper spacing
  scrollContentContainer: {
    flexGrow: 1,
  },
  // Loading container with proper centering
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },

  // Greeting Styles - Updated for SafeAreaView
  greetingContainer: {
    backgroundColor: "#005801",
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: "flex-end",
    minHeight: 80,
  },
  greetingMainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  greetingLeftContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  greetingContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  helloText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
  },
  handIcon: {
    fontSize: 26,
    color: "#FFD700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  usernameText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "500",
    marginTop: -8,
  },
  greetingRightContent: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  g5Image: {
    width: 220,
    height: 100,
    resizeMode: "contain",
    marginBottom: -40,
  },

  // Carousel Styles
  swiperContainer: {
    height: 180,
    marginTop: 15,
    marginBottom: 18,
    marginHorizontal: 15,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    backgroundColor: "#fff",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  swiperImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: "#FFD700",
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginLeft: 3,
    marginRight: 3,
  },

  // Balance Section - Fixed Grid Layout
  balanceMainContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  balanceContainer: {
    backgroundColor: "#D6DBE6",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#D6DBE6",
  },

  // Fixed grid layout
  balanceGrid: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D6DBE6",
  },

  // Header row with labels
  balanceHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  headerLabelColumn: {
    width: 70,
    paddingRight: 8,
  },

  headerLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
  },

  // Metal columns in fixed grid
  metalColumnsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },

  metalColumn: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 2,
  },

  metalColumnHeader: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },

  // Coin styles - smaller for fixed layout
  goldCoin: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFA500",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  silverCoin: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#B8B8B8",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  coinText: {
    fontSize: 6,
    fontWeight: "bold",
    color: "#8B4513",
    textAlign: "center",
  },
  coinTextSilver: {
    fontSize: 6,
    fontWeight: "bold",
    color: "#2F4F4F",
    textAlign: "center",
  },

  metalName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },

  purityText: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 6,
  },

  // Data rows
  balanceDataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  rowLabel: {
    width: 70,
    paddingRight: 8,
  },

  rowLabelText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
    lineHeight: 13,
  },

  // Value cells in fixed grid
  valueCell: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },

  valueCellText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },

  gstText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 5,
  },

  // Quick Buy Section - Optimized
  quickBuyContainer: {
    backgroundColor: "#D6DBE6",
    borderRadius: 16,
    margin: 15,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickBuyHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  metalTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 6,
  },
  metalTypeTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedMetalTypeTab: {
    backgroundColor: "#005801",
    borderColor: "#005801",
  },
  metalTypeLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
  },
  selectedMetalTypeLabel: {
    color: "white",
  },
  metalTypeSubtitle: {
    fontSize: 11,
    color: "#999",
  },
  selectedMetalTypeSubtitle: {
    color: "white",
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
    justifyContent: "center",
  },
  spacer: {},
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  inputIcon: {
    fontSize: 15,
    color: "#666",
  },
  rupeeSymbol: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  modernInput: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    textAlign: "center",
    minHeight: 45,
  },
  exchangeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  exchangeIcon: {
    fontSize: 18,
    color: "#666",
  },
  gstIncludedText: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginBottom: 16,
  },
  buyNowButton: {
    backgroundColor: "#005801",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buyNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  // Quick Actions Section - Enhanced with proper spacing
  actionsContainer: {
    marginHorizontal: 15,
    marginBottom: 20, // Increased bottom margin for better spacing
  },

  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  actionItem: {
    alignItems: "center",
    width: "18.5%",
  },

  actionCard: {
    backgroundColor: "#D6DBE6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 8,
  },

  actionCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  actionCardText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    lineHeight: 12,
  },

  // Sell Modal Styles - Optimized
  sellModalContainer: {
    backgroundColor: "#D6DBE6",
    borderRadius: 15,
    margin: 20,
    padding: 22,
  },
  sellModalContent: {
    alignItems: "center",
  },
  sellModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 18,
  },
  sellBalanceDisplay: {
    fontSize: 17,
    fontWeight: "600",
    backgroundColor: "#D6DBE6",
    borderColor: "#005801",
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    textAlign: "center",
    marginBottom: 18,
    minWidth: 230,
    color: "#333",
  },
  sellModalSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  sellInput: {
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    color: "#333",
    padding: 12,
    borderColor: "#005801",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    fontSize: 15,
    minWidth: 230,
    marginBottom: 20,
  },
  sellButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  sellButton: {
    height: 42,
    paddingHorizontal: 22,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
  sellButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  // Exit Modal Styles - Optimized
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginBottom: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  exitButton: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 100,
    minWidth: 90,
    alignItems: "center",
  },
  exitButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
})
