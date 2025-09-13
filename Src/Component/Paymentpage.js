import {StyleSheet, ActivityIndicator, Alert, View} from 'react-native';
import React from 'react';
import {debounce, throttle} from 'lodash';
import axios from 'axios';
import {WebView} from 'react-native-webview';

const Paymentpage = ({navigation, route}) => {
  let {paymentUrl, user, amount, gold, newMerchantTransactionId, status} =
    route.params;
  //   console.log('ek din : ', route.params);

  // Transaction++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //   const [paymentid, setpaymentId] = useState('');
  const placeorder = async () => {
    try {
      const config = {
        url: '/transaction',
        method: 'post',
        baseURL: 'https://justbuynewbackend.onrender.com/api/v1/transactions',
        headers: {'content-type': 'application/json'},
        data: {
          UserId: user?._id,
          amount: amount,
          gold: gold,
          PaymentId: newMerchantTransactionId,
          status: status,
        },
      };
      console.log('user', user._id, amount, gold);
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          console.log('success');
          Alert.alert(res.data.msg);
          navigation.navigate('Home1');
        }
      });
    } catch (error) {
      console.log(error);
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

export default Paymentpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
