/* import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.subheading}>
          This Privacy Policy (“Policy”) explains how Just Buy Gold Pvt. Ltd.
          (“Company,” “We,” “Us,” or “Our”) collects, processes, and protects
          your personal information when you use our platform, including our
          website and mobile application (collectively, the “Platform”). This
          Policy is an integral part of our Terms and Conditions, and by using
          the Platform, you agree to abide by this Policy.
        </Text>

        <Text style={styles.sectionHeading}>1. Introduction</Text>
        <Text style={styles.text}>
          Your privacy is important to us, and we handle your personal data with
          utmost care. By visiting or using the Platform, you consent to the
          collection, use, and sharing of your information as outlined in this
          Policy. If you do not agree, please do not use the Platform or its
          services.
        </Text>

        <Text style={styles.sectionHeading}>2. Information We Collect</Text>
        <Text style={styles.text}>
          a) Personal Information{'\n'}- Name, email address, phone number.
          {'\n'}- KYC details for gold purchases exceeding regulatory
          thresholds, including PAN, Aadhaar, driving license, or other proof of
          identity.{'\n'}
          b) Sensitive Information{'\n'}- Bank account details or payment method
          information for transaction purposes.{'\n'}
          c) Device and Location Information{'\n'}- Access to device gallery,
          contacts, SMS, and location, based on permissions granted through the
          mobile application.{'\n'}
          d) Usage Data{'\n'}- Data related to your interactions on the
          Platform, including purchase history, preferences, and login activity.
        </Text>

        <Text style={styles.sectionHeading}>
          3. How We Use Your Information
        </Text>
        <Text style={styles.text}>
          We use your information to:{'\n'}
          1. Authenticate your account and secure transactions.{'\n'}
          2. Personalize your experience on the Platform.{'\n'}
          3. Facilitate gold purchases, sales, and redemptions.{'\n'}
          4. Ensure regulatory compliance (e.g., KYC for purchases exceeding 30
          grams).{'\n'}
          5. Prevent fraudulent activity and enhance security.{'\n'}
          6. Communicate with you about services, updates, or offers.
        </Text>

        <Text style={styles.sectionHeading}>4. Sharing Your Information</Text>
        <Text style={styles.text}>
          We do not sell or rent your personal information to third parties.
          However, your information may be shared with:{'\n'}
          1. Trusted Partners: For order fulfillment, storage, and delivery of
          physical gold.{'\n'}
          2. Regulatory Authorities: To comply with legal obligations, such as
          tax reporting or fraud prevention.{'\n'}
          3. Third-Party Service Providers: For payment processing, identity
          verification, and data analysis.
        </Text>

        <Text style={styles.sectionHeading}>5. Data Retention</Text>
        <Text style={styles.text}>
          We retain your personal data for as long as necessary to fulfill the
          purposes outlined in this Policy, comply with legal obligations, or
          resolve disputes.
        </Text>

        <Text style={styles.sectionHeading}>6. Security Measures</Text>
        <Text style={styles.text}>
          We implement robust security protocols to protect your data from
          unauthorized access, disclosure, alteration, or destruction. However,
          no online system can be completely secure. You are responsible for
          safeguarding your account credentials.
        </Text>

        <Text style={styles.sectionHeading}>7. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:{'\n'}- Access, update, or delete your personal
          information, subject to applicable laws.{'\n'}- Withdraw consent for
          data processing (may limit Platform functionality).{'\n'}- File a
          complaint with relevant data protection authorities if you believe
          your privacy rights are violated.
        </Text>

        <Text style={styles.sectionHeading}>8. Cookies and Tracking</Text>
        <Text style={styles.text}>
          The Platform uses cookies and similar tracking technologies to enhance
          your browsing experience. You can manage cookie preferences through
          your browser settings.
        </Text>

        <Text style={styles.sectionHeading}>9. Changes to This Policy</Text>
        <Text style={styles.text}>
          We reserve right to modify or amend this Policy at any time. Changes
          will be communicated via the Platform, and your continued use
          constitutes acceptance of the updated Policy.
        </Text>

        <Text style={styles.sectionHeading}>10. Contact Us</Text>
        <Text style={styles.text}>
          If you have questions or concerns about this Policy, please contact us
          at:{'\n'}
          Email: support@justbuygold.com{'\n'}
          Phone: +919019095596 / 9019070105
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
    // textAlign: 'justify',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    // textAlign: 'justify',
  },
});
 */


