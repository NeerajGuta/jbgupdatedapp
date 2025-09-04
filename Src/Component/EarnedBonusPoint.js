import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LoaderKit from 'react-native-loader-kit';

const EarnedBonusPoints = ({}) => {
  const [user, setUser] = useState('');
  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };
  console.log(user, 'user');
  const [data, setData] = useState([]);

  // console.log(data, 'dsts');
  const [getUser, setGetuser] = useState(null); // Initialize with null or an empty object

  console.log(getUser?.totalEarnedMoney, 'getUser');

  const userID = async userId => {
    try {
      const response = await axios.get(
        `http://192.168.1.26:3034/api/v1/user/auth/user/${userId}`,
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

  const fetchUserReferralStats = async userId => {
    try {
      const response = await axios.get(
        `http://192.168.1.26:3034/api/v1/user/${userId}`,
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
        error.response ? error.response.data : error.message,
      );
    }
  };

  const [walletdata, setWalletData] = useState([]);
  const [loader, setLoader] = useState(true);
  // console.log(walletdata, 'Walllet History');
  const walletHistoryID = async userId => {
    setLoader(true);
    try {
      const response = await axios.get(
        `http://192.168.1.26:3034/api/v1/wallet-history/${userId}`,
      );
      if (response.status === 200) {
        setWalletData(response.data);
        setLoader(false);
      } else {
        console.error('Unexpected response status History:', response.status);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user && user._id) {
        fetchUserReferralStats(user._id);
        walletHistoryID(user._id);
        userID(user._id);
      }
    }, [user]),
  );

  useEffect(() => {
    userData();
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
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Animatable.View
              animation="fadeInRight"
              style={styles.bonusContainer}>
              <View>
                <Text style={styles.title}>
                  Total Earned Bonus Points : ₹ {getUser?.totalEarnedMoney}
                </Text>
                <FlatList
                  data={walletdata}
                  renderItem={({item, index}) => {
                    const runningTotal = walletdata
                      .slice(0, index + 1)
                      .reduce((acc, current) => acc + current.amount, 0);

                    return (
                      <View style={styles.containt}>
                        <View style={{marginBottom: 20}}>
                          <Text style={styles.text1}>JustBuyGold</Text>
                          <Text style={styles.blasnce}>
                            {moment(item?.createdAt).format('L')}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              alignSelf: 'flex-end',
                              color: 'black',
                              fontSize: 18,
                            }}>
                            {item?.status === 'CREDIT' ? '+ ₹' : '- ₹'}{' '}
                            {Math.abs(item?.amount)}
                          </Text>
                          <Text
                            style={{
                              alignSelf: 'flex-end',
                              color: 'black',
                              fontSize: 18,
                              color:
                                item?.status === 'CREDIT' ? 'green' : 'red',
                            }}>
                            {item?.status === 'CREDIT' ? 'Credit' : 'Debit'}{' '}
                          </Text>
                          {/* <Text
                      style={{
                        alignSelf: 'flex-end',
                        color: 'black',
                        fontSize: 18,
                      }}>
                      ₹ {runningTotal}
                    </Text> */}
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            </Animatable.View>
          </View>
        </>
      )}
    </>
  );
};

const styles = {
  bonusContainer: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    paddingBottom: 20,
  },
  points: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Gold color for bonus points
    marginVertical: 5,
  },
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    fontSize: 17,
    color: 'black',
    paddingVertical: 3,
    fontWeight: 'bold',
  },
  containt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffff',
    // marginHorizontal: 15,
    // marginVertical: 10,
    // padding: 20,
    borderRadius: 5,
  },
  text1: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  blasnce: {
    fontSize: 13,
  },
};

export default EarnedBonusPoints;
