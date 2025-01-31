import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {emptyCart} from './CartReducer';
import {useDispatch, useSelector} from 'react-redux';
import {debounce, throttle} from 'lodash';
const Checkoutpayment = ({navigation, route}) => {
  const {
    paymentUrl,
    cart,
    user,
    d,
    PayUsingWallet,
    paymentmethod,
    checkradio,
    finaldata2,
    delivary,
    reason,
    newMerchantTransactionId,
    Walletproduct,
    finalTaxdata2,
  } = route.params;

  const dispatch = useDispatch();

  const WalletPurchase = async () => {
    // console.log("dsfvdgvfdgfdfdgdfg");
    try {
      const config = {
        url: '/UserWalletPurchase',
        method: 'post',
        baseURL: 'https://nalaa.mobi/api/user',
        headers: {'content-type': 'application/json'},

        data: {
          WalletAmount: 0,
          userId: user._id,
        },
      };

      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          if (Walletproduct?.length > 0) {
            RemovePoints1(Walletproduct[0]);
          } else {
            Alert.alert('Order Placed Successfully');
            dispatch(emptyCart());
            AsyncStorage.setItem('user', JSON.stringify(res.data.user));
            navigation.navigate('Home14');
          }
        }
      });
    } catch (error) {
      console.log(error);
      // alert("Address not added");
    }
  };

  const PayUsingWalletCash = async () => {
    try {
      const config = {
        url: '/UserPayUsingWalletCash',
        method: 'post',
        baseURL: 'https://nalaa.mobi/api/user',
        headers: {'content-type': 'application/json'},

        data: {
          TotalAmount:
            finaldata2 > 374
              ? finaldata2
              : finaldata2 + delivary[0]?.DeliveryCharge,
          userId: user._id,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          if (Walletproduct?.length > 0) {
            RemovePoints(Walletproduct[0]);
          } else {
            console.log('success');
            Alert.alert('Order Placed Successfully Using Wallet Cash');
            dispatch(emptyCart());
            AsyncStorage.setItem('user', JSON.stringify(res.data.user));
            navigation.navigate('Home14');
          }
        }
      });
    } catch (error) {
      console.log(error);
      // alert("Address not added");
    }
  };

  const RemovePoints = async Price => {
    try {
      const config = {
        url: '/UserPayUsingWalletPoints',
        method: 'post',
        baseURL: 'https://nalaa.mobi/api/user',
        headers: {'content-type': 'application/json'},

        data: {
          TotalAmount: Price.WalletPrice * Price.quantity,
          userId: user._id,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          console.log('success');
          dispatch(emptyCart());
          AsyncStorage.setItem('user', JSON.stringify(res.data.user));
          navigation.navigate('Home14');
        }
      });
    } catch (error) {
      console.log(error);
      // alert("Address not added");
    }
  };

  const RemovePoints1 = async Price => {
    // console.log("sdvfgdsghfbhf");
    try {
      const config = {
        url: '/UserPayUsingWalletPoints',
        method: 'post',
        baseURL: 'https://nalaa.mobi/api/user',
        headers: {'content-type': 'application/json'},

        data: {
          TotalAmount: Price.WalletPrice * Price.quantity,
          userId: user._id,
        },
      };

      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          Alert.alert('Order Placed Success');
          dispatch(emptyCart());
          AsyncStorage.setItem('user', JSON.stringify(res.data.user));
          navigation.navigate('Home14');
        }
      });
    } catch (error) {
      console.log(error);
      // alert("Address not added");
    }
  };
  //   let date = moment(new Date()).format('DD-MM-YYYY');
  //   let date1 = moment(date, 'DD-MM-YYYY').add('days', 1);
  //   let date2 = moment(date, 'DD-MM-YYYY').add('days', 2);
  //   let time = moment(new Date(), 'hh:mm A').format('HH:mm');

  //   const [expecteddate, setexpecteddate] = useState('');
  //   const [expecteddate1, setexpecteddate1] = useState('');

  //   useEffect(() => {
  //     selectdate();
  //   }, []);

  //   function selectdate() {
  //     if (moment(date1).format('dddd') === 'Sunday') {
  //       setexpecteddate(moment(date1, 'DD-MM-YYYY').add('days', 2));
  //     } else if (moment(date1).format('dddd') === 'Monday') {
  //       setexpecteddate(moment(date1, 'DD-MM-YYYY').add('days', 1));
  //     } else if (moment(date1).format('dddd') === 'Thursday') {
  //       setexpecteddate(moment(date1, 'DD-MM-YYYY').add('days', 1));
  //     } else if (moment(date1).format('dddd') === 'Tuesday') {
  //       setexpecteddate(moment(date1).format('DD-MM-YYYY'));
  //     } else if (moment(date1).format('dddd') === 'Friday') {
  //       setexpecteddate(moment(date1).format('DD-MM-YYYY'));
  //     }else if (moment(date1).format('dddd') === 'Wednesday') {
  //       setexpecteddate(moment(date1).format('DD-MM-YYYY'));
  //     }else if (moment(date1).format('dddd') === 'Saturday') {
  //       setexpecteddate1(moment(date1).format('DD-MM-YYYY'));
  //      }
  //     else {
  //       setexpecteddate(moment(date1).format('DD-MM-YYYY'));
  //     }

  //     if (moment(date2).format('dddd') === 'Sunday') {
  //       setexpecteddate1(moment(date2, 'DD-MM-YYYY').add('days', 2));
  //     } else if (moment(date2).format('dddd') === 'Monday') {
  //       setexpecteddate1(moment(date2, 'DD-MM-YYYY').add('days', 1));
  //     } else if (moment(date2).format('dddd') === 'Thursday') {
  //       setexpecteddate1(moment(date2, 'DD-MM-YYYY').add('days', 1));
  //     }else if (moment(date1).format('dddd') === 'Tuesday') {
  //      setexpecteddate1(moment(date2).format('DD-MM-YYYY'));
  //     } else if (moment(date1).format('dddd') === 'Friday') {
  //      setexpecteddate1(moment(date2).format('DD-MM-YYYY'));
  //     }else if (moment(date1).format('dddd') === 'Wednesday') {
  //      setexpecteddate1(moment(date2).format('DD-MM-YYYY'));
  //     }else if (moment(date1).format('dddd') === 'Saturday') {
  //       setexpecteddate1(moment(date2).format('DD-MM-YYYY'));
  //      }
  //      else {
  //       setexpecteddate1(moment(date2).format('DD-MM-YYYY'));
  //     }
  //   }

  //   const dateComponents =expecteddate.length>0?expecteddate.split('-'):"";

  //   // Rearrange the components to form the desired format
  //   const convertedDate =
  //     dateComponents[1] + '-' + dateComponents[0] + '-' + dateComponents[2];
  //   console.log('expecteddate', convertedDate);

  // //   const dateComponents1 =expecteddate1.length>0?expecteddate1.split('-'):"";
  // //   const convertedDate1 =
  // //   dateComponents1[1] + '-' + dateComponents1[0] + '-' + dateComponents1[2];
  // // console.log('expecteddate', convertedDate1);
  //   const time1 = time;
  //   const [hours, minutes] = time1.split(':').map(Number);
  //   const totalSeconds = hours * 60 * 60 + minutes * 60;

  let today = moment();
  let tomorrow = moment().add(1, 'days');
  let dayaftertomorrow = moment().add(2, 'days');

  var weekDayName = moment(tomorrow).format('dddd');
  var weekDayName1 = moment(dayaftertomorrow).format('dddd');

  console.log(weekDayName, 'tomorrow');
  console.log(weekDayName1, 'dayaftertomorrow');

  const CurrentTime = moment().hours();

  const [EstimatedDate, setEstimatedDate] = useState();

  const DeliveryDate = () => {
    if (CurrentTime < 18) {
      if (moment(tomorrow).format('dddd') == 'Sunday') {
        // alert("delivery date is sunday");
        setEstimatedDate(moment(tomorrow).add(2, 'days'));
      } else if (moment(tomorrow).format('dddd') == 'Monday') {
        // alert("delivery date is monday");
        setEstimatedDate(moment(tomorrow).add(1, 'days'));
      } else if (moment(tomorrow).format('dddd') == 'Thursday') {
        // alert("delivery date is thursday");
        setEstimatedDate(moment(tomorrow).add(1, 'days'));
      } else {
        setEstimatedDate(tomorrow);
      }
      // setEstimatedDate(tomorrow);
      // alert("5 clock");
    } else {
      if (moment(dayaftertomorrow).format('dddd') == 'Sunday') {
        // alert("delivery date is sunday");
        setEstimatedDate(moment(dayaftertomorrow).add(2, 'days'));
      } else if (moment(dayaftertomorrow).format('dddd') == 'Monday') {
        // alert("delivery date is monday");
        setEstimatedDate(moment(dayaftertomorrow).add(1, 'days'));
      } else if (moment(dayaftertomorrow).format('dddd') == 'Thursday') {
        // alert("delivery date is thursday");
        setEstimatedDate(moment(dayaftertomorrow).add(1, 'days'));
      } else {
        setEstimatedDate(tomorrow);
      }
      // setEstimatedDate(dayaftertomorrow);
      // alert("6 clock");
    }
  };
  // console.log(EstimatedDate, "delivery date");

  useEffect(() => {
    DeliveryDate();
  }, [CurrentTime]);

  const placeorder = async () => {
    if (!checkradio) {
      Alert.alert('Please Select Address');
    }
    // else if (user?.SubScription == false) {
    //    Alert.alert('Please Subscribe !!!!! ');
    // }
    else {
      try {
        const config = {
          url: '/addorders',
          method: 'post',
          baseURL: 'https://nalaa.mobi/api/user',
          headers: {'content-type': 'application/json'},

          data: [
            cart.map(data => ({
              productId: data.product?._id,
              products: cart,
              userId: user._id,
              orderdatetime: d,
              quantity: data.quantity,
              paymentmethod: PayUsingWallet
                ? 'Pay Using Wallet Cash'
                : paymentmethod,

              FName: checkradio.FName,
              LName: checkradio.LName,
              phoneNumber1: checkradio.Phno,
              doorno: checkradio.Doorno,
              address: checkradio.Address,
              city: checkradio.City,
              state: checkradio.State,
              country: checkradio.Country,
              pincode: checkradio.Pincode,
              phoneNumber: user.phoneNumber,
              productname: data.product?.productname,
              payid: newMerchantTransactionId,
              WalletPoint: Math.round(
                ((data?.product?.productprice +
                  (data.product?.productprice *
                    (data?.product?.SGST + data?.product?.CGST)) /
                    100 -
                  (data?.product?.productdiscount *
                    (data?.product?.productprice +
                      (data?.product?.productprice *
                        (data?.product?.CGST + data?.product?.SGST)) /
                        100)) /
                    100) *
                  data.quantity *
                  10) /
                  100,
              ),

              // specialdiscount:
              //   promocode.length > 0 ? promocode[0]?.discount : 0,
              amt:
                (data?.product?.productprice +
                  (data?.product?.productprice *
                    (data?.product?.SGST + data?.product?.CGST)) /
                    100 -
                  (data?.product?.productdiscount *
                    (data?.product?.productprice +
                      (data?.product?.productprice *
                        (data?.product?.CGST + data?.product?.SGST)) /
                        100)) /
                    100) *
                data.quantity,
              TotalTax: finalTaxdata2,
              Totalamount:
                Math.round(finaldata2) <= 375
                  ? Math.round(finaldata2) + delivary[0]?.DeliveryCharge
                  : Math.round(finaldata2),
              deliverydate: EstimatedDate,
              deliveryCity: reason,
              deliveryCharge:
                Math.round(finaldata2) <= 375 ? delivary[0]?.DeliveryCharge : 0,
            })),
          ],
        };
        await axios(config).then(function (res) {
          if ((res.status = 200)) {
            if (user.SubScription == true) {
              if (PayUsingWallet) {
                PayUsingWalletCash();
              } else {
                WalletPurchase();
              }
            } else {
              Alert.alert('Order Placed Successfully');
              dispatch(emptyCart());
              // AsyncStorage.setItem('user', JSON.stringify(res.data.user));
              navigation.navigate('Home14');
            }
          }
        });
      } catch (error) {
        console.log(error);
        Alert.alert('Unable to place Order');
      }
    }
  };
  console.log('paymentUrl', paymentUrl);
  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  const debouncedAddSubscription = debounce(placeorder, 500);
  const handleWebViewNavigation = event => {
    const {url} = event;
    if (url.includes('payment-success')) {
      // Payment is successful, trigger your logic here
      // Call addSubscription API or perform necessary actions
      debouncedAddSubscription();
    }
  };
  return (
    <View style={styles.container}>
      <WebView
        startInLoadingState={true}
        originWhitelist={['*']}
        source={{uri: paymentUrl}}
        renderLoading={LoadingIndicatorView}
        javaScriptEnabled={true}
        style={{flex: 1}}
        domStorageEnabled={true}
        onNavigationStateChange={handleWebViewNavigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Checkoutpayment;
