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
import Icon from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

function SignUp() {
  const [username, setusername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneno, setPhoneno] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye-with-line")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation("")

  const { toastConfig, showSuccess, showError, hideToast } = useToast()

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

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-with-line")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-with-line") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }

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
        baseURL: "http://192.168.1.26:3034/api/v1/user/auth",
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
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              <Image
                source={require("../../assets/images/newlogo.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.register}>
              <Text style={styles.text1}>Register Now !</Text>
            </View>
            <View style={styles.back}>
              <Text style={styles.contant}>User Name</Text>
              <View style={styles.regback}>
                <Icon name="user" style={styles.icons} />
                <TextInput
                  style={styles.input}
                  value={username}
                  placeholderTextColor="black"
                  placeholder="Enter your username"
                  keyboardType="default"
                  onChangeText={(username) => setusername(username)}
                />
              </View>
              <Text style={styles.contant}>Email</Text>
              <View style={styles.regback}>
                <Ionicons name="mail" style={styles.icons} />
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  placeholderTextColor="black"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
              <Text style={styles.contant}>Phone No</Text>
              <View style={styles.regback}>
                <FontAwesome6 name="phone" style={styles.icons} />
                <TextInput
                  style={styles.input}
                  value={phoneno}
                  placeholder="Enter your phone no"
                  keyboardType="number-pad"
                  placeholderTextColor="black"
                  onChangeText={(phoneno) => setPhoneno(phoneno.replace(/[^0-9]/g, "").slice(0, 10))}
                  maxLength={10}
                />
              </View>
              <View
                style={[
                  styles.regback1,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 20,
                  },
                ]}
              >
                <TouchableOpacity onPress={Signup}>
                  <LinearGradient colors={["#874701", "#874701"]} style={styles.linearGradient}>
                    <Text style={styles.btn}>Sign Up</Text>
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
                    navigation.navigate("SignIn")
                  }}
                >
                  <Text style={styles.btn2}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}
export default SignUp

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
    marginTop: 20,
  },
  text1: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  back: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 60,
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
    fontSize: 15,
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
