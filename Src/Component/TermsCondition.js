/* import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const TermsCondition = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.subheading}>
          These Terms and Conditions (“Terms”) govern your access and use of the
          Just Buy Gold platform, including its website and mobile application,
          managed and operated by Just Buy Gold Pvt. Ltd. (“Company,” “We,”
          “Us,” or “Our”).
        </Text>
        <Text style={styles.text}>
          By accessing or using our platform, you agree to comply with these
          Terms. If you do not agree with these Terms, you must not use the
          platform or its services. This is an electronic document in accordance
          with the Information Technology Act, 2000 and does not require
          physical or digital signatures.
        </Text>

        <Text style={styles.sectionHeading}>Scope of Services</Text>
        <Text style={styles.text}>
          1. The platform enables users (“You” or “Your”) to purchase gold in
          digital form and redeem it into physical gold coins.{'\n'}
          2. We facilitate secure transactions for buying 24k (999) gold. All
          purchases are processed through verified and certified partners.{'\n'}
          3. The platform also provides gold storage, tracking, and delivery
          services, ensuring a seamless experience for users.
        </Text>

        <Text style={styles.sectionHeading}>User Eligibility</Text>
        <Text style={styles.text}>
          1. To register and use our platform, you must be at least 18 years old
          and comply with applicable laws.{'\n'}
          2. By registering, you confirm that the information provided is
          accurate and up to date.
        </Text>

        <Text style={styles.sectionHeading}>Platform Use</Text>
        <Text style={styles.text}>
          1. Registration: Users must verify their mobile number via OTP to
          access the platform.{'\n'}
          2. Transactions: All gold purchases are subject to prevailing market
          rates displayed on the platform.{'\n'}
          3. Conversion: Users can redeem their digital gold into 24k (999)
          physical gold coins, subject to additional delivery charges, if
          applicable.
        </Text>

        <Text style={styles.sectionHeading}>Responsibilities</Text>
        <Text style={styles.text}>
          1. Company's Role:{'\n'}- We act as a facilitator for the purchase and
          redemption of digital gold.{'\n'}- We do not own, store, or directly
          sell gold but ensure its availability through certified partners.
          {'\n'}
          2. User's Responsibility:{'\n'}- Ensure all transactions comply with
          local laws.{'\n'}- Maintain the confidentiality of your account
          credentials.
        </Text>

        <Text style={styles.sectionHeading}>Gold Quality and Custody</Text>
        <Text style={styles.text}>
          1. The gold purchased is 24k (999) certified, ensuring purity and
          quality.{'\n'}
          2. Custody of physical gold is managed by authorized and certified
          vaulting services.
        </Text>

        <Text style={styles.sectionHeading}>Liability Disclaimer</Text>
        <Text style={styles.text}>
          1. The Company is not liable for any disputes arising from:{'\n'}-
          Gold storage by third-party custodians.{'\n'}- Delays or issues caused
          by delivery partners.{'\n'}
          2. Users accept all risks associated with price fluctuations in the
          gold market.
        </Text>

        <Text style={styles.sectionHeading}>Modifications to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to amend or modify these Terms at our sole
          discretion without prior notice. It is the user's responsibility to
          review the Terms periodically.
        </Text>

        <Text style={styles.sectionHeading}>User Benefits and Obligations</Text>
        <Text style={styles.text}>
          1. User Benefits:{'\n'}- Daily gold savings in small, manageable
          amounts.{'\n'}- Redemption of gold in physical form with certification
          of purity.{'\n'}
          2. User Obligations:{'\n'}- Provide accurate personal and
          transactional details.{'\n'}- Abide by platform rules and refrain from
          fraudulent activities.
        </Text>

        <Text style={styles.sectionHeading}>Dispute Resolution</Text>
        <Text style={styles.text}>
          1. All disputes arising out of these Terms shall be resolved amicably.
          {'\n'}
          2. In case of unresolved disputes, they will be subject to arbitration
          under the Arbitration and Conciliation Act, 1996.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsCondition;

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
    // textAlign: 'start',
    // textAlign: 'justify',
    // margin:1
  },
});
 */


import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"

