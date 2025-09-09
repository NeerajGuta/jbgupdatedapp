import { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const { width: screenWidth } = Dimensions.get("window")

const PinCreation = ({ route }) => {
  const navigation = useNavigation()
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [step, setStep] = useState(1) // 1 = create pin, 2 = confirm pin
  const [isLoading, setIsLoading] = useState(false)
  const [shakeAnimation] = useState(new Animated.Value(0))
  const { toastConfig, showSuccess, showError, hideToast } = useToast()

  const handleNumberPress = (number) => {
    if (step === 1) {
      if (pin.length < 4) {
        setPin(pin + number)
      }
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin(confirmPin + number)
      }
    }
  }

  const handleBackspace = () => {
    if (step === 1) {
      setPin(pin.slice(0, -1))
    } else {
      setConfirmPin(confirmPin.slice(0, -1))
    }
  }

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start()
  }

  useEffect(() => {
    if (step === 1 && pin.length === 4) {
      setTimeout(() => {
        setStep(2)
        showSuccess("Great! Now confirm your PIN")
      }, 300)
    }
  }, [pin])

  useEffect(() => {
    if (step === 2 && confirmPin.length === 4) {
      if (pin === confirmPin) {
        handlePinCreation()
      } else {
        shakeError()
        showError("PINs don't match. Please try again.")
        setTimeout(() => {
          setConfirmPin("")
          setPin("")
          setStep(1)
        }, 1000)
      }
    }
  }, [confirmPin])

  const handlePinCreation = async () => {
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

      // Save PIN with user-specific key
      const userPinKey = `userPin_${userId}`
      await AsyncStorage.setItem(userPinKey, pin)
      await AsyncStorage.setItem(`pinCreated_${userId}`, "true")

      showSuccess("PIN created successfully!")

      setTimeout(() => {
        navigation.navigate("TermsConditions")
      }, 1000)
    } catch (error) {
      console.error("Error saving PIN:", error)
      showError("Failed to create PIN. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderPinDots = (currentPin) => {
    return (
      <View style={styles.pinDotsContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[styles.pinDot, currentPin.length > index ? styles.pinDotFilled : styles.pinDotEmpty]}
          />
        ))}
      </View>
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
      <View style={styles.numberPadContainer}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((item, colIndex) => {
              if (item === null) {
                return <View key={colIndex} style={styles.emptyButton} />
              }

              if (item === "backspace") {
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.numberButton, styles.backspaceButton]}
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
                  style={styles.numberButton}
                  onPress={() => handleNumberPress(item.toString())}
                  activeOpacity={0.7}
                >
                  <Text style={styles.numberText}>{item}</Text>
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
      <View style={styles.fullScreenContainer}>
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

        {/* FULL SCREEN CONTENT */}
        <View style={styles.fullScreenContent}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>{step === 1 ? "Create Your PIN" : "Confirm Your PIN"}</Text>
            <Text style={styles.subtitle}>
              {step === 1
                ? "Please create a 4-digit PIN to secure your account"
                : "Please re-enter your PIN to confirm"}
            </Text>
          </View>

          <View style={styles.pinSection}>
            <Animated.View style={[styles.pinContainer, { transform: [{ translateX: shakeAnimation }] }]}>
              {renderPinDots(step === 1 ? pin : confirmPin)}
            </Animated.View>
          </View>

          <View style={styles.keypadSection}>{renderNumberPad()}</View>

          <View style={styles.footerSection}>
            <View style={styles.securityNote}>
              <MaterialIcons name="security" size={20} color="#874701" />
              <Text style={styles.securityText}>Your PIN will be used to secure your account</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default PinCreation

const styles = StyleSheet.create({
  // FULL SCREEN STYLES
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
  pinSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.2,
  },
  pinContainer: {
    alignItems: "center",
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
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: screenWidth * 0.1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: screenWidth * 0.05,
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
    fontSize: screenWidth * 0.06,
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
