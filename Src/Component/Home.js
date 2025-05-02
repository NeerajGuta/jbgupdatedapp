import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
// import video from '../../assets/images/video.mp4';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-animatable';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';

function Home() {
  const navigation = useNavigation('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Get Gst+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [data, setData] = useState({});
  const getGst = async () => {
    const config = {
      url: '/getGst',
      method: 'get',
      baseURL: 'https://justbuygold.co.in/api/v1/gst',
      headers: {'conttent-type': 'application/json'},
    };
    try {
      const result = await axios(config);
      if (result.status === 200) {
        setData(result.data.success);
        setLoading(true);
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all transiction---
  const [alltransiction, setAlltransiction] = useState([]);
  // console.log('History', alltransiction);
  const userTransaction = async _id => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    try {
      await axios
        .get(
          'https://justbuygold.co.in/api/v1/transactions/transactionhistory/' +
            user?._id,
        )
        .then(res => {
          if (res.status == 200) {
            console.log(
              'idddddddddddddddddddddddddddddddddddddddddd',
              user?._id,
            );
            setAlltransiction(res.data.success);
            // console.log(res.data.success);
            setLoading(true);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  //

  const [allcoin, setallcoin] = useState([]);
  const getCoins = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(storedUser);

      setLoading(false); // Start loading before fetching
      const res = await axios.get(
        `https://justbuygold.co.in/api/v1/coins/singalcoins/${parsedUser?._id}`,
      );

      if (res.status === 200) {
        setallcoin(res.data.success);
        // console.log(res.data.success);
      } else {
        console.log(res.error);
        // Alert.alert('Error', 'Failed to fetch coins data.');
      }
    } catch (error) {
      console.log(error);
      // Alert.alert('Error', 'An error occurred while fetching coins data.');
    } finally {
      setLoading(true); // Stop loading after fetching
    }
  };

  // Get Gold Rate+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [gold, setgold] = useState();
  const [Amount, setamount] = useState();
  // console.log(Amount, '₹');
  const [rate, setRate] = useState([]);
  const [objRate, setObjRate] = useState({});
  const [goldRate, setGoldRate] = useState(0);
  // console.log(objRate, 'objRate>>>>>>>>>>>>>>>>...');
  const getRate = async () => {
    try {
      await axios
        .get('https://justbuygold.co.in/api/v1/rate/allrate')
        .then(res => {
          if (res.status === 200) {
            setRate(res.data.success);
            setObjRate(res.data?.success[0]);
            setGoldRate(res.data?.success[0]?.rate);
            setLoading(true);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('rate:', rate, 'objrate:', objRate);
  // Total Gst++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  let NewGst = data?.Sgst + data?.Cgst;

  // Get Video++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [video, setvideo] = useState([]);
  const getVideo = async () => {
    try {
      await axios
        .get('https://justbuygold.co.in/api/v1/video/allvideo')
        .then(res => {
          if (res.status === 200) {
            setvideo(res.data.success);
            setLoading(true);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error.success);
    }
  };

  // Get User++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [user, setUser] = useState('');
  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };

  useEffect(() => {
    getRate();
    getGst();
    getVideo();
    userData();
    getCoins();
    userTransaction();
  }, []);

  // All transicition
  const transicitionData = alltransiction?.reduce(
    (a, i) => a + Number(i?.gold),
    0,
  );
  // console.log('transicitionData', transicitionData);

  // All gold Store
  // const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

  const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);

  console.log('coinsdata.................................', coinsData);
  console.log(
    'transicitionData.................................',
    transicitionData,
  );

  // console.log(allcoin, 'coinsData');
  // Total Store gold
  const totalgoldStore = transicitionData - coinsData;
  // console.log('Total gold Store', totalgoldStore);

  // AddCoinsRequest+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [mobile, setMobile] = useState('');

  const handleChange = mobile => {
    const formattedMobile = mobile.replace(/[^0-9]/g, '');
    if (formattedMobile !== mobile) {
      Alert.alert('Only numbers are allowed');
    }
    setMobile(formattedMobile);
  };

  const addRequest = async () => {
    if (!mobile) return Alert.alert('Enter required gold coins');
    if (mobile < 1) return Alert.alert('Please enter more than 1 gram');
    if (mobile > totalgoldStore)
      return Alert.alert("Don't have sufficent gold in your pocket");
    try {
      const config = {
        url: '/addCoins',
        method: 'post',
        baseURL: 'https://justbuygold.co.in/api/v1/coins',
        headers: {'content-type': 'application/json'},
        data: {
          UserId: user?._id,
          username: user?.name,
          email: user?.email,
          usphone: user?.phoneno,
          phone: user?.phoneno,
          coins: Number(mobile), // This sends the required amount
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);
        toggleModal();
        Alert.alert('Request Sent');
        setamount('');
        setgold('');
        setMobile('');
        getCoins();
      } else {
        Alert.alert('Something Wrong ');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Total calculation++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [gramCompleted, setGramCompleted] = useState(false);
  const calculate = (price, Amount) => {
    let ab = Number(Amount) / Number(price);
    let gst = 100 / (100 + NewGst);
    amt = ab * gst;
    // console.log('rvejvf', Number(ab), Amount);
    setgold(amt?.toFixed(4));
    // setgold(Number(ab));
    setGramCompleted(Number.isInteger(ab));

    setamount(Amount);
  };
  // console.log('Amount', Number(Amount));

  const calculate2 = (price, gold) => {
    // console.log('price:', price, 'gold:', gold);
    setgold(gold);
    let ab = Number(gold) * Number(price);
    setamount(ab?.toFixed(2));
    setGramCompleted(Number.isInteger(gold));
    // console.log('price:', price, 'gold:', gold, 'Amount:', Amount);
  };

  useEffect(() => {
    if (Object.keys(data).length != 0 && Object.keys(objRate).length != 0) {
      let NewGst1 = data?.Sgst + data?.Cgst;
      // setamount(
      //   (
      //     Number(objRate.rate) +
      //     (objRate.rate * (NewGst1 + objRate?.percentage)) / 100
      //   )?.toFixed(3),
      // );
    }
  }, [objRate]);

  // useEffect(() => {
  //   if (gold >= 1 && totalgoldStore) {
  //     setGramCompleted(true);
  //   } else {
  //     setGramCompleted(false);
  //   }
  // }, [gold]);

  // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [paymentid, setpaymentId] = useState('');
  const placeorder = async paymentid => {
    try {
      const config = {
        url: '/transaction',
        method: 'post',
        baseURL: 'https://justbuygold.co.in/api/v1/transactions',
        headers: {'content-type': 'application/json'},
        data: {
          UserId: user?._id,
          amount: Amount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: totalgoldStore - Number(gold), // Corrected calculation
        },
      };
      // console.log('user', user._id, Amount, gold);
      await axios(config).then(async function (res) {
        if (res.status === 200) {
          // console.log('success');
          Alert.alert('Successfully');
          await userTransaction(); // Ensure transactions are refreshed
          await getCoins(); // Refresh coins data
          navigation.navigate('Home1');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isDisabled = !Amount || !gold;
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
  //       baseURL: 'https://justbuygold.co.in/api/v1/transactions',
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
    try {
      var options = {
        key: 'rzp_test_FAe0X6xLYXaXHe',
        amount: Amount * 100,
        // amount: '500',
        currency: 'INR',
        name: 'JustBuyGold',
        description: 'Order Amount',
        image: './assets/images/app-logo.jpg',
        customerId: user?._id,
        handler: function (response) {
          // Alert.alert(response.razorpay_payment_id);
          setpaymentId(response.razorpay_payment_id);
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneno,
        },
        theme: {color: '#F37254'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          // handle success
          Alert.alert(`Success: ${data.razorpay_payment_id}`);
          placeorder(data.razorpay_payment_id);
          setamount('');
          setgold('');
        })
        .catch(error => {
          // handle failure
          Alert.alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <View style={styles.container}>
            <StatusBar backgroundColor="#2b2cd6" barStyle="light-content" />

            <ScrollView
              style={{
                backgroundColor: '#2b2cd6',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingTop: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: '#2b2cd6',
                }}>
                <Image
                  source={require('../../assets/images/jbg.png')}
                  style={{height: 80, width: 80}}
                />
                <Image
                  source={require('../../assets/images/g5.png')}
                  style={{height: 35, width: 250, objectFit: 'contain'}}
                />
                {/* <Text
                style={{
                  color: '#FFD700',
                  fontSize: 25,
                  fontWeight: '600',
                }}>
                Just Buy Gold
              </Text> */}
              </View>
              {rate?.slice(0, 1)?.map((ele, index) => {
                // console.log('rate', ele.rate);
                return (
                  <View style={styles.loan}>
                    {/* with gst {NewGst} % */}
                    {/* G = (15/100) * 115 = $17.25 */}

                    {/* <View style={styles.content} key={ele?._id}>
                        <Text style={[styles.passage, {fontSize: 20}]}>
                          Gold Rate
                        </Text>
                        <Text style={styles.passage}>
                          ₹{Number(ele.rate)?.toFixed(3)} / gm
                        </Text>
                      </View> */}

                    <View style={styles.items}>
                      <View
                        style={{
                          marginHorizontal: 30,
                          marginVertical: 20,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          gap: 10,
                          padding: 4,
                          borderWidth: 2,
                          height: 85,
                          borderColor: '#2b2cd6',
                          borderRadius: 23,
                          paddingHorizontal: 30,
                        }}>
                        <View
                          style={{
                            marginHorizontal: 30,
                            // marginVertical: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 20,
                            padding: 4,
                            borderWidth: 2,
                            height: 75,
                            borderColor: '#2b2cd6',
                            borderRadius: 13,
                          }}>
                          <View style={styles.chipContainer}>
                            <Text style={styles.chip}>Gold</Text>
                            <Text style={styles.chip}>{ele?.name}k</Text>
                            <Text style={styles.chip}>999</Text>
                          </View>
                        </View>
                        {/* <Text style={styles.chip}>999</Text> */}
                      </View>
                      <View style={styles.itemicon}>
                        <TextInput
                          style={styles.input}
                          placeholder={gold ? `${gold} Grams` : 'Grams'}
                          placeholderTextColor="#f3d25b"
                          keyboardType="number-pad"
                          value={gold}
                          onChangeText={gold =>
                            calculate2(
                              // ele.rate*gold + NewGst*ele.rate*gold/100,
                              (ele.rate * (100 + NewGst)) / 100,
                              gold,
                            )
                          }
                        />
                        {/* (Number(ele.rate) +(ele.rate * (NewGst + ele?.percentage)) / 100) */}
                        {/* <TextInput
                            style={styles.input}
                            placeholder={gold ? `${gold} Grams` : 'Grams'}
                            placeholderTextColor="#f3d25b"
                            keyboardType="number-pad"
                            value={gold}
                            onChangeText={newGold => {
                              setgold(newGold); // Assuming you use useState or a similar hook
                              if (!newGold) {
                                setamount(''); // Reset Amount when gold is emptied
                              } else {
                                calculate2(
                                  Number(ele.rate) +
                                    (ele.rate * (NewGst + ele?.percentage)) /
                                      100,
                                  newGold,
                                );
                              }
                            }}
                          /> */}
                        <Text>
                          <FontAwesome name="exchange" style={styles.icons} />
                        </Text>
                        {/* <TextInput
                        style={styles.input}
                        placeholder={Amount ? `${Amount} Amount` : 'Amount'}
                        placeholderTextColor="#f3d25b"
                        keyboardType="number-pad"
                        value={Amount}
                        onChangeText={Amount =>
                          calculate(
                            Number(ele.rate) +
                              (ele.rate * (NewGst + ele?.percentage)) / 100,
                            Amount,
                          )
                        }
                      /> */}
                        <TextInput
                          style={styles.input}
                          placeholder={Amount ? `${Amount} Amount` : 'Amount'}
                          placeholderTextColor="#f3d25b"
                          keyboardType="number-pad"
                          value={Amount}
                          onChangeText={newAmount => {
                            setamount(newAmount); // Update the Amount state
                            if (!newAmount) {
                              setgold(''); // Optionally reset gold when Amount is cleared
                            } else {
                              calculate(ele.rate, newAmount);
                            }
                          }}
                        />
                        {/* Number(ele.rate) +
                                    (ele.rate * (NewGst + ele?.percentage)) /
                                      100, */}
                      </View>
                    </View>
                  </View>
                );
              })}
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -35,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (!isDisabled) {
                      navigation.navigate('Pay', {
                        Amount,
                        gold,
                        goldRate,
                      });
                    }
                  }}
                  disabled={isDisabled}
                  style={{opacity: isDisabled ? 0.5 : 1}}
                  // onPress={posttransaction}
                  //  onPress={postTransaction}
                >
                  <ImageBackground
                    source={require('../../assets/images/buybg.png')}
                    style={{height: 50, width: 300}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 25,
                        fontFamily: 'Poppins-SemiBoldItalic',
                        alignSelf: 'center',
                        zIndex: 999,
                        fontWeight: '1000',
                      }}>
                      Buy
                    </Text>
                  </ImageBackground>

                  {/* <LinearGradient
                  start={{x: 0.0, y: 1.25}}
                  end={{x: 1.5, y: 1.25}}
                  // locations={[0, 0.5, 0.6]}
                  colors={['#FFD700', '#FFD700', '#FFD700',]}
                  style={styles.linearGradient}> */}
                  {/* <View style={styles.linearGradient}>
                  <Text style={styles.btn}>Buy</Text>
                </View> */}
                  {/* </LinearGradient> */}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#2b2cd6',
                }}>
                <ImageBackground
                  source={require('../../assets/images/gold-coins.png')}
                  // resizeMode="stretch"
                  style={styles.images1}>
                  {/* <Text
                    style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
                    {(transicitionData - coinsData).toFixed(4)}
                  </Text> */}
                  {/* <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                    Grams
                  </Text> */}
                </ImageBackground>

                {totalgoldStore >= 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}>
                    <View
                      style={[
                        styles.regback1,
                        {flexDirection: 'row', justifyContent: 'center'},
                      ]}>
                      <Text style={styles.btn2}> Request For The Coins</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {/* {gramCompleted && (
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                    setGramCompleted(!gramCompleted);
                  }}>
                  <View
                    style={[
                      styles.regback1,
                      {flexDirection: 'row', justifyContent: 'center'},
                    ]}>
                    <Text style={styles.btn2}> Request For The Coins</Text>
                  </View>
                </TouchableOpacity>
              )} */}
              </View>
              {/* {video?.slice(0, 1)?.map((e, index) => {
                const videoUrl = `${e?.video}`;
                return (
                  <View style={styles.containervideo}>
                    <WebView
                      source={{uri: videoUrl}}
                      style={styles.videoPlayer}
                      resizeMode="cover"
                    />
                  </View>
                );
              })} */}
              <View style={styles.xyz}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 4,
                    borderColor: '#feac03',
                    marginBottom: 13,
                    borderRadius: 8,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      width: '70%',
                      fontSize: 16,
                      fontWeight: '900',
                    }}>
                    Start saving today for better tomorrow
                  </Text>

                  <Image
                    source={require('../../assets/images/g1.png')}
                    style={{height: 50, width: 120}}
                    resizeMode="contain"
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 4,
                    borderColor: '#feac03',
                    marginBottom: 13,
                    borderRadius: 8,
                    padding: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/g2.png')}
                    style={{height: 50, width: 120, marginLeft: -40}}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      width: '70%',
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
                    marginBottom: 11,
                    borderRadius: 8,
                    padding: 7,
                  }}>
                  <Text style={{textTransform: 'uppercase'}}>
                    Refer today for get more surprise
                  </Text>
                  <Image
                    source={require('../../assets/images/g3.png')}
                    style={{height: 50, width: 120}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={{flex: 1}}>
              {/* <Button title="Show modal" onPress={toggleModal} /> */}

              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 320,
                    borderRadius: 5,
                  }}>
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
                        paddingBottom: 10,
                        alignItems: 'center',
                        fontSize: 20,
                        fontWeight: '700',
                        color: 'black',
                      }}>
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
                            width: '50%',
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontWeight: '600',
                            backgroundColor: '#f3d25b',
                            borderColor: '#f3d25b',
                          },
                        ]}>
                        {(transicitionData - coinsData).toFixed(4)} Grams
                      </Text>
                    </View>
                    <Text
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingTop: 20,
                        paddingBottom: 10,
                        alignItems: 'center',
                        fontSize: 20,
                        fontWeight: '700',
                        color: 'black',
                        alignSelf: 'center',
                      }}>
                      Required Gold Coin
                    </Text>
                    <View style={styles.request}>
                      <TextInput
                        style={[
                          styles.input1,
                          {
                            fontSize: 17,
                            width: '50%',
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: 'black',
                          },
                        ]}
                        placeholderTextColor={'black'}
                        placeholder="Grams"
                        value={mobile}
                        keyboardType="number-pad"
                        onChangeText={handleChange}
                      />
                    </View>
                    {/* <View style={styles.request}>
                    <TextInput
                      style={[styles.input1, {fontSize: 16}]}
                      placeholder={user?.name}
                      value={name}
                      keyboardType="default"
                      onChangeText={name => setName(name)}
                    />
                  </View> */}
                    {/* <View style={styles.request}>
                    <TextInput
                      style={[styles.input1, {fontSize: 16}]}
                      placeholder={user?.email}
                      value={email}
                      keyboardType="email-address"
                      onChangeText={email => setEmail(email)}
                    />
                  </View> */}
                    {/* <View style={styles.request}>
                    <TextInput
                      style={[styles.input1, {fontSize: 16}]}
                      value={mobile}
                      placeholder={user?.phoneno}
                      keyboardType="number-pad"
                      onChangeText={mobile => setMobile(mobile)}
                    />
                  </View> */}
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
                        <Text style={{color: 'white', fontSize: 15, width: 50}}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 0}}
                      colors={['#874701', '#874701', '#874701']}
                      style={styles.linearGradientmodel}>
                      <TouchableOpacity
                        onPress={() => {
                          addRequest();
                        }}>
                        <Text
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 15,
                            width: 80,
                          }}>
                          Send request
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Modal */}
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <Text>
            <ActivityIndicator size="big" color="#874701" />
          </Text> */}
        </View>
      )}
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#2b2cd6',
  },
  image: {
    flex: 1,
  },
  loan: {
    width: '100%',
    padding: 10,
    // backgroundColor: '#2b2cd6',
  },
  content: {
    paddingTop: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  passage: {
    color: '#f3d25b',
    fontSize: 22,
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  xyz: {
    paddingHorizontal: 14,
  },
  items: {
    borderWidth: 4,
    borderColor: '#feac03',
    borderRadius: 10,
    width: '100%',
    paddingBottom: 16,
    // backgroundColor: '#2b2cd6',
  },
  chipContainer: {
    flexDirection: 'row',
    borderColor: '#feac03',
    borderWidth: 3,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 30,
    backgroundColor: '#2b2cd6',
    padding: 30,
    gap: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 4,
    fontSize: 16,
    borderRadius: 13,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    width: 130,
    borderColor: '#feac03',
    backgroundColor: 'transparent',
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  itemicon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  icons: {
    fontSize: 22,
    color: '#f3d25b',
  },
  button: {
    backgroundColor: '#f3d25b',
  },
  btn: {
    fontSize: 18,
    color: '#874701',
    fontWeight: '600',
    textAlign: 'center',
  },
  linearGradient: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#874701',
    marginBottom: 7,
    width: 100,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#f3d25b',
  },
  images1: {
    marginVertical: 5, // Increased margin to add spacing around the circle
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200,
    height: 150, // Increased height of the circle
    paddingVertical: 10, // Added padding inside the circle
  },

  containervideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Increased margin to add spacing between the video and the circle
    marginTop: 20, // Ensured spacing above the video
    borderColor: '#f3d25b',
    borderWidth: 2,
    marginRight: 60,
    marginLeft: 60,
  },

  videoPlayer: {
    width: 235,
    height: 130,
  },
  playPauseButton: {
    marginTop: 20,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input1: {
    height: 45,
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 6,
    color: 'black',
    padding: 10,
    width: '94%',
    borderColor: '#874701',
    backgroundColor: 'white',
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
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    textAlign: 'center',
    backgroundColor: '#f3d25b',
    fontSize: 17,
    borderColor: '#f3d25b',
    borderWidth: 2,
    color: 'black',
    fontWeight: '700',
    padding: 3,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 100,
    width: 200,
  },
});
