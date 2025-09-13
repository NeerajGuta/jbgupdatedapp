/* import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"

import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import RazorpayCheckout from "react-native-razorpay"
import RNRestart from "react-native-restart"

const Pay = ({ navigation, route }) => {
  const { Amount, gold, goldRate } = route.params
  // console.log('checkkk-->', Amount, gold, goldRate);

  const [user, setUser] = useState("")
  // console.log(user, user?.totalEarnedMoney, 'user');

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // userGetAPi
  const [getUser, setGetuser] = useState(null) // Initialize with null or an empty object

  const userID = async (userId) => {
    try {
      const response = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/user/auth/user/${userId}`)

      if (response.status === 200) {
        setGetuser(response.data.user)
      } else {
        console.error("Unexpected response status:", response.status)
      }
    } catch (error) {
      console.log("Error fetching user:", error)
    }
  }

  // console.log(user);

  const [RedCodeID, setRedCodeID] = useState({})
  const [ActiveStatus, setActiveStatus] = useState({})
  const [referralCode, setReferralCode] = useState("") // Declare setReferralCode
  const [error, setError] = useState("") // Declare setError

  const getrefCode = async () => {
    try {
      // if (!user?._id) {
      //   throw new Error('User ID is not available');
      // }

      const res = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/refCode/${user._id}`)

      // console.log('referalcode', res);

      if (res.status === 200) {
        setRedCodeID(res.data)
        setActiveStatus(res.data.status === "Inactive")
      } else {
        console.error(`Unexpected response status: ${res.status}`)
      }
    } catch (error) {
      console.error("Error fetching referral code:", error?.message)
    }
  }

  // console.log('user?._id', user?._id);

  const userData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        userID(parsedUser._id)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      userData()
    }, []),
  )

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
      const response = await axios.put("https://justbuynewbackend.onrender.com/api/v1/changestatus", {
        receiverId: user?._id,
      })
      console.log("Success", response.data.message)
      // navigation.navigate('Home1');
      setReferralCode(" ")
    } catch (error) {
      // Alert.alert(error.response?.data?.message || 'An error occurred');
      // console.log(error, 'errorggggg');
    }
  }
  // handleReferralSubmit('credit');

  // // For debit operation
  // handleReferralSubmit('debit');

  // Earned Bonus Amount
  // const [datas, setDatas] = useState([]);
  // console.log(datas, 'dstsss');
  const fetchUserReferralStats = async (userId) => {
    try {
      const response = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/user/${userId}`)
      if (response.status === 200) {
        setData(response.data.totalRupeesEarned)
      } else {
        console.error("Unexpected response status:", response.status)
        setError("Unexpected response status.")
      }
    } catch (error) {
      console.error("Error fetching referral stats:", error?.response ? error?.response?.data?.message : error?.message)
    }
  }

  // total

  // Payment
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
          amount: TotalPayableAmount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: Number(gold),
          goldRate: goldRate,
          goldValue: goldValue * gold,
          gst: gstAmount,
          // totalCoin: totalgoldStore + Number(gold),
        },
      }
      console.log("user", user._id, Amount, gold)
      await axios(config).then((res) => {
        if (res.status == 200) {
          // console.log('success');
          // Alert.alert('Successfully');
          // userTransaction();
          handleReferralSubmit()
          setTimeout(() => {
            RNRestart.restart()
          }, 100)
        }
      })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const posttransaction = async () => {
    setIsLoading(true)
    try {
      var options = {
        key: "rzp_test_FAe0X6xLYXaXHe",
        amount: TotalPayableAmount * 100,
        // amount: '500',
        currency: "INR",
        name: "JustBuyGold",
        description: "Order Amount",
        image: "./assets/images/app-logo.jpg",
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
        })
        .catch((error) => {
          // handle failure
          Alert.alert(`Error: ${error.code} | ${error.description}`)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  // Get Gst+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [datagst, setDatagst] = useState({})
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
        setDatagst(result.data.success)
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }
  // ferngfernvnernfv
  const [rate, setRate] = useState([])
  const [objRate, setObjRate] = useState({})
  // console.log(objRate, 'objRate>>>>>>>>>>>>>>>>...');
  const getRate = async () => {
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/rate/allrate").then((res) => {
        if (res.status === 200) {
          setRate(res.data.success)
          setObjRate(res.data.success[0])
          // setLoading(true);
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getRate()
    getGst()
  }, [])

  const NewGst = Number(datagst?.Sgst || 0) + Number(datagst?.Cgst || 0)
  const goldValue = Number(rate[0]?.rate || 0) // Rate per gram
  const goldWeight = Number(gold || 0) // Gold quantity in grams
  const baseGoldValue = Number(goldValue * goldWeight || 0)
  const gstAmount = (baseGoldValue * NewGst) / 100

  console.log(NewGst, goldValue, goldWeight, baseGoldValue, gstAmount)

  // Ensure getUser is properly handled
  const userTotalEarnedMoney = Number(getUser?.totalEarnedMoney || 0)

  // Total Payable Amount Calculation
  const TotalPayableAmount = Math.round(baseGoldValue + gstAmount - userTotalEarnedMoney)

  console.log(TotalPayableAmount)

  // console.log(allCalulation, gstwithPrice, 'jefowej');
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#ffff" }}>
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
          <Text style={styles.value}>₹{(TotalPayableAmount - baseGoldValue?.toFixed(2)).toFixed(2)}</Text>
        </View>
       
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
        <TouchableOpacity style={{ marginTop: 20 }} onPress={posttransaction} disabled={isLoading}>
          <LinearGradient
            colors={["#874701", "#874701"]}
            style={[styles.linearGradientmodel, isLoading && { opacity: 0.7 }]}
          >
            <Text style={styles.btn}>{isLoading ? "Processing..." : "Pay Now"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#874701" />
            <Text style={styles.loadingText}>Processing Payment...</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default Pay

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    margin: "auto",
    padding: 20,
    // borderRadius: 8,
    // backgroundColor: '#fff',
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  detailItem: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  value: {
    color: "#333",
    fontSize: 16,
  },
  btn: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "#874701",
    color: "white",
    fontWeight: "700",
    padding: 2,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    alignContent: "center",
  },
  linearGradientmodel: {
    borderRadius: 100,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#874701",
    fontWeight: "600",
  },
})
 */



