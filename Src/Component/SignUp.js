
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

    // Logo pulse animation - continuous loop (same as SignIn)
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
          <Animated.View
            style={[
              styles.reg,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* ============ LOGO SECTION - EXACT COPY FROM SIGNIN ============ */}
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
                    source={require("../../assets/images/Buygold.jpg")}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </Animated.View>

            {/* ============ WELCOME SECTION ============ */}
            <Animated.View
              style={[
                styles.welcomeSection,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
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
                  transform: [{ translateY: slideAnim }],
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
          </Animated.View>
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
    paddingHorizontal: 20,
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

  // ============ BACKGROUND DECORATIONS ============
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
  backgroundCircle4: {
    position: "absolute",
    bottom: height * 0.1,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(135, 71, 1, 0.06)",
  },

  // ============ LOGO SECTION - EXACT COPY FROM SIGNIN ============
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

  // ============ WELCOME SECTION ============
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

  // ============ FORM CONTAINER ============
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

  // ============ INPUT STYLES ============
  inputSection: {
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
  countryCode: {
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
  phoneInput: {
    paddingLeft: 10,
  },

  // ============ BUTTON STYLES ============
  signUpButtonContainer: {
    marginBottom: 15,
  },
  signUpButton: {
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
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
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
    color: "#6c757d",
    fontWeight: "600",
  },

  // ============ SIGN IN BUTTON ============
  signInButtonContainer: {
    alignItems: "center",
    paddingVertical: 15,
  },
  signInButtonText: {
    color: "#874701",
    fontSize: 15,
    fontWeight: "700",
  },
})
