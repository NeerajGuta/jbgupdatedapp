/* import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"

import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import RazorpayCheckout from "react-native-razorpay"
import { Image } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

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
          amount: netAmount,
          gold: gold,
          PaymentId: paymentid,
          totalCoin: Number(gold),
          goldRate: goldRate,
          goldValue: baseGoldValue,
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
        amount: parseFloat(netAmount) * 100,
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
  const goldValue = Number(rate[0]?.rate || goldRate)
  const goldWeight = Number(gold || 0)
  const baseGoldValue = Number(goldValue * goldWeight || 0)
  const gstAmount = (baseGoldValue * NewGst) / 100
  const totalBeforeDiscount = baseGoldValue + gstAmount
  const userTotalEarnedMoney = Number(getUser?.totalEarnedMoney || 0)
  const netAmount = totalBeforeDiscount - userTotalEarnedMoney

  console.log(NewGst, goldValue, goldWeight, baseGoldValue, gstAmount)

  // Static data for remaining options (2nd and 3rd)
  const staticMetalData = [
    {
      id: 2,
      name: "Gold",
      purity: "916",
      rate: .0,
    },
    {
      id: 3,
      name: "Silver",
      purity: "995",
      rate: .0,
    },
  ]

  // Combine backend data (first) with static data (remaining)
  const getAllMetalData = () => {
    if (rate.length > 0) {
      const backendFirst = {
        id: 1,
        name: "Gold",
        purity: rate[0]?.purity || "999",
        rate: rate[0]?.rate || 11266,
      }
      return [backendFirst, ...staticMetalData]
    }
    return staticMetalData
  }

  const metalData = getAllMetalData()

  return (
    <View style={styles.mainContainer}>
      <View style={styles.paymentCard}>
       
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Order Summary</Text>
        </View>

       
        <View style={styles.rateContainer}>
          <View style={styles.rateGrid}>
            
       
            <View style={styles.rateHeaderRow}>
              <View style={styles.headerLabelColumn}>
                
              </View>
              
              <View style={styles.metalColumnsContainer}>
               
                <View style={styles.metalColumn}>
                  <Image source={require("../../assets/images/start.png")} style={styles.goldCoin} />
                  <Text style={styles.metalName}>Gold</Text>
                  <Text style={styles.purityText}>{metalData[0]?.purity || '995'}</Text>
                </View>
                
              
                <View style={styles.metalColumn}>
                  <Image source={require("../../assets/images/start.png")} style={styles.goldCoin} />
                  <Text style={styles.metalName}>Gold</Text>
                  <Text style={styles.purityText}>{metalData[1]?.purity || '916'}</Text>
                </View>
             
                <View style={styles.metalColumn}>
                  <Image source={require("../../assets/images/silver.png")} style={styles.silverCoin} />
                  <Text style={styles.metalName}>Silver</Text>
                  <Text style={styles.purityText}>{metalData[2]?.purity || '995'}</Text>
                </View>
              </View>
            </View>

           
            <View style={styles.rateDataRow}>
              <View style={styles.rowLabel}>
                <Text style={styles.rowLabelText}>Current{'\n'}rate(₹)/gm</Text>
              </View>
              
              <View style={styles.metalColumnsContainer}>
               
                <View style={styles.valueCell}>
                  <Text style={styles.valueCellText}>
                    {metalData[0]?.rate?.toLocaleString() || '11,266'}
                  </Text>
                </View>
              
                <View style={styles.valueCell}>
                  <Text style={styles.valueCellText}>
                    {metalData[1]?.rate?.toLocaleString() || '0'}
                  </Text>
                </View>
                
               
                <View style={styles.valueCell}>
                  <Text style={styles.valueCellText}>
                    {metalData[2]?.rate?.toLocaleString() || '0'}
                  </Text>
                </View>
              </View>
            </View>

          </View>

          
          <Text style={styles.gstText}>Rates are exclusive of 3% GST</Text>
        </View>

        <View style={styles.buyGoldSection}>
          <Text style={styles.buyGoldTitle}>Buy Gold {metalData[0]?.purity || '999'}</Text>
        </View>

   
        <View style={styles.detailRow}>
          <Text style={styles.label}>Metal Type :</Text>
          <View style={styles.metalTypeContainer}>
            <Image source={require("../../assets/images/start.png")} style={styles.goldIcon} />
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
          <Text style={styles.value}>{totalBeforeDiscount?.toFixed(2)}</Text>
        </View>

        {getUser && userTotalEarnedMoney > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Balance :</Text>
            <Text style={styles.value}>- ₹{userTotalEarnedMoney}</Text>
          </View>
        )}

        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Net Amount Payable :</Text>
          <Text style={styles.totalValue}>{netAmount.toFixed(2)}</Text>
        </View>

      
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={posttransaction} disabled={isLoading}>
            <LinearGradient
              colors={["#005801", "#005801"]}
              style={[styles.linearGradientButton, isLoading && { opacity: 0.7 }]}
            >
              <Text style={styles.buttonText}>{isLoading ? "Processing..." : "Pay Online"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    padding: 15,
  },
  paymentCard: {
    backgroundColor: "#D6DBE6",
    borderRadius: 16,
    padding: 20,
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
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  // Rate Section
  rateContainer: {
    backgroundColor: "#D6DBE6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  rateGrid: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  rateHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  headerLabelColumn: {
    width: 60,
    paddingRight: 6,
  },
  metalColumnsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  metalColumn: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 1,
  },
  goldCoin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFA500",
    marginBottom: 3,
  },
  silverCoin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#B8B8B8",
    marginBottom: 3,
  },
  metalName: {
    fontSize: 9,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  purityText: {
    fontSize: 7,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  rateDataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rowLabel: {
    width: 60,
    paddingRight: 6,
  },
  rowLabelText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
    lineHeight: 12,
  },
  valueCell: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 3,
    minHeight: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6DBE6",
    marginHorizontal: 1,
  },
  valueCellText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  gstText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 3,
  },
  // Buy Gold Section
  buyGoldSection: {
    backgroundColor: "#EFF2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  buyGoldTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  // Detail Rows
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  metalTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  goldIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  metalText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    flex: 1,
  },
  totalValue: {
    fontSize: 16,
    color: "#005801",
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },
  // Disclaimer
  disclaimerContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  disclaimerText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    lineHeight: 14,
  },
  // Button
  buttonContainer: {
    width: "100%",
  },
  payButton: {
    width: "100%",
  },
  linearGradientButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  // Loading
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
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#005801",
    fontWeight: "600",
  },
}) */