const TermsCondition = ({ navigation }) => {
  return (
    <View style={styles.container}>
     {/*  <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={styles.placeholder} />
      </LinearGradient> */}

      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.introText}>
              These Terms and Conditions ("Terms") govern your access and use of the Just Buy Gold platform, including
              its website and mobile application, managed and operated by Just Buy Gold Pvt. Ltd. ("Company," "We,"
              "Us," or "Our").
            </Text>
            <Text style={styles.text}>
              By accessing or using our platform, you agree to comply with these Terms. If you do not agree with these
              Terms, you must not use the platform or its services. This is an electronic document in accordance with
              the Information Technology Act, 2000 and does not require physical or digital signatures.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="business" size={18} color="#f3d25b" /> Scope of Services
            </Text>
            <Text style={styles.text}>
              1. The platform enables users ("You" or "Your") to purchase gold in digital form and redeem it into
              physical gold coins.{"\n"}
              2. We facilitate secure transactions for buying 24k (999) gold. All purchases are processed through
              verified and certified partners.{"\n"}
              3. The platform also provides gold storage, tracking, and delivery services, ensuring a seamless
              experience for users.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="person" size={18} color="#f3d25b" /> User Eligibility
            </Text>
            <Text style={styles.text}>
              1. To register and use our platform, you must be at least 18 years old and comply with applicable laws.
              {"\n"}
              2. By registering, you confirm that the information provided is accurate and up to date.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="computer" size={18} color="#f3d25b" /> Platform Use
            </Text>
            <Text style={styles.text}>
              1. Registration: Users must verify their mobile number via OTP to access the platform.{"\n"}
              2. Transactions: All gold purchases are subject to prevailing market rates displayed on the platform.
              {"\n"}
              3. Conversion: Users can redeem their digital gold into 24k (999) physical gold coins, subject to
              additional delivery charges, if applicable.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="assignment" size={18} color="#f3d25b" /> Responsibilities
            </Text>
            <Text style={styles.text}>
              1. Company's Role:{"\n"}- We act as a facilitator for the purchase and redemption of digital gold.{"\n"}-
              We do not own, store, or directly sell gold but ensure its availability through certified partners.
              {"\n"}
              2. User's Responsibility:{"\n"}- Ensure all transactions comply with local laws.{"\n"}- Maintain the
              confidentiality of your account credentials.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="stars" size={18} color="#f3d25b" /> Gold Quality and Custody
            </Text>
            <Text style={styles.text}>
              1. The gold purchased is 24k (999) certified, ensuring purity and quality.{"\n"}
              2. Custody of physical gold is managed by authorized and certified vaulting services.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="warning" size={18} color="#f3d25b" /> Liability Disclaimer
            </Text>
            <Text style={styles.text}>
              1. The Company is not liable for any disputes arising from:{"\n"}- Gold storage by third-party custodians.
              {"\n"}- Delays or issues caused by delivery partners.{"\n"}
              2. Users accept all risks associated with price fluctuations in the gold market.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="edit" size={18} color="#f3d25b" /> Modifications to Terms
            </Text>
            <Text style={styles.text}>
              We reserve the right to amend or modify these Terms at our sole discretion without prior notice. It is the
              user's responsibility to review the Terms periodically.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="card-giftcard" size={18} color="#f3d25b" /> User Benefits and Obligations
            </Text>
            <Text style={styles.text}>
              1. User Benefits:{"\n"}- Daily gold savings in small, manageable amounts.{"\n"}- Redemption of gold in
              physical form with certification of purity.{"\n"}
              2. User Obligations:{"\n"}- Provide accurate personal and transactional details.{"\n"}- Abide by platform
              rules and refrain from fraudulent activities.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>
              <Icon name="gavel" size={18} color="#f3d25b" /> Dispute Resolution
            </Text>
            <Text style={styles.text}>
              1. All disputes arising out of these Terms shall be resolved amicably.
              {"\n"}
              2. In case of unresolved disputes, they will be subject to arbitration under the Arbitration and
              Conciliation Act, 1996.
            </Text>
          </View>

          <View style={[styles.card, styles.contactCard]}>
            <Text style={styles.contactHeading}>
              <Icon name="contact-support" size={18} color="#fff" /> Need Help?
            </Text>
            <Text style={styles.contactText}>
              For any questions regarding these Terms & Conditions, please contact our support team.
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </View>
  )
}

export default TermsCondition

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  placeholder: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#f3d25b",
  },
  introText: {
    fontSize: 15,
    color: "#2c3e50",
    lineHeight: 22,
    marginBottom: 12,
    fontWeight: "500",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3e50",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#34495e",
    lineHeight: 22,
    textAlign: "justify",
  },
  contactCard: {
    backgroundColor: "#f3d25b",
    borderLeftColor: "#e6c200",
  },
  contactHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contactText: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  bottomSpacing: {
    height: 20,
  },
})
