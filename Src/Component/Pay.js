import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import RNRestart from 'react-native-restart';

const Pay = ({navigation, route}) => {
  const {Amount, gold, goldRate} = route.params;
  // console.log('checkkk-->', Amount, gold, goldRate);

  const [user, setUser] = useState('');
  // console.log(user, user?.totalEarnedMoney, 'user');

  const [data, setData] = useState([]);
  //   console.log(data, 'data');
  // const getPrice = async () => {
  //   try {
  //     let res = await axios.get(
  //       'https://justbuygold.co.in/api/v1/referralprices',
  //     );
  //     if (res.status == 200) {
  //       setData(res?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // userGetAPi
  const [getUser, setGetuser] = useState(null); // Initialize with null or an empty object

  const userID = async userId => {
    try {
      const response = await axios.get(
        `https://justbuygold.co.in/api/v1/user/auth/user/${userId}`,
      );

      if (response.status === 200) {
        setGetuser(response.data.user);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  // console.log(user);

  const [RedCodeID, setRedCodeID] = useState({});
  const [ActiveStatus, setActiveStatus] = useState({});

  const getrefCode = async () => {
    try {
      // if (!user?._id) {
      //   throw new Error('User ID is not available');
      // }

      const res = await axios.get(
        `https://justbuygold.co.in/api/v1/refCode/${user._id}`,
      );

      // console.log('referalcode', res);

      if (res.status === 200) {
        setRedCodeID(res.data);
        setActiveStatus(res.data.status === 'Inactive');
      } else {
        console.error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error fetching referral code:', error?.message);
    }
  };

  // console.log('user?._id', user?._id);

  const userData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        userID(parsedUser._id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, []),
  );

  // let referralprice;
  // if (ActiveStatus === true) {
  //   referralprice = 0;
  // } else {
  //   referralprice = data.map((item, i) => item?.referralprice) / 2;
  // }

  // const TotalPayableAmount = Amount - referralprice - user?.totalEarnedMoney;
  // const TotalPayableAmount =
  // baseGoldValue + gstAmount - Number(getUser?.totalEarnedMoney || 0);
  //   console.log('TotalPayableAmount:', TotalPayableAmount);

  const handleReferralSubmit = async () => {
    try {
      const response = await axios.put(
        'https://justbuygold.co.in/api/v1/changestatus',
        {
          receiverId: user?._id,
        },
      );
      console('Success', response.data.message);
      // navigation.navigate('Home1');
      setReferralCode(' ');
    } catch (error) {
      // Alert.alert(error.response?.data?.message || 'An error occurred');
      // console.log(error, 'errorggggg');
    }
  };
  // handleReferralSubmit('credit');

  // // For debit operation
  // handleReferralSubmit('debit');

  // Earned Bonus Amount
  // const [datas, setDatas] = useState([]);
  // console.log(datas, 'dstsss');
  const fetchUserReferralStats = async userId => {
    try {
      const response = await axios.get(
        `https://justbuygold.co.in/api/v1/user/${userId}`,
      );
      if (response.status === 200) {
        setData(response.data.totalRupeesEarned);
      } else {
        console.error('Unexpected response status:', response.status);
        setError('Unexpected response status.');
      }
    } catch (error) {
      console.error(
        'Error fetching referral stats:',
        error?.response ? error?.response?.data?.message : error?.message,
      );
    }
  };

  // total

  // Payment
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
          amount: TotalPayableAmount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: Number(gold),
          // totalCoin: totalgoldStore + Number(gold),
        },
      };
      console.log('user', user._id, Amount, gold);
      await axios(config).then(function (res) {
        if (res.status == 200) {
          // console.log('success');
          // Alert.alert('Successfully');
          // userTransaction();
          handleReferralSubmit();
          setTimeout(() => {
            RNRestart.restart();
          }, 100);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const posttransaction = async () => {
    try {
      var options = {
        key: 'rzp_test_FAe0X6xLYXaXHe',
        amount: TotalPayableAmount * 100,
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
          // Alert.alert(`Success: ${data.razorpay_payment_id}`);
          placeorder(data.razorpay_payment_id);
        })
        .catch(error => {
          // handle failure
          // Alert.alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // Get Gst+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [datagst, setDatagst] = useState({});
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
        setDatagst(result.data.success);
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ferngfernvnernfv
  const [rate, setRate] = useState([]);
  const [objRate, setObjRate] = useState({});
  // console.log(objRate, 'objRate>>>>>>>>>>>>>>>>...');
  const getRate = async () => {
    try {
      await axios
        .get('https://justbuygold.co.in/api/v1/rate/allrate')
        .then(res => {
          if (res.status === 200) {
            setRate(res.data.success);
            setObjRate(res.data.success[0]);
            // setLoading(true);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRate();
    getGst();
  }, []);

  const NewGst = Number(datagst?.Sgst || 0) + Number(datagst?.Cgst || 0);
  const goldValue = Number(rate[0]?.rate || 0); // Rate per gram
  const goldWeight = Number(gold || 0); // Gold quantity in grams
  const baseGoldValue = Number(goldValue * goldWeight || 0);
  const gstAmount = (baseGoldValue * NewGst) / 100;

  console.log(NewGst, goldValue, goldWeight, baseGoldValue, gstAmount);

  // Ensure getUser is properly handled
  const userTotalEarnedMoney = Number(getUser?.totalEarnedMoney || 0);

  // Total Payable Amount Calculation
  const TotalPayableAmount = Math.round(
    baseGoldValue + gstAmount - userTotalEarnedMoney,
  );

  console.log(TotalPayableAmount);

  // console.log(allCalulation, gstwithPrice, 'jefowej');
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#ffff'}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Payment Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Gold Quantity:</Text>
          <Text style={styles.value}>{gold} gms</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Gold Rate:</Text>
          <Text style={styles.value}>₹{goldRate}/gm</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Gold Value:</Text>
          <Text style={styles.value}>₹{baseGoldValue?.toFixed(2)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>GST ({NewGst}%):</Text>
          <Text style={styles.value}>₹{gstAmount?.toFixed(2)}</Text>
        </View>

        {/* {RedCodeID && RedCodeID.status == 'Active' ? (
          <>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Referral Discount Amount:</Text>
              <Text style={styles.value}>- ₹{referralprice?.toFixed(3)}</Text>
            </View>
          </>
        ) : null} */}
        {getUser && getUser?.totalEarnedMoney == 0 ? (
          <>
            <View style={styles.detailItem}>
              <Text style={styles.label}> Balance:</Text>
              <Text style={styles.value}>₹ 0.00</Text>
            </View>
          </>
        ) : (
          <View style={styles.detailItem}>
            <Text style={styles.label}> Balance:</Text>
            <Text style={styles.value}>- ₹{getUser?.totalEarnedMoney}</Text>
          </View>
        )}

        <View style={styles.detailItem}>
          <Text style={styles.label}>Total Payable Amount:</Text>
          <Text style={styles.value}>₹{TotalPayableAmount}</Text>
        </View>
        <TouchableOpacity style={{marginTop: 20}} onPress={posttransaction}>
          <LinearGradient
            colors={['#874701', '#874701']}
            style={styles.linearGradientmodel}>
            <Text style={styles.btn}>Pay Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    // borderRadius: 8,
    // backgroundColor: '#fff',
  },
  heading: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  detailItem: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  value: {
    color: '#333',
    fontSize: 16,
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

    alignContent: 'center',
  },
  linearGradientmodel: {
    borderRadius: 100,
  },
});