import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"

import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import RazorpayCheckout from "react-native-razorpay"
import { Image } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

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
          amount: Amount, // This is the final amount user pays (GST inclusive)
          gold: gold,
          PaymentId: paymentid,
          totalCoin: Number(gold),
          goldRate: goldRate,
          goldValue: baseGoldValue,
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
        amount: Number.parseFloat(Amount) * 100, // Amount is already GST inclusive
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

  // FIXED: Proper calculation breakdown for display
  const NewGst = Number(datagst?.Sgst || 0) + Number(datagst?.Cgst || 0)
  const goldValue = Number(rate[0]?.rate || goldRate)
  const goldWeight = Number(gold || 0)

  // Calculate base amount (without GST) from the final amount user entered
  const finalAmount = Number(Amount || 0)
  const baseGoldValue = (finalAmount * 100) / (100 + NewGst)
  const gstAmount = finalAmount - baseGoldValue

  const userTotalEarnedMoney = Number(getUser?.totalEarnedMoney || 0)
  const netAmount = finalAmount - userTotalEarnedMoney

  console.log("Final Amount:", finalAmount, "Base Amount:", baseGoldValue, "GST Amount:", gstAmount)

  // Static data for remaining options (2nd and 3rd)
  const staticMetalData = [
    {
      id: 2,
      name: "Gold",
      purity: "916",
      rate: 0.0,
    },
    {
      id: 3,
      name: "Silver",
      purity: "995",
      rate: 0.0,
    },
  ]

  // Combine backend data (first) with static data (remaining)
  const getAllMetalData = () => {
    if (rate.length > 0) {
      const backendFirst = {
        id: 1,
        name: "Gold",
        purity: rate[0]?.purity || "999",
        rate: rate[0]?.rate || 11266,
      }
      return [backendFirst, ...staticMetalData]
    }
    return staticMetalData
  }

  const metalData = getAllMetalData()

  return (
    <View style={styles.mainContainer}>
      <View style={styles.paymentCard}>
        {/* Header with Back and Title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Order Summary</Text>
        </View>

        {/* Current Rate Section - Fixed Grid Layout */}
        <View style={styles.rateContainer}>
          <View style={styles.rateGrid}>
            {/* Header Row with Coins and Metal Names */}
            <View style={styles.rateHeaderRow}>
              <View style={styles.headerLabelColumn}>{/* Empty space for alignment */}</View>

              <View style={styles.metalColumnsContainer}>
                {/* Gold 24k Column */}
                <View style={styles.metalColumn}>
                  <Image source={require("../../assets/images/start.png")} style={styles.goldCoin} />
                  <Text style={styles.metalName}>Gold</Text>
                  <Text style={styles.purityText}>{metalData[0]?.purity || "999"}</Text>
                </View>

                {/* Gold 22k Column */}
                <View style={styles.metalColumn}>
                  <Image source={require("../../assets/images/start.png")} style={styles.goldCoin} />
                  <Text style={styles.metalName}>Gold</Text>
                  <Text style={styles.purityText}>{metalData[1]?.purity || "916"}</Text>
                </View>

                {/* Silver Column */}
                <View style={styles.metalColumn}>
                  <Image source={require("../../assets/images/silver.png")} style={styles.silverCoin} />
                  <Text style={styles.metalName}>Silver</Text>
                  <Text style={styles.purityText}>{metalData[2]?.purity || "995"}</Text>
                </View>
              </View>
            </View>

            {/* Current rate Row */}
            <View style={styles.rateDataRow}>
              <View style={styles.rowLabel}>
                <Text style={styles.rowLabelText}>Current{"\n"}rate(₹)/gm</Text>
              </View>

              <View style={styles.metalColumnsContainer}>
                {/* Gold 24k Rate */}
                <View style={styles.valueCell}>
                  <Text style={styles.valueCellText}>{metalData[0]?.rate?.toLocaleString() || "11,266"}</Text>
                </View>

                {/* Gold 22k Rate */}
                <View style={styles.valueCell}>
                  <Text style={styles.valueCellText}>{metalData[1]?.rate?.toLocaleString() || "0"}</Text>
                </View>

                {/* Silver Rate */}
                <View style={styles.valueCell}>
                  <Text style={styles.valueCellText}>{metalData[2]?.rate?.toLocaleString() || "0"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* GST Text */}
          <Text style={styles.gstText}>Rates are exclusive of 3% GST</Text>
        </View>

        {/* Buy Gold Section */}
        <View style={styles.buyGoldSection}>
          <Text style={styles.buyGoldTitle}>Buy Gold {metalData[0]?.purity || "999"}</Text>
        </View>

        {/* Detail Rows */}
        <View style={styles.detailRow}>
          <Text style={styles.label}>Metal Type :</Text>
          <View style={styles.metalTypeContainer}>
            <Image source={require("../../assets/images/start.png")} style={styles.goldIcon} />
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
          <Text style={styles.value}>{finalAmount?.toFixed(2)}</Text>
        </View>

        {getUser && userTotalEarnedMoney > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Balance :</Text>
            <Text style={styles.value}>- ₹{userTotalEarnedMoney}</Text>
          </View>
        )}

        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Net Amount Payable :</Text>
          <Text style={styles.totalValue}>{netAmount.toFixed(2)}</Text>
        </View>

        {/* Pay Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={posttransaction} disabled={isLoading}>
            <LinearGradient
              colors={["#005801", "#005801"]}
              style={[styles.linearGradientButton, isLoading && { opacity: 0.7 }]}
            >
              <Text style={styles.buttonText}>{isLoading ? "Processing..." : "Pay Online"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    padding: 15,
  },
  paymentCard: {
    backgroundColor: "#D6DBE6",
    borderRadius: 16,
    padding: 20,
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
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  // Rate Section
  rateContainer: {
    backgroundColor: "#D6DBE6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  rateGrid: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  rateHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  headerLabelColumn: {
    width: 60,
    paddingRight: 6,
  },
  metalColumnsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  metalColumn: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 1,
  },
  goldCoin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFA500",
    marginBottom: 3,
  },
  silverCoin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#B8B8B8",
    marginBottom: 3,
  },
  metalName: {
    fontSize: 9,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  purityText: {
    fontSize: 7,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  rateDataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rowLabel: {
    width: 60,
    paddingRight: 6,
  },
  rowLabelText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
    lineHeight: 12,
  },
  valueCell: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 3,
    minHeight: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6DBE6",
    marginHorizontal: 1,
  },
  valueCellText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  gstText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 3,
  },
  // Buy Gold Section
  buyGoldSection: {
    backgroundColor: "#EFF2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  buyGoldTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  // Detail Rows
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  metalTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  goldIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  metalText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    flex: 1,
  },
  totalValue: {
    fontSize: 16,
    color: "#005801",
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },
  // Button
  buttonContainer: {
    width: "100%",
  },
  payButton: {
    width: "100%",
  },
  linearGradientButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  // Loading
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
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#005801",
    fontWeight: "600",
  },
})
