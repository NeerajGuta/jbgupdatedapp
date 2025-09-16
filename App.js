

import { useEffect, useState, useRef } from "react"
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  AppState,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
  Dimensions,
  Keyboard,
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
import { SafeAreaView, useSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const { height: screenHeight, width: screenWidth } = Dimensions.get("window")

// FIXED App State Manager - Proper fresh start detection
const useAppStateManager = () => {
  const [appState, setAppState] = useState(AppState.currentState)
  const [needsPinVerification, setNeedsPinVerification] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isFirstLaunch, setIsFirstLaunch] = useState(true)
  const [splashCompleted, setSplashCompleted] = useState(false)
  const [navigationTarget, setNavigationTarget] = useState(null)

  // Track app session and background time
  const backgroundTime = useRef(null)
  const appStartTime = useRef(Date.now()) // When this JS context started
  const isFreshAppStart = useRef(null) // Will be set during initialization

  useEffect(() => {
    // Initialize session tracking
    initializeSession()

    // Only check authentication AFTER splash is completed
    if (isFirstLaunch && splashCompleted) {
      console.log("🚀 SPLASH COMPLETED - Now checking authentication and navigation")
      checkAuthenticationAndSetTarget()
      setIsFirstLaunch(false)
    }

    const handleAppStateChange = (nextAppState) => {
      console.log("📱 App state changed:", appState, "->", nextAppState)

      // When app comes to ACTIVE from background/inactive
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        const timeInBackground = backgroundTime.current ? Date.now() - backgroundTime.current : 0
        console.log(`🔄 App returned to foreground after ${timeInBackground}ms in background`)

        // Only check PIN if splash was completed
        if (splashCompleted) {
          console.log("🔒 App resumed from background - checking if PIN is needed")
          checkAuthenticationForAppResume()
        }
      }

      // When app goes to background/inactive from active
      if (appState === "active" && nextAppState.match(/inactive|background/)) {
        backgroundTime.current = Date.now()
        console.log("📱 App went to background at:", new Date(backgroundTime.current).toLocaleTimeString())

        // Save session timestamp
        saveBackgroundTimestamp()
      }

      setAppState(nextAppState)
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => subscription?.remove()
  }, [appState, isFirstLaunch, splashCompleted])

  // Initialize session tracking - FIXED to properly detect fresh starts
  const initializeSession = async () => {
    try {
      // Check if there's a previous session timestamp
      const lastBackgroundTime = await AsyncStorage.getItem("lastBackgroundTime")
      const appSessionId = await AsyncStorage.getItem("appSessionId")
      const currentSessionId = appStartTime.current.toString()

      console.log("🔍 Session Check:")
      console.log("  - Current session ID:", currentSessionId)
      console.log("  - Stored session ID:", appSessionId)
      console.log("  - Last background time:", lastBackgroundTime)

      // Determine if this is a fresh start BEFORE updating session ID
      if (appSessionId !== currentSessionId) {
        console.log("🆕 NEW APP SESSION DETECTED - This is a fresh app start")
        isFreshAppStart.current = true

        // Clear old background timestamp since this is a new session
        if (lastBackgroundTime) {
          await AsyncStorage.removeItem("lastBackgroundTime")
          console.log("🧹 Cleared old background timestamp for new session")
        }

        // Update session ID AFTER determining it's fresh
        await AsyncStorage.setItem("appSessionId", currentSessionId)
      } else {
        console.log("🔄 SAME SESSION - This is app resume")
        isFreshAppStart.current = false
      }
    } catch (error) {
      console.error("Error initializing session:", error)
      isFreshAppStart.current = true // Default to fresh start on error
    }
  }

  // Save timestamp when app goes to background
  const saveBackgroundTimestamp = async () => {
    try {
      const currentTime = Date.now()
      await AsyncStorage.setItem("lastBackgroundTime", currentTime.toString())
      console.log("💾 Saved background timestamp:", currentTime)
    } catch (error) {
      console.error("Error saving background timestamp:", error)
    }
  }

  const checkAuthenticationAndSetTarget = async () => {
    try {
      setIsCheckingAuth(true)
      console.log("🔍 Checking authentication and setting navigation target")

      // Check if user is logged in
      const userDetails = await AsyncStorage.getItem("user")
      const lastBackgroundTime = await AsyncStorage.getItem("lastBackgroundTime")

      console.log("📄 User details exist:", !!userDetails)
      console.log("⏰ Last background time:", lastBackgroundTime)
      console.log("🆔 Is fresh app start:", isFreshAppStart.current)

      // User is considered logged in if they have user details
      const isUserLoggedIn = userDetails !== null && userDetails !== undefined

      if (isUserLoggedIn) {
        // Use the pre-determined fresh start flag
        const isFreshStart = isFreshAppStart.current

        console.log("🔍 App start type:", isFreshStart ? "FRESH START" : "RESUME")

        if (isFreshStart) {
          // This is a fresh app start - check if user has PIN
          const parsedUser = JSON.parse(userDetails)
          const userId = parsedUser.id || parsedUser._id || parsedUser.phoneno
          const userPinKey = `userPin_${userId}`
          const storedPin = await AsyncStorage.getItem(userPinKey)

          console.log("🔐 User has PIN:", !!storedPin)

          if (storedPin) {
            console.log("🔒 FRESH START + PIN EXISTS = PIN VERIFICATION REQUIRED")
            setNeedsPinVerification(true)
            setNavigationTarget("Home1")
          } else {
            console.log("🔓 Fresh start but no PIN set - going directly to Home1")
            setNeedsPinVerification(false)
            setNavigationTarget("Home1")
          }
        } else {
          // This is app resume - check background time
          if (lastBackgroundTime) {
            const currentTime = Date.now()
            const timeSinceBackground = currentTime - Number.parseInt(lastBackgroundTime)
            const BACKGROUND_THRESHOLD = 5 * 60 * 1000 // 5 minutes

            console.log(`⏰ Time since background: ${Math.round(timeSinceBackground / 1000)}s`)

            if (timeSinceBackground > BACKGROUND_THRESHOLD) {
              console.log("🔒 Long background time - PIN required")
              const parsedUser = JSON.parse(userDetails)
              const userId = parsedUser.id || parsedUser._id || parsedUser.phoneno
              const userPinKey = `userPin_${userId}`
              const storedPin = await AsyncStorage.getItem(userPinKey)

              if (storedPin) {
                setNeedsPinVerification(true)
                setNavigationTarget("Home1")
              } else {
                setNeedsPinVerification(false)
                setNavigationTarget("Home1")
              }
            } else {
              console.log("🔓 Short background time - no PIN required")
              setNeedsPinVerification(false)
              setNavigationTarget("Home1")
            }
          } else {
            console.log("🔓 No background time - no PIN required")
            setNeedsPinVerification(false)
            setNavigationTarget("Home1")
          }
        }
      } else {
        console.log("❌ User not logged in - going to SignIn")
        setNeedsPinVerification(false)
        setNavigationTarget("SignIn")
        // Clear any session data
        await AsyncStorage.removeItem("lastBackgroundTime")
        await AsyncStorage.removeItem("appSessionId")
      }
    } catch (error) {
      console.error("❌ Error checking authentication status:", error)
      setNeedsPinVerification(false)
      setNavigationTarget("SignIn")
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const checkAuthenticationForAppResume = async () => {
    try {
      // This is only called when app state changes (not on fresh start)
      const userDetails = await AsyncStorage.getItem("user")
      const lastBackgroundTime = await AsyncStorage.getItem("lastBackgroundTime")

      if (userDetails && lastBackgroundTime) {
        const currentTime = Date.now()
        const timeSinceBackground = currentTime - Number.parseInt(lastBackgroundTime)
        const BACKGROUND_THRESHOLD = 5 * 60 * 1000 // 5 minutes

        console.log(`⏰ Resume check - Time since background: ${Math.round(timeSinceBackground / 1000)}s`)

        if (timeSinceBackground > BACKGROUND_THRESHOLD) {
          const parsedUser = JSON.parse(userDetails)
          const userId = parsedUser.id || parsedUser._id || parsedUser.phoneno
          const userPinKey = `userPin_${userId}`
          const storedPin = await AsyncStorage.getItem(userPinKey)

          if (storedPin) {
            console.log("🔒 Long background + PIN exists - PIN required")
            setNeedsPinVerification(true)
          } else {
            console.log("🔓 Long background but no PIN - no verification needed")
            setNeedsPinVerification(false)
          }
        } else {
          console.log("🔓 Short background time - no PIN required")
          setNeedsPinVerification(false)
        }
      }
    } catch (error) {
      console.error("❌ Error checking authentication on app resume:", error)
    }
  }

  const clearPinVerificationNeeded = async () => {
    try {
      // Clear the background timestamp when PIN is successfully verified
      await AsyncStorage.removeItem("lastBackgroundTime")
      console.log("🧹 Cleared background timestamp after successful PIN verification")
    } catch (error) {
      console.error("❌ Error clearing background timestamp:", error)
    }
  }

  return {
    needsPinVerification,
    isCheckingAuth,
    splashCompleted,
    navigationTarget,
    setSplashCompleted,
    setNeedsPinVerification,
    clearPinVerificationNeeded,
  }
}

// App Security Screen Component - FULL SCREEN PIN (NO LOGO)
const AppSecurityScreen = ({ onSuccess }) => {
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shakeAnimation] = useState(new Animated.Value(0))
  const [scaleAnimation] = useState(new Animated.Value(1))
  const [attemptCount, setAttemptCount] = useState(0)
  const [showWrongPin, setShowWrongPin] = useState(false)
  const [wrongPinAnimation] = useState(new Animated.Value(0))
  const MAX_ATTEMPTS = 5

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
      [null, 0, "backspace"],
    ]

    return (
      <View style={securityStyles.numberPadContainer}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={securityStyles.numberRow}>
            {row.map((item, colIndex) => {
              if (item === null) {
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
                    <MaterialIcons name="backspace" size={24} color="#874701" />
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
    <SafeAreaView style={securityStyles.safeAreaContainer}>
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={securityStyles.fullScreenContainer}>
        {isLoading && (
          <View style={securityStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#874701" />
          </View>
        )}

        {/* FULL SCREEN CONTENT - NO LOGO */}
        <View style={securityStyles.fullScreenContent}>
          <View style={securityStyles.headerSection}>
            <Text style={securityStyles.title}>Welcome Back!</Text>
            <Text style={securityStyles.subtitle}>Please enter your PIN to continue</Text>
          </View>

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

          <View style={securityStyles.pinSection}>{renderPinDots()}</View>

          <View style={securityStyles.keypadSection}>{renderNumberPad()}</View>

          <View style={securityStyles.footerSection}>
            <View style={securityStyles.securityNote}>
              <MaterialIcons name="security" size={20} color="#874701" />
              <Text style={securityStyles.securityText}>Your PIN keeps your account secure</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer independent={true}>
          <AppWrapper />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

// App Wrapper - controls the main app flow based on security needs
const AppWrapper = () => {
  const {
    needsPinVerification,
    isCheckingAuth,
    splashCompleted,
    navigationTarget,
    setSplashCompleted,
    setNeedsPinVerification,
    clearPinVerificationNeeded,
  } = useAppStateManager()

  console.log("🎯 AppWrapper State:", {
    needsPinVerification,
    isCheckingAuth,
    splashCompleted,
    navigationTarget,
  })

  // ALWAYS show splash screen first if not completed
  if (!splashCompleted) {
    console.log("🎬 Showing initial splash screen")
    return <MyStack setSplashCompleted={setSplashCompleted} />
  }

  // Show loading while checking authentication status (only after splash)
  if (isCheckingAuth) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#874701" />
          <Text style={styles.loadingText}>Checking security...</Text>
        </View>
      </SafeAreaView>
    )
  }

  // Show PIN verification screen if needed (only after splash)
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

  // Show normal app flow with proper navigation target
  console.log("🏠 Showing normal app flow, navigating to:", navigationTarget)
  return <MyStack initialRoute={navigationTarget} />
}

const MyStack = ({ setSplashCompleted, initialRoute }) => {
  // Determine the initial route
  const getInitialRouteName = () => {
    if (setSplashCompleted) {
      // This is the initial splash flow
      return "SlapScreen"
    }
    // This is after authentication check
    return initialRoute || "SignIn"
  }

  return (
    <Stack.Navigator initialRouteName={getInitialRouteName()} independent={true}>
      <Stack.Screen name="SlapScreen" options={{ headerShown: false }}>
        {(props) => <SpasssSc {...props} setSplashCompleted={setSplashCompleted} />}
      </Stack.Screen>
      <Stack.Screen name="SlapScreen2" options={{ headerShown: false }} component={SlapScreen} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
      <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
      <Stack.Screen name="ReferralScreen" options={{ headerShown: false }} component={ReferralScreen} />
      <Stack.Screen name="EarnedBonusPoint" options={{ headerShown: true }} component={EarnedBonusPoint} />
      <Stack.Screen name="Pay" options={{ headerShown: false }} component={Pay} />
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidHideListener?.remove()
      keyboardDidShowListener?.remove()
    }
  }, [])

  // Calculate proper tab bar height based on device and safe area
  const getTabBarHeight = () => {
    const baseHeight = 60
    const safeAreaBottom = Math.max(insets.bottom, 0)

    if (Platform.OS === "ios") {
      // iOS devices with home indicator need more space
      return baseHeight + safeAreaBottom + 5
    } else {
      // Android devices
      return baseHeight + Math.max(safeAreaBottom, 10)
    }
  }

  const tabBarHeight = getTabBarHeight()

  return (
    <View style={styles.tabContainer}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: isKeyboardVisible ? "none" : "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
            paddingBottom: Math.max(insets.bottom, 5),
            paddingTop: 8,
            height: tabBarHeight,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 2,
            marginBottom: Platform.OS === "ios" ? 0 : 2,
          },
          tabBarActiveTintColor: "#005801",
          tabBarInactiveTintColor: "#999999",
          tabBarItemStyle: {
            paddingVertical: 4,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarIconStyle: {
            marginTop: 2,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIconContainer]}>
                <Ionicons name="home" color={color} size={22} />
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MyAccount"
          component={MyAccount}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIconContainer]}>
                <AntDesign name="user" color={color} size={22} />
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIconContainer]}>
                <Feather name="more-horizontal" color={color} size={22} />
              </View>
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },
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
  // FIXED Tab Container and Icon Styles
  tabContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 2,
  },
  activeTabIconContainer: {
    backgroundColor: "rgba(0, 88, 1, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 88, 1, 0.2)",
  },
})

