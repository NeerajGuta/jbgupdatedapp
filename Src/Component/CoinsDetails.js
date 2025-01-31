import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Image} from 'react-native-animatable';
import LoaderKit from 'react-native-loader-kit';

const CoinsDetails = () => {
  const [user, setUser] = useState('');
  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };

  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, []),
  );

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const getCoins = async _id => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setLoader(true);
    try {
      await axios
        .get('https://justbuygold.co.in/api/v1/coins/singalcoins/' + user?._id)
        .then(res => {
          if (res.status == 200) {
            setData(res.data.success);
            console.log(res.data.success);
            setLoader(false);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

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
          {data.length != 0 ? (
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.container1}>
                  <Text style={styles.fonts}>Withdraw Coins Details</Text>
                  {data.reverse().map((ele, index) => {
                    return (
                      <View style={styles.tab}>
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Pending Coin</Text>
                          <Text style={styles.passfont1}>
                            {Math.max(
                              0,
                              Number(ele?.coins || 0) -
                                Number(ele?.requestedCoin || 0),
                            ).toFixed(4)}{' '}
                            gms
                          </Text>
                        </View>

                        {/* <View style={styles.profiles1}>
                      <Text style={styles.passfont}>S.No.</Text>
                      <Text style={styles.passfont1}>{index + 1}</Text>
                    </View> */}
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Request Id </Text>

                          <Text style={styles.passfont1}>{ele?._id}</Text>
                        </View>
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Coin with you</Text>
                          <Text style={[styles.passfont1, {color: '#00A9FF'}]}>
                            {Number(ele?.coins).toFixed(4)} gms
                          </Text>
                        </View>
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Requested Coin</Text>
                          <Text style={[styles.passfont1, {color: 'green'}]}>
                            {Number(ele?.coins || 0).toFixed(4)} gms
                          </Text>
                        </View>
                        {/* <View style={styles.profiles1}>
                    <Text style={styles.passfont}>Amount Transaction</Text>
                    <Text style={styles.passfont1}>₹ {ele?.amount}</Text>
                  </View> */}

                        {/* <View style={styles.profiles1}>
                    <Text style={styles.passfont}>Payment Id</Text>
                    <Text style={styles.passfont1}>{ele?.PaymentId}</Text>
                  </View> */}
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Pending Coin</Text>
                          <Text style={[styles.passfont1, {color: 'green'}]}>
                            {Number(ele?.requestedCoin || 0).toFixed(4)} gms
                          </Text>
                        </View>

                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Status</Text>
                          <Text
                            style={[
                              styles.passfont1,
                              {color: ele?.status === 'Hold' ? 'red' : 'green'},
                            ]}>
                            {ele?.status}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          ) : (
            <>
              {/* <View>
            <Text
              style={{
                padding: 10,
                color: 'black',
                fontSize: 26,
                fontWeight: '600',
              }}>
              History Coins Details
            </Text>
          </View> */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'Poppins-ExtraBoldItalic',
                  }}>
                  No History Coins Details
                </Text>
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CoinsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    padding: 10,
  },
  fonts: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Poppins-ExtraBoldItalic',
  },
  profiles1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3d25b',
  },
  passfont: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  passfont1: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  tab: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
    // marginLeft: 2,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#f3d25b',
  },
});
