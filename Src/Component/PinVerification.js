import { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  Animated,
  Platform,
  Alert,
} from "react-native"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const PinVerification = ({ route }) => {
  const navigation = useNavigation()
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shakeAnimation] = useState(new Animated.Value(0))
  const [scaleAnimation] = useState(new Animated.Value(1))
  const [attemptCount, setAttemptCount] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)
  const [showWrongPin, setShowWrongPin] = useState(false)
  const [wrongPinAnimation] = useState(new Animated.Value(0))
  const { toastConfig, showSuccess, showError, hideToast } = useToast()

  const MAX_ATTEMPTS = 5
  const LOCK_DURATION = 300 // 5 minutes in seconds

  // Safe vibration function that handles permission issues
  const safeVibrate = (pattern = [0, 100]) => {
    try {
      if (Platform.OS === "android") {
        // For Android, we'll use a visual shake instead of vibration
        // to avoid permission issues
        console.log("Vibration requested but using visual feedback instead")
      } else {
        // iOS doesn't require permission for basic vibration
        const { Vibration } = require("react-native")
        if (Array.isArray(pattern)) {
          Vibration.vibrate(pattern)
        } else {
          Vibration.vibrate(pattern)
        }
      }
    } catch (error) {
      console.log("Vibration not available:", error.message)
      // Fallback to visual feedback only
    }
  }

  useEffect(() => {
    let interval
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false)
            setAttemptCount(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isLocked, lockTimer])

  const handleNumberPress = (number) => {
    if (isLocked) return
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
    if (isLocked) return
    setPin(pin.slice(0, -1))
    setShowWrongPin(false) // Hide wrong pin message when user starts correcting
  }

  const shakeError = () => {
    // Safe vibration with fallback
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

    // Animate wrong pin message
    Animated.sequence([
      Animated.timing(wrongPinAnimation, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(wrongPinAnimation, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setShowWrongPin(false)
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (pin.length === 4) {
      handlePinVerification()
    }
  }, [pin])

  const handlePinVerification = async () => {
    if (isLocked) return

    setIsLoading(true)
    try {
      // Get current user details
      const userDetails = await AsyncStorage.getItem("user")
      const parsedUser = userDetails ? JSON.parse(userDetails) : null

      if (!parsedUser) {
        showError("User information not found. Please login again.")
        navigation.navigate("SignIn")
        return
      }

      const userId = parsedUser.id || parsedUser._id || parsedUser.phoneno

      // Get stored PIN
      const userPinKey = `userPin_${userId}`
      const storedPin = await AsyncStorage.getItem(userPinKey)

      if (!storedPin) {
        showError("PIN not found. Please contact support.")
        return
      }

      // Verify PIN
      if (pin === storedPin) {
        // Correct PIN
        showSuccess("PIN verified successfully!")
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

        // Update login state
        await AsyncStorage.setItem("userLoggedIn", "true")
        await AsyncStorage.setItem("userPhone", parsedUser.phoneno || parsedUser.mobile)

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home1" }],
          })
        }, 1000)
      } else {
        // Wrong PIN
        const newAttemptCount = attemptCount + 1
        setAttemptCount(newAttemptCount)

        // Show professional wrong PIN feedback
        shakeError()
        showWrongPinMessage()

        if (newAttemptCount >= MAX_ATTEMPTS) {
          setIsLocked(true)
          setLockTimer(LOCK_DURATION)
          showError(`Account locked. Try again in ${formatTime(LOCK_DURATION)}.`)
        } else {
          // Don't show toast, use the visual wrong pin message instead
          console.log(`Wrong PIN. ${MAX_ATTEMPTS - newAttemptCount} attempts remaining.`)
        }

        // Clear PIN after a short delay
        setTimeout(() => {
          setPin("")
        }, 1000)
      }
    } catch (error) {
      console.error("Error verifying PIN:", error)
      showError("Failed to verify PIN. Please try again.")
      setPin("")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPin = () => {
    Alert.alert("Forgot PIN?", "You will need to verify your identity with OTP to reset your PIN.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset PIN",
        onPress: () => {
          navigation.navigate("SignIn", { resetPin: true })
        },
      },
    ])
  }

  const renderPinDots = () => {
    return (
      <Animated.View
        style={[styles.pinDotsContainer, { transform: [{ translateX: shakeAnimation }, { scale: scaleAnimation }] }]}
      >
        {[0, 1, 2, 3].map((index) => (
          <Animated.View
            key={index}
            style={[
              styles.pinDot,
              pin.length > index ? styles.pinDotFilled : styles.pinDotEmpty,
              showWrongPin && pin.length > index && styles.pinDotError,
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
      ["", 0, "backspace"],
    ]

    return (
      <View style={styles.numberPadContainer}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((item, colIndex) => {
              if (item === "") {
                return <View key={colIndex} style={styles.numberButton} />
              }

              if (item === "backspace") {
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.numberButton, styles.backspaceButton, isLocked && styles.disabledButton]}
                    onPress={handleBackspace}
                    activeOpacity={0.7}
                    disabled={isLocked}
                  >
                    <Ionicons name="backspace-outline" size={24} color={isLocked ? "#ccc" : "#874701"} />
                  </TouchableOpacity>
                )
              }

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[styles.numberButton, isLocked && styles.disabledButton]}
                  onPress={() => handleNumberPress(item.toString())}
                  activeOpacity={0.7}
                  disabled={isLocked}
                >
                  <Text style={[styles.numberText, isLocked && styles.disabledText]}>{item}</Text>
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
      <View style={styles.container}>
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

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <FontAwesome6 name="arrow-left-long" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.logoContainer}>
            <Image source={require("../../assets/images/newlogo.png")} style={styles.logo} resizeMode="cover" />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Enter Your PIN</Text>

            <Text style={styles.subtitle}>
              {isLocked
                ? `Account locked. Try again in ${formatTime(lockTimer)}`
                : "Please enter your 4-digit PIN to continue"}
            </Text>

            {/* Professional Wrong PIN Message */}
            {showWrongPin && (
              <Animated.View
                style={[
                  styles.wrongPinContainer,
                  { opacity: wrongPinAnimation, transform: [{ scale: wrongPinAnimation }] },
                ]}
              >
                <MaterialIcons name="error" size={20} color="#FF4444" />
                <Text style={styles.wrongPinText}>Wrong PIN</Text>
              </Animated.View>
            )}

            {/* Attempt Warning */}
            {attemptCount > 0 && !isLocked && !showWrongPin && (
              <View style={styles.attemptWarningContainer}>
                <MaterialIcons name="warning" size={16} color="#FF8C00" />
                <Text style={styles.attemptWarning}>{MAX_ATTEMPTS - attemptCount} attempts remaining</Text>
              </View>
            )}

            {/* Locked Warning */}
            {isLocked && (
              <View style={styles.lockedContainer}>
                <MaterialIcons name="lock" size={20} color="#FF4444" />
                <Text style={styles.lockedText}>Account temporarily locked</Text>
              </View>
            )}

            {renderPinDots()}
            {renderNumberPad()}

            {/* <TouchableOpacity
              style={[styles.forgotPinButton, isLocked && styles.disabledButton]}
              onPress={handleForgotPin}
              disabled={isLocked}
            >
              <Text style={[styles.forgotPinText, isLocked && styles.disabledText]}>Forgot PIN?</Text>
            </TouchableOpacity> */}

            <View style={styles.securityNote}>
              <Ionicons name="shield-checkmark" size={20} color="#874701" />
              <Text style={styles.securityText}>Your PIN keeps your account secure</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default PinVerification

const styles = StyleSheet.create({
  container: {
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
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    padding: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
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
  lockedContainer: {
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
  lockedText: {
    fontSize: 16,
    color: "#FF4444",
    fontWeight: "600",
    marginLeft: 8,
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 2,
    transition: "all 0.3s ease",
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
  },
  numberRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backspaceButton: {
    backgroundColor: "#fff5f5",
    borderColor: "#fed7d7",
  },
  disabledButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
    opacity: 0.6,
  },
  numberText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  disabledText: {
    color: "#ccc",
  },
  forgotPinButton: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 10,
  },
  forgotPinText: {
    fontSize: 16,
    color: "#874701",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
})
