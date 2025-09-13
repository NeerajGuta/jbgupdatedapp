/* import {
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
          'https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/' +
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
        .get('https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/' + user?._id)
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
                    
                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Purchase Id</Text>

                      <Text style={styles.passfont1}>{ele?._id}</Text>
                    </View>
                   

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
                 
                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Store Gold</Text>
                      <Text style={[styles.passfont1, {color: '#F99417'}]}>
                        {ele?.gold} gms
                      </Text>
                    </View>
                    
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
 */




/* 
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import LoaderKit from "react-native-loader-kit"

const BookingDetails = () => {
  const navigation = useNavigation()

  const [user, setUser] = useState("")
  const userData = async () => {
    const user = await AsyncStorage.getItem("user")
    setUser(JSON.parse(user))
  }

  useFocusEffect(
    React.useCallback(() => {
      userData()
    }, []),
  )

  const [data, setData] = useState([])
  console.log("History.................................", data)
  const userTransaction = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/" + user?._id).then((res) => {
        if (res.status == 200) {
          console.log("transaction history...................................", res)
          setData(res.data.success)
          console.log(res.data.success)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [allcoin, setallcoin] = useState([])
  const [loader, setLoader] = useState(true)
  const getCoins = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    setLoader(true)
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/" + user?._id).then((res) => {
        if (res.status == 200) {
          console.log("allcoins...................................", res)
          setallcoin(res.data.success)
          console.log(res.data.success)
          setLoader(false)
          // setLoader(res.data.success);
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userTransaction()
    getCoins()
  }, [])

  // All transicition
  const transicitionData = data.reduce((a, i) => a + Number(i?.gold), 0)
  // console.log('transicitionData', transicitionData);

  // All gold Store
  const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0)
  console.log("all coin", allcoin)

  // TotalGold
  // const totalGOld = data.reduce((acc, curr) => acc + curr?.totalCoin, 0);

  console.log("data.....................................", data)

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedTransaction(null)
  }

  return (
    <>
      {loader ? (
        <View style={styles.loadingContainer}>
          <LoaderKit type="ball-scale" color="#f3d25b" size={50} />
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.container1}>
              <View style={styles.summaryCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.fonts}>Gold in your Locker</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CoinDetails")
                    }}
                  >
                    <Text
                      style={[
                        styles.fonts,
                        {
                          color: "#f3d25b",
                          backgroundColor: "#fff8e1",
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 8,
                          fontSize: 16,
                        },
                      ]}
                    >
                      {(transicitionData - coinsData).toFixed(4)} gms
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {data?.reverse()?.map((ele, index) => {
                return (
                  <View key={index} style={styles.tab}>
                    <View style={[styles.profiles1, { backgroundColor: "#f8f9fa" }]}>
                      <Text style={[styles.passfont, { color: "#1a1a1a", fontWeight: "700" }]}>
                        Transaction #{index + 1}
                      </Text>
                      <Text style={[styles.passfont1, { color: "#28a745" }]}>Completed</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Payment Date</Text>
                      <Text style={styles.passfont1}>{moment(ele?.createdAt).format("MMM DD, YYYY")}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Purchase ID</Text>
                      <TouchableOpacity onPress={() => openTransactionModal(ele)}>
                        <Text
                          style={[
                            styles.passfont1,
                            { fontSize: 12, color: "#007bff", textDecorationLine: "underline" },
                          ]}
                        >
                          {ele?._id?.substring(0, 8)}...
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gold Rate</Text>
                      <Text style={styles.passfont1}>₹{ele?.goldRate}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gold Value</Text>
                      <Text style={styles.passfont1}>₹{ele?.goldValue}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>GST</Text>
                      <Text style={styles.passfont1}>₹{ele?.gst.toFixed(2)}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Amount Paid</Text>
                      <Text style={[styles.passfont1, { color: "#dc3545", fontWeight: "700" }]}>
                        ₹{(ele?.amount).toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Payment ID</Text>
                      <TouchableOpacity onPress={() => openTransactionModal(ele)}>
                        <Text
                          style={[
                            styles.passfont1,
                            { fontSize: 12, color: "#007bff", textDecorationLine: "underline" },
                          ]}
                        >
                          {ele?.PaymentId?.substring(0, 12)}...
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.profiles1, { borderBottomWidth: 0, backgroundColor: "#fff8e1" }]}>
                      <Text style={[styles.passfont, { color: "#f3d25b", fontWeight: "700" }]}>Store Gold</Text>
                      <Text style={[styles.passfont1, { color: "#f3d25b", fontWeight: "700" }]}>{ele?.gold} gms</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>

          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Transaction Details</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  {selectedTransaction && (
                    <>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Transaction Status:</Text>
                        <Text style={[styles.modalValue, { color: "#28a745" }]}>Completed</Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Payment Date:</Text>
                        <Text style={styles.modalValue}>
                          {moment(selectedTransaction?.createdAt).format("MMM DD, YYYY hh:mm A")}
                        </Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Purchase ID:</Text>
                        <Text style={[styles.modalValue, { fontSize: 12, fontFamily: "monospace" }]}>
                          {selectedTransaction?._id}
                        </Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Payment ID:</Text>
                        <Text style={[styles.modalValue, { fontSize: 12, fontFamily: "monospace" }]}>
                          {selectedTransaction?.PaymentId}
                        </Text>
                      </View>

                      <View style={styles.modalDivider} />

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Gold Rate:</Text>
                        <Text style={styles.modalValue}>₹{selectedTransaction?.goldRate}</Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Gold Value:</Text>
                        <Text style={styles.modalValue}>₹{selectedTransaction?.goldValue}</Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>GST:</Text>
                        <Text style={styles.modalValue}>₹{selectedTransaction?.gst?.toFixed(2)}</Text>
                      </View>

                      <View style={[styles.modalRow, { backgroundColor: "#fff8e1", padding: 12, borderRadius: 8 }]}>
                        <Text style={[styles.modalLabel, { color: "#f3d25b", fontWeight: "700" }]}>Gold Stored:</Text>
                        <Text style={[styles.modalValue, { color: "#f3d25b", fontWeight: "700" }]}>
                          {selectedTransaction?.gold} gms
                        </Text>
                      </View>
                    </>
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  )
}

export default BookingDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container1: {
    padding: 16,
  },
  fonts: {
    color: "#1a1a1a",
    fontSize: 18,
    fontFamily: "Poppins-ExtraBoldItalic",
    fontWeight: "700",
  },
  profiles1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "#ffffff",
  },
  passfont: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "600",
    flex: 1,
  },
  passfont1: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1.5,
    textAlign: "right",
  },
  tab: {
    width: "100%",
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#f3d25b",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#6c757d",
    fontFamily: "Poppins-ExtraBoldItalic",
    textAlign: "center",
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "Poppins-ExtraBoldItalic",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  modalBody: {
    padding: 20,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  modalLabel: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "600",
    flex: 1,
  },
  modalValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1.5,
    textAlign: "right",
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#dee2e6",
    marginVertical: 16,
  },
})
 */