const securityStyles = StyleSheet.create({
  // SafeAreaView container
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },
  // FULL SCREEN PIN STYLES WITH FIXED BUTTON LAYOUT
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  fullScreenContent: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
  },
  headerSection: {
    alignItems: "center",
    paddingTop: 40,
    flex: 0.25,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  wrongPinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE6E6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF4444",
    alignSelf: "center",
  },
  wrongPinText: {
    fontSize: 14,
    color: "#FF4444",
    fontWeight: "600",
    marginLeft: 6,
  },
  attemptWarningContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3E0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF8C00",
    alignSelf: "center",
  },
  attemptWarning: {
    fontSize: 12,
    color: "#FF8C00",
    fontWeight: "600",
    marginLeft: 4,
  },
  pinSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.2,
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 12,
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
  keypadSection: {
    flex: 0.45,
    justifyContent: "center",
  },
  numberPadContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  numberRow: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  numberButton: {
    width: screenWidth * 0.2, // 20% of screen width
    height: screenWidth * 0.2, // Square buttons
    borderRadius: screenWidth * 0.1, // Perfect circle
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: screenWidth * 0.05, // 5% margin between buttons
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyButton: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    marginHorizontal: screenWidth * 0.05,
  },
  backspaceButton: {
    backgroundColor: "#fff5f5",
    borderColor: "#fed7d7",
  },
  numberText: {
    fontSize: screenWidth * 0.06, // 6% of screen width
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  footerSection: {
    alignItems: "center",
    flex: 0.1,
    justifyContent: "center",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  securityText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
})
