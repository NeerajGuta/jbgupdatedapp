"use client"

import { useEffect, useState, useRef } from "react"
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  AppState,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native"
import Home from "./Src/Component/Home"
import SlapScreen from "./Src/Component/SlapScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import SignUp from "./Src/Component/SignUp"
import SignIn from "./Src/Component/SignIn"
import Otp from "./Src/Component/Otp"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Entypo"
import MyAccount from "./Src/Component/MyAccount"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import More from "./Src/Component/More"
import { PaperProvider } from "react-native-paper"
import ProfileUpdate from "./Src/Component/ProfileUpdate"
import ChangePassword from "./Src/Component/ChangePassword"
import EmailOtp from "./Src/Component/EmailOtp"
import NewPassword from "./Src/Component/NewPassword"
import AboutUs from "./Src/Component/AboutUs"
import PrivacyPolicy from "./Src/Component/PrivacyPolicy"
import BookingDetails from "./Src/Component/BookingDetails"
import CoinsDetails from "./Src/Component/CoinsDetails"
import TermsCondition from "./Src/Component/TermsCondition"
import Disclaimer from "./Src/Component/Disclaimer"
import Paymentpage from "./Src/Component/Paymentpage"
import Help from "./Src/Component/Help"
import ReferralScreen from "./Src/Component/ReferralScreen"
import Pay from "./Src/Component/Pay"
import EarnedBonusPoint from "./Src/Component/EarnedBonusPoint"
import Imagezoom from "./Src/Component/Imagezoom"
import SpasssSc from "./Src/Component/SplashScreen"
import PinCreation from "./Src/Component/PinCreation"
import TermsConditions from "./Src/Component/TermsConditions"
import PinVerification from "./Src/Component/PinVerification"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const { height: screenHeight } = Dimensions.get('window')