"use client"

import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import LoaderKit from "react-native-loader-kit"

const BookingDetails = () => {
  const navigation = useNavigation()

  const [user, setUser] = useState("")
  const userData = async () => {
    const user = await AsyncStorage.getItem("user")
    setUser(JSON.parse(user))
  }

  useFocusEffect(
    React.useCallback(() => {
      userData()
    }, []),
  )

  const [data, setData] = useState([])
  console.log("History.................................", data)
  const userTransaction = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    try {
      await axios
        .get("https://justbuynewbackend.onrender.com/api/v1/transactions/transactionhistory/" + user?._id)
        .then((res) => {
          if (res.status == 200) {
            console.log("transaction history...................................", res)
            setData(res.data.success)
            console.log(res.data.success)
          } else {
            console.log(res.error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const [allcoin, setallcoin] = useState([])
  const [loader, setLoader] = useState(true)
  const getCoins = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    setLoader(true)
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/" + user?._id).then((res) => {
        if (res.status == 200) {
          console.log("allcoins...................................", res)
          setallcoin(res.data.success)
          console.log(res.data.success)
          setLoader(false)
          // setLoader(res.data.success);
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userTransaction()
    getCoins()
  }, [])

  // All transicition
  const transicitionData = data.reduce((a, i) => a + Number(i?.gold), 0)
  // console.log('transicitionData', transicitionData);

  // All gold Store
  const coinsData = allcoin.reduce((a, i) => a + Number(i?.coins || 0), 0)
  console.log("all coin", allcoin)

  // TotalGold
  // const totalGOld = data.reduce((acc, curr) => acc + curr?.totalCoin, 0);

  console.log("data.....................................", data)

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedTransaction(null)
  }

  return (
    <>
      {loader ? (
        <View style={styles.loadingContainer}>
          <LoaderKit type="ball-scale" color="#f3d25b" size={50} />
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.container1}>
              <View style={styles.summaryCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.fonts}>Gold in your Locker</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CoinDetails")
                    }}
                  >
                    <Text
                      style={[
                        styles.fonts,
                        {
                          color: "#f3d25b",
                          backgroundColor: "#fff8e1",
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 8,
                          fontSize: 16,
                        },
                      ]}
                    >
                      {(transicitionData - coinsData).toFixed(4)} gms
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {data?.reverse()?.map((ele, index) => {
                return (
                  <View key={index} style={styles.tab}>
                    <View style={[styles.profiles1, { backgroundColor: "#f8f9fa" }]}>
                      <Text style={[styles.passfont, { color: "#1a1a1a", fontWeight: "700" }]}>
                        Transaction #{index + 1}
                      </Text>
                      <Text style={[styles.passfont1, { color: "#28a745" }]}>Completed</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Payment Date</Text>
                      <Text style={styles.passfont1}>{moment(ele?.createdAt).format("MMM DD, YYYY")}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Purchase ID</Text>
                      <TouchableOpacity onPress={() => openTransactionModal(ele)}>
                        <Text
                          style={[
                            styles.passfont1,
                            { fontSize: 12, color: "#007bff", textDecorationLine: "underline" },
                          ]}
                        >
                          {ele?._id?.substring(0, 8)}...
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gold Rate</Text>
                      <Text style={styles.passfont1}>₹{ele?.goldRate}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Gold Value</Text>
                      <Text style={styles.passfont1}>₹{ele?.goldValue}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>GST</Text>
                      <Text style={styles.passfont1}>₹{(ele?.gst || 0).toFixed(2)}</Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Amount Paid</Text>
                      <Text style={[styles.passfont1, { color: "#dc3545", fontWeight: "700" }]}>
                        ₹{(ele?.amount).toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.profiles1}>
                      <Text style={styles.passfont}>Payment ID</Text>
                      <TouchableOpacity onPress={() => openTransactionModal(ele)}>
                        <Text
                          style={[
                            styles.passfont1,
                            { fontSize: 12, color: "#007bff", textDecorationLine: "underline" },
                          ]}
                        >
                          {ele?.PaymentId?.substring(0, 12)}...
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.profiles1, { borderBottomWidth: 0, backgroundColor: "#fff8e1" }]}>
                      <Text style={[styles.passfont, { color: "#f3d25b", fontWeight: "700" }]}>Store Gold</Text>
                      <Text style={[styles.passfont1, { color: "#f3d25b", fontWeight: "700" }]}>{ele?.gold} gms</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>

          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Transaction Details</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  {selectedTransaction && (
                    <>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Transaction Status:</Text>
                        <Text style={[styles.modalValue, { color: "#28a745" }]}>Completed</Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Payment Date:</Text>
                        <Text style={styles.modalValue}>
                          {moment(selectedTransaction?.createdAt).format("MMM DD, YYYY hh:mm A")}
                        </Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Purchase ID:</Text>
                        <Text style={[styles.modalValue, { fontSize: 12, fontFamily: "monospace" }]}>
                          {selectedTransaction?._id}
                        </Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Payment ID:</Text>
                        <Text style={[styles.modalValue, { fontSize: 12, fontFamily: "monospace" }]}>
                          {selectedTransaction?.PaymentId}
                        </Text>
                      </View>

                      <View style={styles.modalDivider} />

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Gold Rate:</Text>
                        <Text style={styles.modalValue}>₹{selectedTransaction?.goldRate}</Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Gold Value:</Text>
                        <Text style={styles.modalValue}>₹{selectedTransaction?.goldValue}</Text>
                      </View>

                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>GST:</Text>
                        <Text style={styles.modalValue}>₹{(selectedTransaction?.gst || 0).toFixed(2)}</Text>
                      </View>

                      <View style={[styles.modalRow, { backgroundColor: "#fff8e1", padding: 12, borderRadius: 8 }]}>
                        <Text style={[styles.modalLabel, { color: "#f3d25b", fontWeight: "700" }]}>Gold Stored:</Text>
                        <Text style={[styles.modalValue, { color: "#f3d25b", fontWeight: "700" }]}>
                          {selectedTransaction?.gold} gms
                        </Text>
                      </View>
                    </>
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  )
}

export default BookingDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container1: {
    padding: 16,
  },
  fonts: {
    color: "#1a1a1a",
    fontSize: 18,
    fontFamily: "Poppins-ExtraBoldItalic",
    fontWeight: "700",
  },
  profiles1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "#ffffff",
  },
  passfont: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "600",
    flex: 1,
  },
  passfont1: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1.5,
    textAlign: "right",
  },
  tab: {
    width: "100%",
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#f3d25b",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#6c757d",
    fontFamily: "Poppins-ExtraBoldItalic",
    textAlign: "center",
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "Poppins-ExtraBoldItalic",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  modalBody: {
    padding: 20,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  modalLabel: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "600",
    flex: 1,
  },
  modalValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1.5,
    textAlign: "right",
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#dee2e6",
    marginVertical: 16,
  },
})
