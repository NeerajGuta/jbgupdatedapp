import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
import { useState } from "react"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field"
import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const CELL_COUNT = 6
const Otp = ({ navigation, route }) => {
  const { phoneno, resetPin } = route.params || {}
  const [enableMask, setEnableMask] = useState(true)
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const { toastConfig, showSuccess, showError, hideToast } = useToast()

  const toggleMask = () => setEnableMask((f) => !f)

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null

    if (symbol) {
      textChild = enableMask ? "•" : symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    )
  }

  const checkUserOnboardingStatus = async (userDetails) => {
    try {
      const userId = userDetails.id || userDetails._id || userDetails.phoneno

      // Check user-specific onboarding data
      const userPinKey = `userPin_${userId}`
      const userTermsKey = `termsAccepted_${userId}`
      const userOnboardingKey = `onboardingCompleted_${userId}`

      const existingPin = await AsyncStorage.getItem(userPinKey)
      const termsAccepted = await AsyncStorage.getItem(userTermsKey)
      const onboardingCompleted = await AsyncStorage.getItem(userOnboardingKey)

      console.log("User onboarding status:", {
        userId,
        hasPin: !!existingPin,
        termsAccepted: termsAccepted === "true",
        onboardingCompleted: onboardingCompleted === "true",
        resetPin,
      })

      // If this is a PIN reset request, go to PIN creation
      if (resetPin) {
        console.log("PIN reset requested, going to PIN creation")
        return "PinCreation"
      }

      // If user has completed full onboarding, go to PIN verification
      if (existingPin && termsAccepted === "true" && onboardingCompleted === "true") {
        console.log("Returning user - going to PIN verification")
        return "PinVerification"
      }

      // If user has PIN but not terms, go to terms
      if (existingPin && termsAccepted !== "true") {
        console.log("User has PIN but not accepted terms, going to Terms")
        return "TermsConditions"
      }

      // If user doesn't have PIN, go to PIN creation (new user)
      if (!existingPin) {
        console.log("New user - going to PIN creation")
        return "PinCreation"
      }

      // Default fallback
      return "PinCreation"
    } catch (error) {
      console.error("Error checking user onboarding status:", error)
      return "PinCreation"
    }
  }

  const VerfiyOtp = async () => {
    if (!value) return showError("Please enter OTP to continue")

    setIsLoading(true)
    try {
      const config = {
        url: "/otpVarification",
        method: "post",
        baseURL: "http://192.168.1.26:3034/api/v1/user/auth",
        headers: { "content-type": "application/json" },
        data: {
          phoneno: phoneno,
          otp: value,
        },
      }

      const res = await axios(config)
      if (res.status === 200) {
        showSuccess("OTP verified successfully!")

        // Save user details
        await AsyncStorage.setItem("user", JSON.stringify(res.data.details))

        // Check user's onboarding status and navigate accordingly
        const nextScreen = await checkUserOnboardingStatus(res.data.details)

        setTimeout(() => {
          navigation.navigate(nextScreen)
        }, 1000)

        setValue("")
      }
    } catch (error) {
      console.log(error.response)
      if (error.response && error.response.status === 400) {
        showError("Invalid OTP. Please check and try again.")
      } else {
        showError("Verification failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={styles.container1}>
        <Toast
          visible={toastConfig.visible}
          message={toastConfig.message}
          type={toastConfig.type}
          duration={toastConfig.duration}
          onHide={hideToast}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#874701" />
          </View>
        )}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#f3d25b",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome6 name="arrow-left-long" size={20} color="white" style={{ margin: 1 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.inotp}>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Image
                source={require("../../assets/images/newlogo.png")}
                style={{ width: 100, height: 100 }}
                resizemode="cover"
              ></Image>
            </View>
            <Text style={styles.title}>{resetPin ? "Reset PIN - Verify OTP" : "Enter Your Verification Code"}</Text>
            <Text style={styles.addtitle}>OTP Sent To +91-{phoneno} </Text>
            <View style={styles.fieldRow}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
              <Text style={styles.toggle} onPress={toggleMask}>
                {enableMask ? (
                  <Entypo name="eye-with-line" size={20} style={{ marginLeft: 10 }} color="#874701" />
                ) : (
                  <Entypo name="eye" size={20} style={{ marginLeft: 10 }} color="blue" />
                )}
              </Text>
            </View>
            <View
              style={[
                styles.regback1,
                {
                  marginTop: 20,
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                },
              ]}
            >
              <TouchableOpacity onPress={() => VerfiyOtp()}>
                <LinearGradient colors={["#874701", "#874701"]} style={styles.linearGradient}>
                  <Text style={styles.btn}>Verified with OTP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Otp

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3d25b",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  inotp: {
    marginTop: "40%",
  },
  root: { flex: 1, padding: 20 },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
    marginTop: 20,
    fontWeight: "700",
  },
  addtitle: { textAlign: "center", fontSize: 18, color: "black" },
  codeFiledRoot: { marginTop: 20 },
  fieldRow: {
    height: 50,
    marginTop: 40,
    flexDirection: "row",
    marginLeft: 8,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  cell: {
    width: 36,
    height: 36,
    lineHeight: 32,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginLeft: 8,
    borderRadius: 6,
    borderColor: "blue",
    backgroundColor: "white",
    color: "black",
  },
  toggle: {
    width: 45,
    height: 45,
    lineHeight: 33,
    fontSize: 30,
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
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
    width: 250,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 100,
    width: 250,
  },
})