// App State Manager Hook - FIXED VERSION
const useAppStateManager = () => {
  const [appState, setAppState] = useState(AppState.currentState)
  const [needsPinVerification, setNeedsPinVerification] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isFirstLaunch, setIsFirstLaunch] = useState(true)
  const appLaunchTime = useRef(Date.now())
  const backgroundTime = useRef(null)

  useEffect(() => {
    // Only check authentication on the very first app launch
    if (isFirstLaunch) {
      console.log("🚀 FIRST APP LAUNCH - Checking if PIN needed")
      checkAuthenticationForFreshLaunch()
      setIsFirstLaunch(false)
    }

    const handleAppStateChange = (nextAppState) => {
      console.log("📱 App state changed:", appState, "->", nextAppState)

      // When app comes to ACTIVE from background/inactive
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        const timeInBackground = backgroundTime.current ? Date.now() - backgroundTime.current : 0
        console.log(`🔄 App returned to foreground after ${timeInBackground}ms in background`)

        // If PIN verification was already needed, keep it needed
        // Only clear if user was already authenticated before going to background
        console.log("📱 App returned from background - maintaining current PIN state")
      }

      // When app goes to background/inactive from active
      if (appState === "active" && nextAppState.match(/inactive|background/)) {
        backgroundTime.current = Date.now()
        console.log("📱 App went to background at:", new Date(backgroundTime.current).toLocaleTimeString())

        // DO NOT set PIN verification needed for background transitions
        // PIN is ONLY needed for fresh app launches
      }

      setAppState(nextAppState)
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => subscription?.remove()
  }, [appState, isFirstLaunch])

  const checkAuthenticationForFreshLaunch = async () => {
    try {
      setIsCheckingAuth(true)
      console.log("🔍 Checking authentication for FRESH app launch")

      // Check if user is logged in
      const userLoggedIn = await AsyncStorage.getItem("userLoggedIn")
      const userDetails = await AsyncStorage.getItem("user")

      console.log("👤 User logged in flag:", userLoggedIn)
      console.log("📄 User details exist:", !!userDetails)

      // User is considered logged in if they have user details
      const isUserLoggedIn = userDetails !== null && userDetails !== undefined

      if (isUserLoggedIn) {
        console.log("✅ User is logged in - checking if PIN exists")
        const parsedUser = JSON.parse(userDetails)
        const userId = parsedUser.id || parsedUser._id || parsedUser.phoneno

        // Check if user has a PIN
        const userPinKey = `userPin_${userId}`
        const storedPin = await AsyncStorage.getItem(userPinKey)

        console.log("🔐 User has PIN:", !!storedPin)

        if (storedPin) {
          console.log("🔒 FRESH LAUNCH + PIN EXISTS = PIN VERIFICATION REQUIRED")
          setNeedsPinVerification(true)
        } else {
          console.log("🔓 No PIN found - no verification needed")
          setNeedsPinVerification(false)
        }
      } else {
        console.log("❌ User not logged in - no PIN verification needed")
        setNeedsPinVerification(false)
      }
    } catch (error) {
      console.error("❌ Error checking authentication status:", error)
      setNeedsPinVerification(false)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const clearPinVerificationNeeded = async () => {
    try {
      await AsyncStorage.removeItem("pinVerificationNeeded")
      console.log("🧹 Cleared PIN verification needed flag")
    } catch (error) {
      console.error("❌ Error clearing PIN verification needed:", error)
    }
  }

  return {
    needsPinVerification,
    isCheckingAuth,
    setNeedsPinVerification,
    clearPinVerificationNeeded,
  }
}

// App Security Screen Component - handles PIN verification when app is reopened
const AppSecurityScreen = ({ onSuccess }) => {
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shakeAnimation] = useState(new Animated.Value(0))
  const [scaleAnimation] = useState(new Animated.Value(1))
  const [attemptCount, setAttemptCount] = useState(0)
  const [showWrongPin, setShowWrongPin] = useState(false)
  const [wrongPinAnimation] = useState(new Animated.Value(0))

  const MAX_ATTEMPTS = 5

  // Safe vibration function
  const safeVibrate = (pattern = [0, 100]) => {
    try {
      if (Platform.OS === "android") {
        const { Vibration } = require("react-native")
        if (Array.isArray(pattern)) {
          Vibration.vibrate(pattern)
        } else {
          Vibration.vibrate(pattern)
        }
      } else if (Platform.OS === "ios") {
        const { Vibration } = require("react-native")
        Vibration.vibrate()
      }
    } catch (error) {
      console.log("Vibration not available:", error.message)
    }
  }

  const handleNumberPress = (number) => {
    if (pin.length < 4) {
      setPin(pin + number)

      // Add subtle scale animation for button press
      Animated.sequence([
        Animated.timing(scaleAnimation, { toValue: 0.95, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start()
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
    setShowWrongPin(false)
  }

  const shakeError = () => {
    safeVibrate([0, 100, 50, 100])

    // Visual shake animation
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start()
  }

  const showWrongPinMessage = () => {
    setShowWrongPin(true)

    Animated.sequence([
      Animated.timing(wrongPinAnimation, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(wrongPinAnimation, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setShowWrongPin(false)
    })
  }

  useEffect(() => {
    if (pin.length === 4) {
      handlePinVerification()
    }
  }, [pin])

  const handlePinVerification = async () => {
    setIsLoading(true)
    try {
      // Get current user details
      const userDetails = await AsyncStorage.getItem("user")
      const parsedUser = userDetails ? JSON.parse(userDetails) : null

      if (!parsedUser) {
        console.error("User information not found. Please login again.")
        return
      }

      const userId = parsedUser.id || parsedUser._id || parsedUser.phoneno

      // Get stored PIN
      const userPinKey = `userPin_${userId}`
      const storedPin = await AsyncStorage.getItem(userPinKey)

      if (!storedPin) {
        console.error("PIN not found. Please contact support.")
        return
      }

      // Verify PIN
      if (pin === storedPin) {
        // Correct PIN
        console.log("✅ PIN verified successfully - Welcome back!")
        setAttemptCount(0)
        setShowWrongPin(false)

        // Success animation
        Animated.timing(scaleAnimation, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start()
        })

        // Clear PIN verification needed flag
        await AsyncStorage.removeItem("pinVerificationNeeded")
        console.log("🧹 Cleared PIN verification flag - user can access app")

        setTimeout(() => {
          onSuccess()
        }, 1000)
      } else {
        // Wrong PIN
        const newAttemptCount = attemptCount + 1
        setAttemptCount(newAttemptCount)

        console.log(`❌ Wrong PIN attempt ${newAttemptCount}/${MAX_ATTEMPTS}`)

        shakeError()
        showWrongPinMessage()

        if (newAttemptCount >= MAX_ATTEMPTS) {
          console.log("🚫 Too many failed attempts. Please restart the app.")
          // Could implement app lock here
        }

        // Clear PIN after a short delay
        setTimeout(() => {
          setPin("")
        }, 1000)
      }
    } catch (error) {
      console.error("❌ Error verifying PIN:", error)
      console.log("Failed to verify PIN. Please try again.")
      setPin("")
    } finally {
      setIsLoading(false)
    }
  }

  const renderPinDots = () => {
    return (
      <Animated.View
        style={[
          securityStyles.pinDotsContainer,
          { transform: [{ translateX: shakeAnimation }, { scale: scaleAnimation }] },
        ]}
      >
        {[0, 1, 2, 3].map((index) => (
          <Animated.View
            key={index}
            style={[
              securityStyles.pinDot,
              pin.length > index ? securityStyles.pinDotFilled : securityStyles.pinDotEmpty,
              showWrongPin && pin.length > index && securityStyles.pinDotError,
            ]}
          />
        ))}
      </Animated.View>
    )
  }

  const renderNumberPad = () => {
    const numbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [" ", 0, "backspace"],
    ]

    return (
      <View style={securityStyles.numberPadContainer}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={securityStyles.numberRow}>
            {row.map((item, colIndex) => {
              if (item === "") {
                return <View key={colIndex} style={securityStyles.emptyButton} />
              }

              if (item === "backspace") {
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[securityStyles.numberButton, securityStyles.backspaceButton]}
                    onPress={handleBackspace}
                    activeOpacity={0.7}
                  >
                    <Text style={securityStyles.backspaceText}>⌫</Text>
                  </TouchableOpacity>
                )
              }

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={securityStyles.numberButton}
                  onPress={() => handleNumberPress(item.toString())}
                  activeOpacity={0.7}
                >
                  <Text style={securityStyles.numberText}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    )
  }

  return (
    <>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <ScrollView 
        style={securityStyles.container}
        contentContainerStyle={securityStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {isLoading && (
          <View style={securityStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#874701" />
          </View>
        )}

        <View style={securityStyles.logoContainer}>
          <Image source={require("./assets/images/newlogo.png")} style={securityStyles.logo} resizeMode="cover" />
        </View>

        <View style={securityStyles.contentContainer}>
          <Text style={securityStyles.title}>Welcome Back!</Text>
          <Text style={securityStyles.subtitle}>Please enter your PIN to continue</Text>

          {/* Professional Wrong PIN Message */}
          {showWrongPin && (
            <Animated.View
              style={[
                securityStyles.wrongPinContainer,
                { opacity: wrongPinAnimation, transform: [{ scale: wrongPinAnimation }] },
              ]}
            >
              <MaterialIcons name="error" size={20} color="#FF4444" />
              <Text style={securityStyles.wrongPinText}>Wrong PIN</Text>
            </Animated.View>
          )}

          {/* Attempt Warning */}
          {attemptCount > 0 && !showWrongPin && (
            <View style={securityStyles.attemptWarningContainer}>
              <MaterialIcons name="warning" size={16} color="#FF8C00" />
              <Text style={securityStyles.attemptWarning}>{MAX_ATTEMPTS - attemptCount} attempts remaining</Text>
            </View>
          )}

          {renderPinDots()}
          {renderNumberPad()}

          <View style={securityStyles.securityNote}>
            <MaterialIcons name="security" size={20} color="#874701" />
            <Text style={securityStyles.securityText}>Your PIN keeps your account secure</Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <AppWrapper />
      </NavigationContainer>
    </PaperProvider>
  )
}

// App Wrapper - controls the main app flow based on security needs
const AppWrapper = () => {
  const { needsPinVerification, isCheckingAuth, setNeedsPinVerification, clearPinVerificationNeeded } =
    useAppStateManager()

  console.log("🎯 AppWrapper - needsPinVerification:", needsPinVerification, "isCheckingAuth:", isCheckingAuth)

  // Show loading while checking authentication status
  if (isCheckingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#874701" />
        <Text style={styles.loadingText}>Checking security...</Text>
      </View>
    )
  }

  // Show PIN verification screen if needed
  if (needsPinVerification) {
    console.log("🔒 Showing PIN verification screen")
    return (
      <AppSecurityScreen
        onSuccess={() => {
          console.log("✅ PIN verification successful - allowing app access")
          setNeedsPinVerification(false)
          clearPinVerificationNeeded()
        }}
      />
    )
  }

  // Show normal app flow
  console.log("🏠 Showing normal app flow")
  return <MyStack />
}

const MyStack = () => {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen name="SlapScreen" options={{ headerShown: false }} component={SpasssSc} />
      <Stack.Screen name="SlapScreen2" options={{ headerShown: false }} component={SlapScreen} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
      <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
      <Stack.Screen name="ReferralScreen" options={{ headerShown: false }} component={ReferralScreen} />
      <Stack.Screen name="EarnedBonusPoint" options={{ headerShown: true }} component={EarnedBonusPoint} />
      <Stack.Screen name="Pay" options={{ headerShown: true }} component={Pay} />
      <Stack.Screen name="ProfileUpdate" options={{ headerShown: false }} component={ProfileUpdate} />
      <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePassword} />
      <Stack.Screen name="Otp" options={{ headerShown: false }} component={Otp} />
      <Stack.Screen name="EmailOtp" options={{ headerShown: false }} component={EmailOtp} />
      <Stack.Screen name="PinCreation" options={{ headerShown: false }} component={PinCreation} />
      <Stack.Screen name="TermsConditions" options={{ headerShown: false }} component={TermsConditions} />
      <Stack.Screen name="PinVerification" options={{ headerShown: false }} component={PinVerification} />
      <Stack.Screen name="NewPassword" options={{ headerShown: false }} component={NewPassword} />
      <Stack.Screen
        name="AboutUs"
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          title: "About us",
        }}
        component={AboutUs}
      />
      <Stack.Screen
        name="BookingDetails"
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          title: "Purchase History",
        }}
        component={BookingDetails}
      />
      <Stack.Screen
        name="CoinDetails"
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          title: "Withdraw History",
        }}
        component={CoinsDetails}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          title: "Privacy Policy",
        }}
        component={PrivacyPolicy}
      />
      <Stack.Screen
        name="Paymentpage"
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#f3d25b",
          },
        }}
        component={Paymentpage}
      />
      <Stack.Screen
        name="TermsCondition"
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          title: "Terms & Condition",
        }}
        component={TermsCondition}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            color: "#f3d25b",
          },
          title: "Contact Support",
        }}
      />
      <Stack.Screen
        name="Disclaimer"
        options={{
          headerShown: true,
          headerTintColor: "#f3d25b",
          headerStyle: {
            backgroundColor: "#fff",
          },
          title: "Disclaimer",
        }}
        component={Disclaimer}
      />
      <Stack.Screen
        name="Imagezoom"
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#f3d25b",
          },
        }}
        component={Imagezoom}
      />
      <Stack.Screen name="Home1" options={{ headerShown: false }} component={BottomTab} />
    </Stack.Navigator>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: "#feac03",
          tabBarInactiveTintColor: "#f3d25b",
          tabBarStyle: {
            backgroundColor: "black",
            borderColor: "#080808",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: "Poppins-ExtraBoldItalic",
          },
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={25} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          tabBarActiveTintColor: "#feac03",
          tabBarInactiveTintColor: "#f3d25b",
          tabBarStyle: { backgroundColor: "black", borderColor: "black" },
          tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={25} />,
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: "Poppins-ExtraBoldItalic",
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarActiveTintColor: "#feac03",
          tabBarInactiveTintColor: "#f3d25b",
          tabBarStyle: { backgroundColor: "#080808", borderColor: "#080808" },
          tabBarIcon: ({ color, size }) => <Feather name="more-horizontal" color={color} size={25} />,
          headerShown: true,
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#f3d25b",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: "Poppins-ExtraBoldItalic",
          },
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3d25b",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#874701",
    fontWeight: "600",
  },
})

const securityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: screenHeight,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: screenHeight * 0.75,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  wrongPinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE6E6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF4444",
  },
  wrongPinText: {
    fontSize: 16,
    color: "#FF4444",
    fontWeight: "600",
    marginLeft: 8,
  },
  attemptWarningContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3E0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  attemptWarning: {
    fontSize: 14,
    color: "#FF8C00",
    fontWeight: "600",
    marginLeft: 6,
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 2,
  },
  pinDotEmpty: {
    backgroundColor: "transparent",
    borderColor: "#ddd",
  },
  pinDotFilled: {
    backgroundColor: "#874701",
    borderColor: "#874701",
  },
  pinDotError: {
    backgroundColor: "#FF4444",
    borderColor: "#FF4444",
  },
  numberPadContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 10,
  },
  numberRow: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyButton: {
    width: 70,
    height: 70,
    marginHorizontal: 15,
  },
  backspaceButton: {
    backgroundColor: "#fff5f5",
    borderColor: "#fed7d7",
  },
  numberText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  backspaceText: {
    fontSize: 20,
    color: "#874701",
    textAlign: "center",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
})