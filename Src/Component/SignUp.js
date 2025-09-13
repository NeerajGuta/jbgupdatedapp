import { useState, useEffect, useRef } from "react"
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
import Icon from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const { width, height } = Dimensions.get("window")

function SignUp() {
  // ============ STATE MANAGEMENT ============
  const [username, setusername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneno, setPhoneno] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye-with-line")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation("")

  // ============ ANIMATION REFS ============
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const logoScale = useRef(new Animated.Value(1)).current

  // ============ TOAST HOOK ============
  const { toastConfig, showSuccess, showError, hideToast } = useToast()

  // ============ VALIDATION FUNCTIONS ============
  function isValidMobile(phoneno) {
    phoneno = phoneno?.trim()
    return /^\d{10}$/.test(phoneno)
  }

  function isValidEmail(email) {
    email = email?.trim()
    if (email?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return true
    }
    return false
  }

  function isValidPwd(password) {
    if (password?.length < 8 || password?.length > 15) {
      return false
    }
    return true
  }

  // ============ PASSWORD VISIBILITY TOGGLE ============
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-with-line")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-with-line") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }

  // ============ ENTRANCE ANIMATIONS ============
  useEffect(() => {
    // Main entrance animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()

    // Logo pulsing animation
    const logoAnimation = Animated.loop(
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
    logoAnimation.start()

    return () => logoAnimation.stop()
  }, [])

  // ============ SIGN UP API CALL ============
  const Signup = async () => {
    setIsLoading(true)
    try {
      if (!username) {
        return showError("Name Required !")
      }
      if (!email) {
        return showError("Email Required !")
      }
      if (!isValidEmail(email)) {
        return showError("Invalid your Email Id!")
      }
      if (!phoneno) {
        return showError("Phone No Required !")
      }
      if (!isValidMobile(phoneno)) {
        return showError("Invalid mobile number!")
      }

      const config = {
        url: "/signup",
        method: "post",
        baseURL: "https://justbuynewbackend.onrender.com/api/v1/user/auth",
        headers: { "content-type": "application/json" },
        data: {
          name: username,
          email: email,
          phoneno: phoneno,
          password: "Raghav@123",
        },
      }
      const res = await axios(config)
      if (res.status === 200) {
        console.log(res.data.success)
        showSuccess("Signup Done")
        setTimeout(() => {
          navigation.navigate("SignIn")
        }, 500)
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
      {/* ============ STATUS BAR ============ */}
      <StatusBar backgroundColor="#f3d25b" barStyle="light-content" />

      <View style={styles.container}>
        {/* ============ TOAST NOTIFICATIONS ============ */}
        <Toast
          visible={toastConfig.visible}
          message={toastConfig.message}
          type={toastConfig.type}
          duration={toastConfig.duration}
          onHide={hideToast}
        />

        {/* ============ LOADING OVERLAY ============ */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#874701" />
              <Text style={styles.loadingText}>Creating your account...</Text>
            </View>
          </View>
        )}

        {/* ============ BACKGROUND DECORATIVE CIRCLES ============ */}
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.backgroundCircle3} />
        <View style={styles.backgroundCircle4} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.reg}>
            {/* ============ LOGO SECTION ============ */}
            <Animated.View
              style={[
                styles.logoSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.logoContainer,
                  {
                    transform: [{ scale: logoScale }],
                  },
                ]}
              >
                <View style={styles.logoBackground}>
                  <Image
                    source={require("../../assets/images/newlogo.png")}
                    style={styles.logoImage}
                    resizeMode="cover"
                  />
                </View>
              </Animated.View>
            </Animated.View>

            {/* ============ WELCOME SECTION ============ */}
            <Animated.View
              style={[
                styles.welcomeSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.welcomeTitle}>Join Just Buy Gold!</Text>
              <Text style={styles.welcomeSubtitle}>Create your account to start growing</Text>
            </Animated.View>

            {/* ============ FORM CONTAINER ============ */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
                },
              ]}
            >
              {/* Username Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Icon name="user" style={styles.inputIcon} />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    placeholderTextColor="#888"
                    placeholder="Enter your full name"
                    keyboardType="default"
                    onChangeText={(username) => setusername(username)}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="mail" style={styles.inputIcon} />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={email}
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <FontAwesome6 name="phone" style={styles.inputIcon} />
                  </View>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+91</Text>
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.phoneInput]}
                    value={phoneno}
                    placeholder="Enter mobile number"
                    keyboardType="number-pad"
                    placeholderTextColor="#888"
                    onChangeText={(phoneno) => setPhoneno(phoneno.replace(/[^0-9]/g, "").slice(0, 10))}
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity onPress={Signup} style={styles.signUpButtonContainer}>
                <LinearGradient
                  colors={["#874701", "#a55a02"]}
                  style={styles.signUpButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.signUpButtonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Sign In Button */}
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.signInButtonContainer}>
                <Text style={styles.signInButtonText}>Already have an account? Sign In</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default SignUp

const styles = StyleSheet.create({
  // ============ MAIN CONTAINER ============
  container: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },
  reg: {
    width: "100%",
    minHeight: height,
  },

  // ============ LOADING STYLES ============
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

  // ============ BACKGROUND DECORATIONS ============
  backgroundCircle1: {
    position: "absolute",
    top: height * 0.1,
    right: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(135, 71, 1, 0.1)",
  },
  backgroundCircle2: {
    position: "absolute",
    top: height * 0.3,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(135, 71, 1, 0.08)",
  },
  backgroundCircle3: {
    position: "absolute",
    top: height * 0.6,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(135, 71, 1, 0.12)",
  },
  backgroundCircle4: {
    position: "absolute",
    bottom: height * 0.1,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(135, 71, 1, 0.06)",
  },

  // ============ LOGO SECTION ============
  logoSection: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  logoContainer: {
    shadowColor: "#874701",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#874701",
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  // ============ WELCOME SECTION ============
  welcomeSection: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
  },

  // ============ FORM CONTAINER ============
  formContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
  },

  // ============ INPUT STYLES ============
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#874701",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#874701",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  inputIcon: {
    fontSize: 18,
    color: "white",
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderRightWidth: 1,
    borderRightColor: "#e9ecef",
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#874701",
  },
  textInput: {
    flex: 1,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  phoneInput: {
    paddingLeft: 10,
  },

  // ============ BUTTON STYLES ============
  signUpButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButton: {
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#874701",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.5,
  },

  // ============ DIVIDER STYLES ============
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
    fontWeight: "600",
    color: "#6c757d",
  },

  // ============ SIGN IN BUTTON ============
  signInButtonContainer: {
    alignItems: "center",
    paddingVertical: 15,
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#874701",
    textDecorationLine: "underline",
  },
})
