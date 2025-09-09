import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "./Toast"
import useToast from "../hooks/useToast"

const { height } = Dimensions.get("window")

const TermsConditions = () => {
  const navigation = useNavigation()
  const [isAccepted, setIsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toastConfig, showSuccess, showError, hideToast } = useToast()

  const handleAccept = async () => {
    if (!isAccepted) {
      showError("Please accept the terms and conditions to continue")
      return
    }

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

      // Save terms acceptance with user-specific key
      await AsyncStorage.setItem(`termsAccepted_${userId}`, "true")
      await AsyncStorage.setItem(`onboardingCompleted_${userId}`, "true")

      showSuccess("Welcome! Setting up your account...")

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home1" }],
        })
      }, 1500)
    } catch (error) {
      console.error("Error saving terms acceptance:", error)
      showError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    })
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
            <Text style={styles.loadingText}>Setting up your account...</Text>
          </View>
        )}

        {/* FULL SCREEN CONTENT */}
        <View style={styles.fullScreenContent}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={styles.subtitle}>Please read and accept our terms to continue</Text>
          </View>

          <View style={styles.termsSection}>
            <ScrollView style={styles.termsScrollView} showsVerticalScrollIndicator={true}>
              <Text style={styles.heading}>Terms and Conditions</Text>
              <Text style={styles.subheading}>
                These Terms and Conditions ("Terms") govern your access and use of the Just Buy Gold platform, including
                its website and mobile application, managed and operated by Just Buy Gold Pvt. Ltd. ("Company," "We,"
                "Us," or "Our").
              </Text>
              <Text style={styles.text}>
                By accessing or using our platform, you agree to comply with these Terms. If you do not agree with these
                Terms, you must not use the platform or its services. This is an electronic document in accordance with
                the Information Technology Act, 2000 and does not require physical or digital signatures.
              </Text>

              <Text style={styles.sectionHeading}>Scope of Services</Text>
              <Text style={styles.text}>
                1. The platform enables users ("You" or "Your") to purchase gold in digital form and redeem it into
                physical gold coins.{"\n"}
                2. We facilitate secure transactions for buying 24k (999) gold. All purchases are processed through
                verified and certified partners.{"\n"}
                3. The platform also provides gold storage, tracking, and delivery services, ensuring a seamless
                experience for users.
              </Text>

              <Text style={styles.sectionHeading}>User Eligibility</Text>
              <Text style={styles.text}>
                1. To register and use our platform, you must be at least 18 years old and comply with applicable laws.
                {"\n"}
                2. By registering, you confirm that the information provided is accurate and up to date.
              </Text>

              <Text style={styles.sectionHeading}>Platform Use</Text>
              <Text style={styles.text}>
                1. Registration: Users must verify their mobile number via OTP to access the platform.{"\n"}
                2. Transactions: All gold purchases are subject to prevailing market rates displayed on the platform.
                {"\n"}
                3. Conversion: Users can redeem their digital gold into 24k (999) physical gold coins, subject to
                additional delivery charges, if applicable.
              </Text>

              <Text style={styles.sectionHeading}>Responsibilities</Text>
              <Text style={styles.text}>
                1. Company's Role:{"\n"}- We act as a facilitator for the purchase and redemption of digital gold.{"\n"}
                - We do not own, store, or directly sell gold but ensure its availability through certified partners.
                {"\n"}
                2. User's Responsibility:{"\n"}- Ensure all transactions comply with local laws.{"\n"}- Maintain the
                confidentiality of your account credentials.
              </Text>

              <Text style={styles.sectionHeading}>Gold Quality and Custody</Text>
              <Text style={styles.text}>
                1. The gold purchased is 24k (999) certified, ensuring purity and quality.{"\n"}
                2. Custody of physical gold is managed by authorized and certified vaulting services.
              </Text>

              <Text style={styles.sectionHeading}>Liability Disclaimer</Text>
              <Text style={styles.text}>
                1. The Company is not liable for any disputes arising from:{"\n"}- Gold storage by third-party
                custodians.
                {"\n"}- Delays or issues caused by delivery partners.{"\n"}
                2. Users accept all risks associated with price fluctuations in the gold market.
              </Text>

              <Text style={styles.sectionHeading}>Modifications to Terms</Text>
              <Text style={styles.text}>
                We reserve the right to amend or modify these Terms at our sole discretion without prior notice. It is
                the user's responsibility to review the Terms periodically.
              </Text>

              <Text style={styles.sectionHeading}>User Benefits and Obligations</Text>
              <Text style={styles.text}>
                1. User Benefits:{"\n"}- Daily gold savings in small, manageable amounts.{"\n"}- Redemption of gold in
                physical form with certification of purity.{"\n"}
                2. User Obligations:{"\n"}- Provide accurate personal and transactional details.{"\n"}- Abide by
                platform rules and refrain from fraudulent activities.
              </Text>

              <Text style={styles.sectionHeading}>Dispute Resolution</Text>
              <Text style={styles.text}>
                1. All disputes arising out of these Terms shall be resolved amicably.{"\n"}
                2. In case of unresolved disputes, they will be subject to arbitration under the Arbitration and
                Conciliation Act, 1996.
              </Text>

              <Text style={styles.lastUpdated}>
                <Text style={styles.boldText}>Last updated:</Text> {new Date().toLocaleDateString()}
              </Text>
            </ScrollView>
          </View>

          <View style={styles.actionSection}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} onPress={() => setIsAccepted(!isAccepted)} activeOpacity={0.7}>
                <View style={[styles.checkboxInner, isAccepted && styles.checkboxChecked]}>
                  {isAccepted && <MaterialIcons name="check" size={16} color="white" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                By checking this box, you are agreeing to our terms and conditions.
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleExit} activeOpacity={0.8}>
                <Text style={styles.exitButtonText}>Exit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.acceptButton, !isAccepted && styles.disabledButton]}
                onPress={handleAccept}
                disabled={!isAccepted}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isAccepted ? ["#4CAF50", "#45a049"] : ["#cccccc", "#999999"]}
                  style={styles.acceptGradient}
                >
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default TermsConditions

const styles = StyleSheet.create({
  // FULL SCREEN STYLES
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#f3d25b",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#874701",
    fontWeight: "600",
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
    paddingTop: 20,
    flex: 0.15,
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
  termsSection: {
    flex: 0.65,
    paddingVertical: 10,
  },
  termsScrollView: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#874701",
    marginBottom: 15,
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    lineHeight: 22,
    textAlign: "justify",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#874701",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
    marginBottom: 15,
  },
  boldText: {
    fontWeight: "bold",
    color: "#874701",
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  actionSection: {
    flex: 0.2,
    justifyContent: "space-between",
    paddingTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  exitButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#874701",
    justifyContent: "center",
    alignItems: "center",
  },
  exitButtonText: {
    color: "#874701",
    fontSize: 16,
    fontWeight: "bold",
  },
  acceptButton: {
    overflow: "hidden",
  },
  acceptGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
})
