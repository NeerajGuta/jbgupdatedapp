// import {ScrollView, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from 'moment';
// import {Image} from 'react-native-animatable';
// import LoaderKit from 'react-native-loader-kit';

// const CoinsDetails = () => {
//   const [user, setUser] = useState('');
//   const userData = async () => {
//     let user = await AsyncStorage.getItem('user');
//     setUser(JSON.parse(user));
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       userData();
//     }, []),
//   );

//   const [data, setData] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const getCoins = async _id => {
//     let user = await AsyncStorage.getItem('user');
//     user = JSON.parse(user);
//     setLoader(true);
//     try {
//       await axios
//         .get('https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/' + user?._id)
//         .then(res => {
//           if (res.status == 200) {
//             setData(res.data.success);
//             console.log(res.data.success);
//             setLoader(false);
//           } else {
//             console.log(res.error);
//           }
//         });
//     } catch (error) {
//       console.log(error);
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     getCoins();
//   }, []);

//   return (
//     <>
//       {loader ? (
//         <>
//           <View
//             style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//             <LoaderKit
//               style={{width: 50, height: 50}}
//               name={'LineSpinFadeLoader'}
//               color={'#f3d25b'}
//             />
//           </View>
//         </>
//       ) : (
//         <>
//           {data.length != 0 ? (
//             <ScrollView>
//               <View style={styles.container}>
//                 <View style={styles.container1}>
//                   <Text style={styles.fonts}>Withdraw Coins Details</Text>
//                   {data.reverse().map((ele, index) => {
//                     return (
//                       <View style={styles.tab}>
//                         <View style={styles.profiles1}>
//                           <Text style={styles.passfont}>Pending Coin</Text>
//                           <Text style={styles.passfont1}>
//                             {Math.max(
//                               0,
//                               Number(ele?.coins || 0) -
//                                 Number(ele?.requestedCoin || 0),
//                             ).toFixed(4)}{' '}
//                             gms
//                           </Text>
//                         </View>

//                         {/* <View style={styles.profiles1}>
//                       <Text style={styles.passfont}>S.No.</Text>
//                       <Text style={styles.passfont1}>{index + 1}</Text>
//                     </View> */}
//                         <View style={styles.profiles1}>
//                           <Text style={styles.passfont}>Request Id </Text>

//                           <Text style={styles.passfont1}>{ele?._id}</Text>
//                         </View>
//                         <View style={styles.profiles1}>
//                           <Text style={styles.passfont}>Coin with you</Text>
//                           <Text style={[styles.passfont1, {color: '#00A9FF'}]}>
//                             {Number(ele?.coins).toFixed(4)} gms
//                           </Text>
//                         </View>
//                         <View style={styles.profiles1}>
//                           <Text style={styles.passfont}>Requested Coin</Text>
//                           <Text style={[styles.passfont1, {color: 'green'}]}>
//                             {Number(ele?.coins || 0).toFixed(4)} gms
//                           </Text>
//                         </View>
//                         {/* <View style={styles.profiles1}>
//                     <Text style={styles.passfont}>Amount Transaction</Text>
//                     <Text style={styles.passfont1}>₹ {ele?.amount}</Text>
//                   </View> */}

//                         {/* <View style={styles.profiles1}>
//                     <Text style={styles.passfont}>Payment Id</Text>
//                     <Text style={styles.passfont1}>{ele?.PaymentId}</Text>
//                   </View> */}

//                         {/* <View style={styles.profiles1}>
//                           <Text style={styles.passfont}>Pending Coin</Text>
//                           <Text style={[styles.passfont1, {color: 'green'}]}>
//                             {Number(ele?.requestedCoin || 0).toFixed(4)} gms
//                           </Text>
//                         </View> */}