"use client"

import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"

import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import RazorpayCheckout from "react-native-razorpay"

const Pay = ({ navigation, route }) => {
  const { Amount, gold, goldRate } = route.params

  const [user, setUser] = useState("")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [getUser, setGetuser] = useState(null)

  const userID = async (userId) => {
    try {
      const response = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/user/auth/user/${userId}`)

      if (response.status === 200) {
        setGetuser(response.data.user)
      } else {
        console.error("Unexpected response status:", response.status)
      }
    } catch (error) {
      console.log("Error fetching user:", error)
    }
  }

  const [RedCodeID, setRedCodeID] = useState({})
  const [ActiveStatus, setActiveStatus] = useState({})
  const [referralCode, setReferralCode] = useState("")
  const [error, setError] = useState("")

  const getrefCode = async () => {
    try {
      const res = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/refCode/${user._id}`)

      if (res.status === 200) {
        setRedCodeID(res.data)
        setActiveStatus(res.data.status === "Inactive")
      } else {
        console.error(`Unexpected response status: ${res.status}`)
      }
    } catch (error) {
      console.error("Error fetching referral code:", error?.message)
    }
  }

  const userData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        userID(parsedUser._id)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      userData()
    }, []),
  )

  const handleReferralSubmit = async () => {
    try {
      const response = await axios.put("https://justbuynewbackend.onrender.com/api/v1/changestatus", {
        receiverId: user?._id,
      })
      console.log("Success", response.data.message)
      setReferralCode(" ")
    } catch (error) {
      // Handle error
    }
  }

  const fetchUserReferralStats = async (userId) => {
    try {
      const response = await axios.get(`https://justbuynewbackend.onrender.com/api/v1/user/${userId}`)
      if (response.status === 200) {
        setData(response.data.totalRupeesEarned)
      } else {
        console.error("Unexpected response status:", response.status)
        setError("Unexpected response status.")
      }
    } catch (error) {
      console.error("Error fetching referral stats:", error?.response ? error?.response?.data?.message : error?.message)
    }
  }

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
          amount: TotalPayableAmount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: Number(gold),
          goldRate: goldRate,
          goldValue: goldValue * gold,
          gst: gstAmount,
        },
      }
      console.log("user", user._id, Amount, gold)
      await axios(config).then((res) => {
        if (res.status == 200) {
          handleReferralSubmit()
          setTimeout(() => {
            setIsLoading(false)
            Alert.alert("Payment Successful!", "Your gold purchase has been completed successfully.", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Home1"),
              },
            ])
          }, 100)
        }
      })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const posttransaction = async () => {
    setIsLoading(true)
    try {
      var options = {
        key: "rzp_test_FAe0X6xLYXaXHe",
        amount: TotalPayableAmount * 100,
        currency: "INR",
        name: "JustBuyGold",
        description: "Order Amount",
        image: "./assets/images/app-logo.jpg",
        customerId: user?._id,
        handler: (response) => {
          setpaymentId(response.razorpay_payment_id)
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneno,
        },
        theme: { color: "#22C55E" },
      }
      RazorpayCheckout.open(options)
        .then((data) => {
          Alert.alert(`Success: ${data.razorpay_payment_id}`)
          placeorder(data.razorpay_payment_id)
        })
        .catch((error) => {
          Alert.alert(`Error: ${error.code} | ${error.description}`)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const [datagst, setDatagst] = useState({})
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
        setDatagst(result.data.success)
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [rate, setRate] = useState([])
  const [objRate, setObjRate] = useState({})

  const getRate = async () => {
    try {
      await axios.get("https://justbuynewbackend.onrender.com/api/v1/rate/allrate").then((res) => {
        if (res.status === 200) {
          setRate(res.data.success)
          setObjRate(res.data.success[0])
        } else {
          console.log(res.error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRate()
    getGst()
  }, [])

  const NewGst = Number(datagst?.Sgst || 0) + Number(datagst?.Cgst || 0)
  const goldValue = Number(rate[0]?.rate || 0)
  const goldWeight = Number(gold || 0)
  const baseGoldValue = Number(goldValue * goldWeight || 0)
  const gstAmount = (baseGoldValue * NewGst) / 100

  console.log(NewGst, goldValue, goldWeight, baseGoldValue, gstAmount)

  const userTotalEarnedMoney = Number(getUser?.totalEarnedMoney || 0)
  const TotalPayableAmount = Math.round(baseGoldValue + gstAmount - userTotalEarnedMoney)

  console.log(TotalPayableAmount)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.paymentCard}>
        <Text style={styles.title}>Buy Gold 999</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Metal Type :</Text>
          <View style={styles.metalTypeContainer}>
            <View style={styles.goldCoin}>
              <Text style={styles.coinText}>GOLD</Text>
            </View>
            <Text style={styles.metalText}>Gold</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Quantity :</Text>
          <Text style={styles.value}>{gold} gm</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount :</Text>
          <Text style={styles.value}>{baseGoldValue?.toFixed(2)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>GST @ {NewGst}% :</Text>
          <Text style={styles.value}>{gstAmount?.toFixed(2)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Amount :</Text>
          <Text style={styles.value}>{(baseGoldValue + gstAmount)?.toFixed(2)}</Text>
        </View>

        {getUser && getUser?.totalEarnedMoney > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Balance :</Text>
            <Text style={styles.value}>- ₹{getUser?.totalEarnedMoney}</Text>
          </View>
        )}

        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Net Amount Payable :</Text>
          <Text style={styles.totalValue}>{TotalPayableAmount}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={posttransaction} disabled={isLoading}>
          <LinearGradient
            colors={["#22C55E", "#16A34A"]}
            style={[styles.linearGradientmodel, isLoading && { opacity: 0.7 }]}
          >
            <Text style={styles.btn}>{isLoading ? "Processing..." : "Pay Now"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22C55E" />
            <Text style={styles.loadingText}>Processing Payment...</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default Pay

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  metalTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  goldCoin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  coinText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#B8860B",
  },
  metalText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 20,
    color: "#22C55E",
    fontWeight: "bold",
  },
  payButton: {
    marginTop: 30,
  },
  linearGradientmodel: {
    borderRadius: 25,
    paddingVertical: 15,
  },
  btn: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#22C55E",
    fontWeight: "600",
  },
})
