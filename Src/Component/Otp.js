

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
import { useState, useEffect, useRef } from "react"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field"
import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const { width } = Dimensions.get("window")
const CELL_COUNT = 6

const Otp = ({ navigation, route }) => {
  // ==================== STATE VARIABLES ====================
  const { phoneno, resetPin } = route.params || {}
  const [enableMask, setEnableMask] = useState(true)
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  // ==================== ANIMATION REFS ====================
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const logoScaleAnim = useRef(new Animated.Value(1)).current

  // ==================== HOOKS ====================
  const { toastConfig, showSuccess, showError, hideToast } = useToast()

  // ==================== ANIMATION EFFECTS ====================
  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()

    // Logo pulse animation
    const logoLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(logoScaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    )
    logoLoop.start()

    return () => logoLoop.stop()
  }, [])

  // ==================== UTILITY FUNCTIONS ====================
  const toggleMask = () => setEnableMask((f) => !f)

  // ==================== OTP CELL RENDERER ====================
  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null

    if (symbol) {
      textChild = enableMask ? "•" : symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <View key={index} style={[styles.cellContainer, isFocused && styles.focusCellContainer]}>
        <Text style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
          {textChild}
        </Text>
      </View>
    )
  }

  // ==================== USER ONBOARDING STATUS CHECK ====================
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

  // ==================== OTP VERIFICATION FUNCTION ====================
  const VerfiyOtp = async () => {
    if (!value) return showError("Please enter OTP to continue")

    setIsLoading(true)
    try {
      const config = {
        url: "/otpVarification",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/user/auth",
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
      {/* ==================== STATUS BAR ==================== */}
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />

      <View style={styles.container}>
        {/* ==================== TOAST NOTIFICATIONS ==================== */}
        <Toast
          visible={toastConfig.visible}
          message={toastConfig.message}
          type={toastConfig.type}
          duration={toastConfig.duration}
          onHide={hideToast}
        />

        {/* ==================== LOADING OVERLAY ==================== */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#874701" />
              <Text style={styles.loadingText}>Verifying OTP...</Text>
            </View>
          </View>
        )}

        {/* ==================== BACKGROUND DECORATIVE CIRCLES ==================== */}
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.backgroundCircle3} />

        {/* ==================== HEADER SECTION ==================== */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome6 name="arrow-left-long" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* ==================== MAIN CONTENT CONTAINER ==================== */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* ==================== LOGO SECTION ==================== */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScaleAnim }],
              },
            ]}
          >
            <View style={styles.logoBackground}>
              <Image
                source={require("../../assets/images/Buygold.jpg")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* ==================== TITLE SECTION ==================== */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{resetPin ? "Reset PIN - Verify OTP" : "Enter Verification Code"}</Text>
            <Text style={styles.subtitle}>OTP sent to +91-{phoneno}</Text>
          </View>

          {/* ==================== OTP INPUT SECTION ==================== */}
          <View style={styles.otpSection}>
            <Text style={styles.otpLabel}>Enter 6-digit OTP</Text>

            <View style={styles.otpContainer}>
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
              </View>

              {/* ==================== TOGGLE VISIBILITY BUTTON ==================== */}
              <TouchableOpacity onPress={toggleMask} style={styles.toggleButton}>
                <Entypo name={enableMask ? "eye-with-line" : "eye"} size={18} color="#874701" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ==================== VERIFY BUTTON ==================== */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={VerfiyOtp} style={styles.verifyButtonWrapper}>
              <LinearGradient
                colors={["#874701", "#a55a02"]}
                style={styles.verifyButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.verifyButtonText}>Verify OTP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  )
}

export default Otp

// ==================== STYLES ====================
const styles = StyleSheet.create({
  // ==================== MAIN CONTAINER STYLES ====================
  container: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },

  // ==================== LOADING STYLES ====================
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(243, 210, 91, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#874701",
    fontWeight: "600",
  },

  // ==================== BACKGROUND DECORATION STYLES ====================
  backgroundCircle1: {
    position: "absolute",
    top: 100,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(135, 71, 1, 0.1)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: 200,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(135, 71, 1, 0.08)",
  },
  backgroundCircle3: {
    position: "absolute",
    top: 300,
    left: 250,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(135, 71, 1, 0.06)",
  },

  // ==================== HEADER STYLES ====================
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ==================== CONTENT CONTAINER STYLES ====================
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // ==================== LOGO STYLES ====================
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#874701",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: "rgba(135, 71, 1, 0.2)",
  },
  logoImage: {
    width: 75,
    height: 75,
  },

  // ==================== TITLE STYLES ====================
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "600",
  },

  // ==================== OTP SECTION STYLES ====================
  otpSection: {
    alignItems: "center",
    marginBottom: 50,
    width: "100%",
  },
  otpLabel: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==================== OTP CELL STYLES ====================
  cellContainer: {
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "rgba(135, 71, 1, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  focusCellContainer: {
    borderColor: "#874701",
    backgroundColor: "white",
    shadowColor: "#874701",
    shadowOpacity: 0.3,
    transform: [{ scale: 1.03 }],
  },
  cell: {
    width: 35,
    height: 42,
    lineHeight: 38,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#874701",
  },
  focusCell: {
    color: "#874701",
  },

  // ==================== TOGGLE BUTTON STYLES ====================
  toggleButton: {
    marginLeft: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(135, 71, 1, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  // ==================== VERIFY BUTTON STYLES ====================
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  verifyButtonWrapper: {
    shadowColor: "#874701",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  verifyButton: {
    width: 260,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
  },
})
