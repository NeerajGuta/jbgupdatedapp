import { useState } from "react"
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

function SignIn() {
  const [phoneno, setPhoneno] = useState("")
  const navigation = useNavigation()
  const [acc, setAcc] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye-with-line")
  const [isLoading, setIsLoading] = useState(false)

  const { toastConfig, showSuccess, showError, showWarning, hideToast } = useToast()

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-with-line")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-with-line") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }

  const loginEmail = async () => {
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
        baseURL: "https://justbuygold.co.in/api/v1/user/auth",
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

  const Otpsend = async () => {
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
        baseURL: "https://justbuygold.co.in/api/v1/user/auth",
        headers: { "content-type": "application/json" },
        data: {
          phoneno: phoneno,
        },
      }
      const res = await axios(config)
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
        <ScrollView>
          <View style={styles.reg}>
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
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.register}>
              <Text style={styles.text1}>Login Now !</Text>
            </View>
            {acc ? (
              <>
                <View style={styles.back}>
                  <Text style={styles.contant}>Email</Text>
                  <View style={styles.regback}>
                    <Ionicons name="mail" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      value={email}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      onChangeText={(email) => setEmail(email)}
                    />
                  </View>
                  <Text style={styles.contant}>Password</Text>
                  <View style={styles.regback}>
                    <Icon name="lock" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      value={password}
                      placeholder="Enter your password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholderTextColor="black"
                      secureTextEntry={passwordVisibility}
                      enablesReturnKeyAutomatically
                      onChangeText={(password) => setPassword(password)}
                    />
                    <TouchableOpacity onPress={handlePasswordVisibility}>
                      <Entypo name={rightIcon} style={[styles.icons2, { marginTop: -10, fontSize: 18 }]} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setAcc(!acc)
                    }}
                  >
                    <Text
                      style={{
                        color: "#874701",
                        fontSize: 16,
                        fontWeight: "600",
                        textAlign: "right",
                        fontFamily: "Poppins-ExtraBoldItalic",
                      }}
                    >
                      Sign In with phone number !
                    </Text>
                  </TouchableOpacity>
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
                    <TouchableOpacity onPress={loginEmail}>
                      <LinearGradient colors={["#874701", "#874701"]} style={styles.linearGradient}>
                        <Text style={styles.btn}>Sign In</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "800",
                      color: "black",
                    }}
                  >
                    OR
                  </Text>
                  <View style={[styles.regback1, { flexDirection: "row", justifyContent: "center" }]}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("SignUp")
                      }}
                    >
                      <Text style={styles.btn2}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.back}>
                  <Text style={styles.contant}>Phone No</Text>
                  <View style={styles.regback}>
                    <FontAwesome6 name="phone" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      value={phoneno}
                      placeholder="Please enter your mobile number"
                      keyboardType="numeric"
                      placeholderTextColor="black"
                      onChangeText={(text) => setPhoneno(text.replace(/[^0-9]/g, "").slice(0, 10))}
                      maxLength={10}
                    />
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
                    <TouchableOpacity onPress={Otpsend}>
                      <LinearGradient colors={["#874701", "#874701"]} style={styles.linearGradient}>
                        <Text style={styles.btn}>Send OTP</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "800",
                      color: "black",
                    }}
                  >
                    OR
                  </Text>
                  <View style={[styles.regback1, { flexDirection: "row", justifyContent: "center" }]}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("SignUp")
                      }}
                    >
                      <Text style={styles.btn2}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  )
}
export default SignIn

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
  reg: {
    width: "100%",
  },
  register: {
    position: "relative",
    marginTop: 80,
  },
  text1: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  back: {
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 200,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "relative",
  },
  regback: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icons: {
    position: "absolute",
    zIndex: 999,
    left: 8,
    fontSize: 22,
    color: "#874701",
  },
  icons2: {
    position: "absolute",
    zIndex: 999,
    right: 8,
    fontSize: 22,
    color: "#874701",
  },
  input: {
    height: 45,
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 15,
    color: "black",
    paddingLeft: 33,
    width: "100%",
    borderColor: "#874701",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    fontFamily: "Poppins-MediumItalic",
  },
  contant: {
    fontSize: 17,
    color: "black",
    fontWeight: "700",
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
  btn2: {
    textAlign: "center",
    fontSize: 17,
    borderColor: "#874701",
    borderWidth: 2,
    color: "black",
    fontWeight: "700",
    padding: 8,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 100,
    width: 250,
  },
  linearGradient: {
    flex: 1,
    width: 250,
    borderRadius: 100,
  },
})