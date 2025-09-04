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
  Vibration,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

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
    Vibration.vibrate(100)
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
                    style={[styles.numberButton, styles.backspaceButton]}
                    onPress={handleBackspace}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="backspace-outline" size={24} color="#874701" />
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
            <Text style={styles.title}>{step === 1 ? "Create new PIN for continue." : "Confirm your PIN"}</Text>

            <Text style={styles.subtitle}>
              {step === 1 ? "Please enter your PIN to continue" : "Please re-enter your PIN to confirm"}
            </Text>

            <Animated.View style={[styles.pinContainer, { transform: [{ translateX: shakeAnimation }] }]}>
              {renderPinDots(step === 1 ? pin : confirmPin)}
            </Animated.View>

            {renderNumberPad()}

            <View style={styles.proceedContainer}>
              <TouchableOpacity
                style={[
                  styles.proceedButton,
                  (step === 1 ? pin.length === 4 : confirmPin.length === 4) && styles.proceedButtonActive,
                ]}
                onPress={() => {
                  if (step === 1 && pin.length === 4) {
                    setStep(2)
                    showSuccess("Great! Now confirm your PIN")
                  } else if (step === 2 && confirmPin.length === 4) {
                    if (pin === confirmPin) {
                      handlePinCreation()
                    }
                  }
                }}
                disabled={step === 1 ? pin.length !== 4 : confirmPin.length !== 4}
                activeOpacity={0.8}
              >
                <LinearGradient colors={["#4CAF50", "#45a049"]} style={styles.proceedGradient}>
                  <Text style={styles.proceedText}>Proceed</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.securityNote}>
              <Ionicons name="shield-checkmark" size={20} color="#874701" />
              <Text style={styles.securityText}>Your PIN will be used to secure your account</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default PinCreation

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
    marginBottom: 40,
  },
  pinContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  numberPadContainer: {
    alignItems: "center",
    marginBottom: 40,
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
  numberText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  proceedContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  proceedButton: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    opacity: 0.5,
  },
  proceedButtonActive: {
    opacity: 1,
  },
  proceedGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  proceedText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
