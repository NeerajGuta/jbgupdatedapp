import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import LoaderKit from 'react-native-loader-kit';

const BookingDetails = () => {
  const navigation = useNavigation();

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
  console.log('History.................................', data);
  const userTransaction = async _id => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    try {
      await axios
        .get(
          'http://192.168.1.26:3034/api/v1/transactions/transactionhistory/' +
            user?._id,
        )
        .then(res => {
          if (res.status == 200) {
            console.log(
              'transaction history...................................',
              res,
            );
            setData(res.data.success);
            console.log(res.data.success);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [allcoin, setallcoin] = useState([]);
  const [loader, setLoader] = useState(true);
  const getCoins = async _id => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setLoader(true);
    try {
      await axios
        .get('http://192.168.1.26:3034/api/v1/coins/singalcoins/' + user?._id)
        .then(res => {
          if (res.status == 200) {
            console.log('allcoins...................................', res);
            setallcoin(res.data.success);
            console.log(res.data.success);
            setLoader(false);
            // setLoader(res.data.success);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userTransaction();
    getCoins();
  }, []);

  // All transicition
  const transicitionData = data.reduce((a, i) => a + Number(i?.gold), 0);
  // console.log('transicitionData', transicitionData);

  // All gold Store
  const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0);
  console.log('all coin', allcoin);

  // TotalGold
  // const totalGOld = data.reduce((acc, curr) => acc + curr?.totalCoin, 0);

  console.log('data.....................................', data);

  return (
    <>
      {data.length != 0 ? (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.container1}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.fonts}>Gold in your Locker </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CoinDetails');
                  }}>
                  <Text
                    style={[
                      styles.fonts,
                      {
                        // backgroundColor: '#f3d25b',
                        textAlign: 'center',
                        borderRadius: 5,
                      },
                    ]}>
                    {(transicitionData - coinsData).toFixed(4)} gms
                  </Text>
                </TouchableOpacity>
              </View>
              {data?.reverse()?.map((ele, index) => {
                return (
                  <View style={styles.tab}>
                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Payment Date</Text>
                      <Text
                        style={[
                          styles.passfont1,
                          {color: 'black', fontWeight: '500'},
                        ]}>
                        {moment(ele?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a',
                        )}
                      </Text>
                    </View>
                    {/* <View style={styles.profiles1}>
                      <Text style={styles.passfont}>S.No.</Text>
                      <Text style={styles.passfont1}>{index + 1}</Text>
                    </View> */}
                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Purchase Id</Text>

                      <Text style={styles.passfont1}>{ele?._id}</Text>
                    </View>
                    {/* <View style={styles.profiles1}>
                      <Text style={styles.passfont}>User Name</Text>
                      <Text style={styles.passfont1}>{ele?.UserId?.name}</Text>
                    </View> */}

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gold Rate</Text>
                      <Text style={styles.passfont1}>₹ {ele?.goldRate}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gold Value</Text>
                      <Text style={styles.passfont1}>₹ {ele?.goldValue}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gst</Text>
                      <Text style={styles.passfont1}>
                        ₹ {ele?.gst.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Amount Paid</Text>
                      <Text style={styles.passfont1}>
                        ₹ {(ele?.amount).toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Payment Id</Text>
                      <Text style={styles.passfont1}>{ele?.PaymentId}</Text>
                    </View>
                    {/* <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Coin with you</Text>
                      <Text style={[styles.passfont1, {color: '#00A9FF'}]}>
                        {(ele?.totalCoin - ele?.gold).toFixed(4)} gms
                      </Text>
                    </View> */}
                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Store Gold</Text>
                      <Text style={[styles.passfont1, {color: '#F99417'}]}>
                        {ele?.gold} gms
                      </Text>
                    </View>
                    {/* <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Total Gold</Text>
                      <Text style={[styles.passfont1, {color: 'green'}]}>
                        {(ele?.totalCoin).toFixed(4)} gms
                      </Text>
                    </View> */}
                    {/* <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Status</Text>
                      <Text style={[styles.passfont1, {color: 'green'}]}>
                        {ele?.status}
                      </Text>
                    </View> */}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: 'Poppins-ExtraBoldItalic',
            }}>
            No Purchase Histroy
          </Text>
        </View>
      )}
    </>
  );
};

export default BookingDetails;

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