//                         <View style={styles.profiles1}>
//                           <Text style={styles.passfont}>Status</Text>
//                           <Text
//                             style={[
//                               styles.passfont1,
//                               {color: ele?.status === 'Hold' ? 'red' : 'green'},
//                             ]}>
//                             {ele?.status}
//                           </Text>
//                         </View>
//                       </View>
//                     );
//                   })}
//                 </View>
//               </View>
//             </ScrollView>
//           ) : (
//             <>
//               {/* <View>
//             <Text
//               style={{
//                 padding: 10,
//                 color: 'black',
//                 fontSize: 26,
//                 fontWeight: '600',
//               }}>
//               History Coins Details
//             </Text>
//           </View> */}
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     color: 'black',
//                     fontFamily: 'Poppins-ExtraBoldItalic',
//                   }}>
//                   No History Coins Details
//                 </Text>
//               </View>
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default CoinsDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   container1: {
//     padding: 10,
//   },
//   fonts: {
//     color: 'black',
//     fontSize: 17,
//     fontFamily: 'Poppins-ExtraBoldItalic',
//   },
//   profiles1: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 6,
//     paddingRight: 6,
//     paddingTop: 6,
//     paddingBottom: 6,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3d25b',
//   },
//   passfont: {
//     fontSize: 14,
//     color: 'black',
//     fontWeight: '700',
//   },
//   passfont1: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: 'black',
//   },
//   tab: {
//     width: '100%',
//     marginTop: 8,
//     marginBottom: 8,
//     marginRight: 8,
//     // marginLeft: 2,
//     borderWidth: 1,
//     borderBottomWidth: 0,
//     borderColor: '#f3d25b',
//   },
// });
/* 
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

  const [alltransiction, setAlltransiction] = useState([]);
  const [allcoin, setAllcoin] = useState([]);
  const [loading, setLoading] = useState(false);

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
              'idddddddddddddddddddddddddddddddddddddddddd',
              user?._id,
            );
            setAlltransiction(res.data.success);
            setLoading(true);
          } else {
            console.log(res.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const coinsData =
    allcoin?.reduce((a, i) => a + Number(i?.coins || 0), 0) || 0;
  const transicitionData =
    alltransiction?.reduce((a, i) => a + Number(i?.gold || 0), 0) || 0;

  const [data, setData] = useState([]);
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
            setData(res.data.success);
            setAllcoin(res.data.success); // Initialize allcoin here
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
    userTransaction();
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
                          <Text style={styles.passfont}>Request Id </Text>
                          <Text style={styles.passfont1}>{ele?._id}</Text>
                        </View>
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Coin with you</Text>
                          <Text style={[styles.passfont1, {color: '#00A9FF'}]}>
                            {Number(transicitionData - coinsData).toFixed(4)}
                            gms
                          </Text>
                        </View>
                        <View style={styles.profiles1}>
                          <Text style={styles.passfont}>Requested Coin</Text>
                          <Text style={[styles.passfont1, {color: 'green'}]}>
                            {Number(ele?.coins || 0).toFixed(4)} gms
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
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#f3d25b',
  },
});
 */





import { ScrollView, StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LoaderKit from "react-native-loader-kit"
import Icon from "react-native-vector-icons/MaterialIcons"

const { width } = Dimensions.get("window")

const CoinsDetails = () => {
  const [user, setUser] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [alltransiction, setAlltransiction] = useState([])
  const [allcoin, setAllcoin] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  const userData = async () => {
    const user = await AsyncStorage.getItem("user")
    setUser(JSON.parse(user))
  }

  useFocusEffect(
    React.useCallback(() => {
      userData()
    }, []),
  )

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

  const coinsData = allcoin?.reduce((a, i) => a + Number(i?.coins || 0), 0) || 0
  const transicitionData = alltransiction?.reduce((a, i) => a + Number(i?.gold || 0), 0) || 0

  const getCoins = async (_id) => {
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    setLoader(true)
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/coins/singalcoins/" + user?._id).then((res) => {
        if (res.status == 200) {
          setData(res.data.success)
          setAllcoin(res.data.success) // Initialize allcoin here
          console.log(res.data.success)
          setLoader(false)
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  useEffect(() => {
    getCoins()
    userTransaction()
  }, [])

  const handleRequestIdPress = (request) => {
    setSelectedRequest(request)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      {loader ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderCard}>
            <LoaderKit style={{ width: 60, height: 60 }} name={"LineSpinFadeLoader"} color={"#f3d25b"} />
            <Text style={styles.loadingText}>Loading Coin Details...</Text>
          </View>
        </View>
      ) : (
        <>
          {data.length != 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
            {/*   <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Icon name="account-balance-wallet" size={28} color="#f3d25b" />
                  <Text style={styles.headerTitle}>Withdraw Coins Details</Text>
                </View>
              </View> */}

              <View style={styles.contentContainer}>
                <View style={styles.summaryCard}>
                  <View style={styles.summaryContent}>
                    <View style={styles.summaryItem}>
                      <Icon name="savings" size={24} color="#f3d25b" />
                      <View style={styles.summaryTextContainer}>
                        <Text style={styles.summaryLabel}>Available Coins</Text>
                        <Text style={styles.summaryValue}>{Number(transicitionData - coinsData).toFixed(4)} gms</Text>
                      </View>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                      <Icon name="history" size={24} color="#f3d25b" />
                      <View style={styles.summaryTextContainer}>
                        <Text style={styles.summaryLabel}>Total Requests</Text>
                        <Text style={styles.summaryValue}>{data.length}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {data.reverse().map((ele, index) => {
                  return (
                    <View key={index} style={styles.transactionCard}>
                      <View style={styles.cardHeader}>
                        <Icon name="receipt" size={20} color="#f3d25b" />
                        <Text style={styles.cardTitle}>Request #{index + 1}</Text>
                        <View
                          style={[
                            styles.statusBadge,
                            {
                              backgroundColor: ele?.status === "Hold" ? "#ffebee" : "#e8f5e8",
                            },
                          ]}
                        >
                          <Text style={[styles.statusText, { color: ele?.status === "Hold" ? "#d32f2f" : "#2e7d32" }]}>
                            {ele?.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.cardContent}>
                        <View style={styles.detailRow}>
                          <View style={styles.detailLeft}>
                            <Icon name="fingerprint" size={16} color="#b0b0b0" />
                            <Text style={styles.detailLabel}>Request ID</Text>
                          </View>
                          <TouchableOpacity onPress={() => handleRequestIdPress(ele)} style={styles.clickableId}>
                            <Text style={[styles.detailValue, styles.clickableText]} numberOfLines={1}>
                              {ele?._id}
                            </Text>
                            <Icon name="visibility" size={16} color="#f3d25b" style={styles.viewIcon} />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.detailRow}>
                          <View style={styles.detailLeft}>
                            <Icon name="account-balance-wallet" size={16} color="#b0b0b0" />
                            <Text style={styles.detailLabel}>Available Coins</Text>
                          </View>
                          <Text style={[styles.detailValue, { color: "#00A9FF" }]}>
                            {Number(transicitionData - coinsData).toFixed(4)} gms
                          </Text>
                        </View>

                        <View style={styles.detailRow}>
                          <View style={styles.detailLeft}>
                            <Icon name="request-quote" size={16} color="#b0b0b0" />
                            <Text style={styles.detailLabel}>Requested Amount</Text>
                          </View>
                          <Text style={[styles.detailValue, { color: "#4caf50", fontWeight: "700" }]}>
                            {Number(ele?.coins || 0).toFixed(4)} gms
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyCard}>
                <Icon name="history" size={80} color="#f3d25b" />
                <Text style={styles.emptyTitle}>No Coin History</Text>
                <Text style={styles.emptySubtitle}>You haven't made any coin withdrawal requests yet</Text>
              </View>
            </View>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Icon name="receipt-long" size={24} color="#f3d25b" />
                  <Text style={styles.modalTitle}>Request Details</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Icon name="close" size={24} color="#666666" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                  {selectedRequest && (
                    <>
                      <View style={styles.modalDetailCard}>
                        <View style={styles.modalDetailRow}>
                          <Icon name="fingerprint" size={18} color="#f3d25b" />
                          <Text style={styles.modalDetailLabel}>Request ID</Text>
                        </View>
                        <Text style={styles.modalDetailValue} selectable={true}>
                          {selectedRequest._id}
                        </Text>
                      </View>

                      <View style={styles.modalDetailCard}>
                        <View style={styles.modalDetailRow}>
                          <Icon name="info" size={18} color="#f3d25b" />
                          <Text style={styles.modalDetailLabel}>Status</Text>
                        </View>
                        <View
                          style={[
                            styles.modalStatusBadge,
                            { backgroundColor: selectedRequest.status === "Hold" ? "#ffebee" : "#e8f5e8" },
                          ]}
                        >
                          <Text
                            style={[
                              styles.modalStatusText,
                              { color: selectedRequest.status === "Hold" ? "#d32f2f" : "#2e7d32" },
                            ]}
                          >
                            {selectedRequest.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.modalDetailCard}>
                        <View style={styles.modalDetailRow}>
                          <Icon name="request-quote" size={18} color="#f3d25b" />
                          <Text style={styles.modalDetailLabel}>Requested Amount</Text>
                        </View>
                        <Text style={[styles.modalDetailValue, { color: "#4caf50", fontSize: 18, fontWeight: "700" }]}>
                          {Number(selectedRequest.coins || 0).toFixed(4)} gms
                        </Text>
                      </View>

                      <View style={styles.modalDetailCard}>
                        <View style={styles.modalDetailRow}>
                          <Icon name="schedule" size={18} color="#f3d25b" />
                          <Text style={styles.modalDetailLabel}>Request Date</Text>
                        </View>
                        <Text style={styles.modalDetailValue}>
                          {selectedRequest.createdAt ? new Date(selectedRequest.createdAt).toLocaleString() : "N/A"}
                        </Text>
                      </View>

                      <View style={styles.modalDetailCard}>
                        <View style={styles.modalDetailRow}>
                          <Icon name="account-balance-wallet" size={18} color="#f3d25b" />
                          <Text style={styles.modalDetailLabel}>Available Balance</Text>
                        </View>
                        <Text style={[styles.modalDetailValue, { color: "#00A9FF", fontSize: 16, fontWeight: "600" }]}>
                          {Number(transicitionData - coinsData).toFixed(4)} gms
                        </Text>
                      </View>

                      {selectedRequest.remarks && (
                        <View style={styles.modalDetailCard}>
                          <View style={styles.modalDetailRow}>
                            <Icon name="note" size={18} color="#f3d25b" />
                            <Text style={styles.modalDetailLabel}>Remarks</Text>
                          </View>
                          <Text style={styles.modalDetailValue}>{selectedRequest.remarks}</Text>
                        </View>
                      )}
                    </>
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  )
}

export default CoinsDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingText: {
    color: "#333333",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginTop: 15,
  },
  header: {
    backgroundColor: "#f3d25b",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    color: "#333333",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginLeft: 12,
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    marginBottom: 25,
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  summaryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  summaryTextContainer: {
    marginLeft: 12,
  },
  summaryLabel: {
    color: "#666666",
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    marginBottom: 2,
  },
  summaryValue: {
    color: "#333333",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  summaryDivider: {
    width: 2,
    height: 45,
    backgroundColor: "#f3d25b",
    marginHorizontal: 25,
    borderRadius: 1,
  },
  transactionCard: {
    backgroundColor: "#ffffff",
    marginBottom: 18,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fafafa",
  },
  cardTitle: {
    color: "#333333",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    marginLeft: 12,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  statusText: {
    fontSize: 13,
    fontFamily: "Poppins-Bold",
  },
  cardContent: {
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    marginBottom: 2,
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    color: "#666666",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginLeft: 10,
  },
  detailValue: {
    color: "#333333",
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    flex: 1,
    textAlign: "right",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyTitle: {
    color: "#333333",
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    marginTop: 25,
    textAlign: "center",
  },
  emptySubtitle: {
    color: "#666666",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginTop: 12,
    textAlign: "center",
    lineHeight: 26,
  },
  clickableId: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  clickableText: {
    color: "#f3d25b",
    textDecorationLine: "underline",
  },
  viewIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    color: "#333333",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginLeft: 12,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    padding: 20,
  },
  modalDetailCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  modalDetailLabel: {
    color: "#666666",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginLeft: 10,
  },
  modalDetailValue: {
    color: "#333333",
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 22,
  },
  modalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  modalStatusText: {
    fontSize: 13,
    fontFamily: "Poppins-Bold",
  },
})
