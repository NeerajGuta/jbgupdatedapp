import { useState, useRef, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Animated,
  Dimensions,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Icon from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const { width, height } = Dimensions.get("window")

function SignIn() {
  // State variables for form data
  const [phoneno, setPhoneno] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // UI state variables
  const [acc, setAcc] = useState(false) // Toggle between email and phone login
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye-with-line")
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const logoScale = useRef(new Animated.Value(1)).current

  const { toastConfig, showSuccess, showError, showWarning, hideToast } = useToast()

  // Initialize entrance animations on component mount
  useEffect(() => {
    // Entrance animations
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

    // Logo pulse animation - continuous loop
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    )
    pulseAnimation.start()

    return () => pulseAnimation.stop()
  }, [])

  // Toggle password visibility
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-with-line")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-with-line") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }

  // Handle email login
  const loginEmail = async () => {
    // Form validation
    if (!email) {
      return showError("Email Required !")
    }
    if (!password) {
      return showError("Password Required !")
    }

    setIsLoading(true)
    try {
      const config = {
        url: "/signin",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/user/auth",
        headers: { "content-type": "application/json" },
        data: {
          email: email,
          password: password,
        },
      }
      const res = await axios(config)
      if (res.status === 200) {
        console.log(res.data.success)
        showSuccess("Successfully logged in! Welcome back.")
        await AsyncStorage.setItem("user", JSON.stringify(res.data.details))
        navigation.navigate("ReferralScreen")
        // Clear form data
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        showError(error.response.data.error)
      } else {
        showError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OTP send for phone login
  const Otpsend = async () => {
    // Form validation
    if (!phoneno) {
      return showError("Phone No Required !")
    }
    if (phoneno.length !== 10) {
      return showError("Invalid Phone Number. Please enter a 10-digit phone number.")
    }

    setIsLoading(true)
    try {
      const config = {
        url: "/otp",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/user/auth",
        headers: { "content-type": "application/json" },
        data: {
          phoneno: phoneno,
        },
      }
      const res = await axios(config)
      console.log(res, "..........................")
      if (res.status === 200) {
        console.log(res.data.success)
        showSuccess("OTP sent to your mobile number successfully!")
        navigation.navigate("Otp", { phoneno })
      }
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        showError(error.response.data.error)
      } else {
        showError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Status bar with golden background */}
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />
      <View style={styles.container}>
        {/* Toast notification component */}
        <Toast
          visible={toastConfig.visible}
          message={toastConfig.message}
          type={toastConfig.type}
          duration={toastConfig.duration}
          onHide={hideToast}
        />

        {/* Background decorative elements */}
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.backgroundCircle3} />

        {/* Loading overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#874701" />
              <Text style={styles.loadingText}>Please wait...</Text>
            </View>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.reg,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Logo Section */}
            <Animated.View
              style={[
                styles.logoSection,
                {
                  transform: [{ scale: logoScale }],
                },
              ]}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logoBackground}>
                  <Image
                    source={require("../../assets/images/newlogo.png")}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </Animated.View>

            {/* Welcome Text Section */}
            <Animated.View
              style={[
                styles.welcomeSection,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text style={styles.welcomeTitle}>Welcome Back!</Text>
              <Text style={styles.welcomeSubtitle}>Sign in to continue your journey</Text>
            </Animated.View>

            {/* Main Form Container */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {acc ? (
                // Email Login Form
                <View style={styles.formContent}>
                  {/* Email Input Group */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                      <View style={styles.iconContainer}>
                        <Ionicons name="mail" style={styles.inputIcon} />
                      </View>
                      <TextInput
                        style={styles.textInput}
                        value={email}
                        placeholder="Enter your email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(email) => setEmail(email)}
                      />
                    </View>
                  </View>

                  {/* Password Input Group */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputContainer}>
                      <View style={styles.iconContainer}>
                        <Icon name="lock" style={styles.inputIcon} />
                      </View>
                      <TextInput
                        style={styles.textInput}
                        value={password}
                        placeholder="Enter password"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        enablesReturnKeyAutomatically
                        onChangeText={(password) => setPassword(password)}
                      />
                      <TouchableOpacity onPress={handlePasswordVisibility} style={styles.eyeIconContainer}>
                        <Entypo name={rightIcon} style={styles.eyeIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Switch to Phone Login */}
                  <TouchableOpacity onPress={() => setAcc(!acc)} style={styles.switchModeButton}>
                    <Text style={styles.switchModeText}>Sign in with phone number</Text>
                  </TouchableOpacity>

                  {/* Sign In Button */}
                  <TouchableOpacity onPress={loginEmail} style={styles.primaryButtonContainer}>
                    <LinearGradient
                      colors={["#874701", "#a55a02"]}
                      style={styles.primaryButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.primaryButtonText}>Sign In</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                // Phone Number Login Form
                <View style={styles.formContent}>
                  {/* Phone Number Input Group */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <View style={styles.inputContainer}>
                      <View style={styles.iconContainer}>
                        <FontAwesome6 name="phone" style={styles.inputIcon} />
                      </View>
                      <View style={styles.countryCodeContainer}>
                        <Text style={styles.countryCodeText}>+91</Text>
                      </View>
                      <TextInput
                        style={styles.phoneTextInput}
                        value={phoneno}
                        placeholder="Enter mobile number"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={(text) => setPhoneno(text.replace(/[^0-9]/g, "").slice(0, 10))}
                      />
                    </View>
                  </View>

                  {/* Switch to Email Login - COMMENTED OUT */}
                  {/* <TouchableOpacity onPress={() => setAcc(!acc)} style={styles.switchModeButton}>
                    <Text style={styles.switchModeText}>Sign in with email instead</Text>
                  </TouchableOpacity> */}

                  {/* Send OTP Button */}
                  <TouchableOpacity onPress={Otpsend} style={styles.primaryButtonContainer}>
                    <LinearGradient
                      colors={["#874701", "#a55a02"]}
                      style={styles.primaryButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.primaryButtonText}>Send OTP</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}

              {/* Divider Section */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Create New Account</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </View>
    </>
  )
}

export default SignIn

const styles = StyleSheet.create({
  // Main container with golden background
  container: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },

  // Background decorative circles
  backgroundCircle1: {
    position: "absolute",
    top: height * 0.1,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(135, 71, 1, 0.1)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: height * 0.3,
    left: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(135, 71, 1, 0.08)",
  },
  backgroundCircle3: {
    position: "absolute",
    top: height * 0.4,
    left: width * 0.8,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(135, 71, 1, 0.06)",
  },

  // Loading overlay styles
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(243, 210, 91, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#874701",
    fontWeight: "600",
  },

  // Main content container
  reg: {
    width: "100%",
    paddingHorizontal: 20,
  },

  // Logo section styles
  logoSection: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  logoContainer: {
    alignItems: "center",
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

  // Welcome section styles
  welcomeSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    marginBottom: 6,
    textShadowColor: "rgba(135, 71, 1, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
  },

  // Form container styles
  formContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  formContent: {
    marginBottom: 15,
  },

  // Input group styles
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    color: "#874701",
    fontWeight: "700",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 50,
  },
  iconContainer: {
    width: 45,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(135, 71, 1, 0.1)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  inputIcon: {
    fontSize: 18,
    color: "#874701",
  },
  countryCodeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRightWidth: 1,
    borderRightColor: "#e9ecef",
  },
  countryCodeText: {
    fontSize: 15,
    color: "#874701",
    fontWeight: "600",
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: "#333",
    paddingHorizontal: 12,
    fontWeight: "500",
  },
  phoneTextInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: "#333",
    paddingHorizontal: 12,
    fontWeight: "500",
  },
  eyeIconContainer: {
    width: 45,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    fontSize: 16,
    color: "#874701",
  },

  // Switch mode button
  switchModeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  switchModeText: {
    color: "#874701",
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // Primary button styles
  primaryButtonContainer: {
    marginBottom: 15,
  },
  primaryButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#874701",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  // Divider styles
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e9ecef",
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 13,
    color: "#6c757d",
    fontWeight: "600",
  },

  // Secondary button styles
  secondaryButton: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#874701",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: "#874701",
    fontSize: 15,
    fontWeight: "700",
  },
})