import { StyleSheet, Text, View, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient"

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
     {/*  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </LinearGradient> */}

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.introText}>
            This Privacy Policy ("Policy") explains how Just Buy Gold Pvt. Ltd. ("Company," "We," "Us," or "Our")
            collects, processes, and protects your personal information when you use our platform, including our website
            and mobile application (collectively, the "Platform"). This Policy is an integral part of our Terms and
            Conditions, and by using the Platform, you agree to abide by this Policy.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>1. Introduction</Text>
          <Text style={styles.text}>
            Your privacy is important to us, and we handle your personal data with utmost care. By visiting or using the
            Platform, you consent to the collection, use, and sharing of your information as outlined in this Policy. If
            you do not agree, please do not use the Platform or its services.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>2. Information We Collect</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>a) Personal Information{"\n"}</Text>- Name, email address, phone number.{"\n"}
            - KYC details for gold purchases exceeding regulatory thresholds, including PAN, Aadhaar, driving license,
            or other proof of identity.{"\n\n"}
            <Text style={styles.boldText}>b) Sensitive Information{"\n"}</Text>- Bank account details or payment method
            information for transaction purposes.{"\n\n"}
            <Text style={styles.boldText}>c) Device and Location Information{"\n"}</Text>- Access to device gallery,
            contacts, SMS, and location, based on permissions granted through the mobile application.{"\n\n"}
            <Text style={styles.boldText}>d) Usage Data{"\n"}</Text>- Data related to your interactions on the Platform,
            including purchase history, preferences, and login activity.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>3. How We Use Your Information</Text>
          <Text style={styles.text}>
            We use your information to:{"\n"}
            1. Authenticate your account and secure transactions.{"\n"}
            2. Personalize your experience on the Platform.{"\n"}
            3. Facilitate gold purchases, sales, and redemptions.{"\n"}
            4. Ensure regulatory compliance (e.g., KYC for purchases exceeding 30 grams).{"\n"}
            5. Prevent fraudulent activity and enhance security.{"\n"}
            6. Communicate with you about services, updates, or offers.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>4. Sharing Your Information</Text>
          <Text style={styles.text}>
            We do not sell or rent your personal information to third parties. However, your information may be shared
            with:{"\n\n"}
            <Text style={styles.boldText}>1. Trusted Partners:</Text> For order fulfillment, storage, and delivery of
            physical gold.{"\n\n"}
            <Text style={styles.boldText}>2. Regulatory Authorities:</Text> To comply with legal obligations, such as
            tax reporting or fraud prevention.{"\n\n"}
            <Text style={styles.boldText}>3. Third-Party Service Providers:</Text> For payment processing, identity
            verification, and data analysis.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>5. Data Retention</Text>
          <Text style={styles.text}>
            We retain your personal data for as long as necessary to fulfill the purposes outlined in this Policy,
            comply with legal obligations, or resolve disputes.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>6. Security Measures</Text>
          <Text style={styles.text}>
            We implement robust security protocols to protect your data from unauthorized access, disclosure,
            alteration, or destruction. However, no online system can be completely secure. You are responsible for
            safeguarding your account credentials.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>7. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to:{"\n"}- Access, update, or delete your personal information, subject to applicable
            laws.{"\n"}- Withdraw consent for data processing (may limit Platform functionality).{"\n"}- File a
            complaint with relevant data protection authorities if you believe your privacy rights are violated.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>8. Cookies and Tracking</Text>
          <Text style={styles.text}>
            The Platform uses cookies and similar tracking technologies to enhance your browsing experience. You can
            manage cookie preferences through your browser settings.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>9. Changes to This Policy</Text>
          <Text style={styles.text}>
            We reserve right to modify or amend this Policy at any time. Changes will be communicated via the Platform,
            and your continued use constitutes acceptance of the updated Policy.
          </Text>
        </View>

        <View style={[styles.card, styles.contactCard]}>
          <Text style={styles.sectionHeading}>10. Contact Us</Text>
          <Text style={styles.text}>If you have questions or concerns about this Policy, please contact us at:</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>📧 Email: support@justbuygold.com</Text>
            <Text style={styles.contactText}>📞 Phone: +919019095596 / 9019070105</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  introText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    fontStyle: "italic",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3e50",
  },
  text: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  boldText: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  contactCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#f3d25b",
    backgroundColor: "#fffbf0",
  },
  contactInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  contactText: {
    fontSize: 15,
    color: "#2c3e50",
    marginBottom: 8,
    fontWeight: "500",
  },
})
