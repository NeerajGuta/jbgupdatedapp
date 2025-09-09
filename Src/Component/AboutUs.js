/* import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.mainheading}>About Just Buy Gold</Text>
        <Text style={styles.content}>
          Welcome to Just Buy Gold, the most trusted platform for daily gold
          buying and gold coin conversion. With over 20 years of expertise, we
          specialize in transforming your daily savings into tangible 24k (999)
          gold coins, complete with certification for quality and purity.
        </Text>
        <Text style={styles.content}>
          Our vision is to make gold investment simple, secure, and accessible
          for everyone. Whether you're saving for a special occasion or securing
          your future wealth, Just Buy Gold is your partner in turning money
          into pure gold.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.content}>
          At Just Buy Gold, we bring together decades of trust and cutting-edge
          technology to revolutionize gold ownership. We enable customers to
          save daily and convert their savings into 24k (999) gold coins,
          ensuring value, security, and satisfaction.
        </Text>
        <Text style={styles.bulletPoint}>
          • Decades of Trust: Backed by over 20 years of experience in gold
          trading.
        </Text>
        <Text style={styles.bulletPoint}>
          • Guaranteed Purity: Every gold coin comes with a 24k 999 purity
          certification.
        </Text>
        <Text style={styles.bulletPoint}>
          • Simplified Savings: Start with small daily investments and redeem
          them for physical gold coins.
        </Text>
        <Text style={styles.content}>
          Whether you're saving for personal milestones or as an investment,
          Just Buy Gold makes gold ownership seamless and stress-free.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>User Benefits</Text>
        <Text style={styles.bulletPoint}>
          1. Secure Storage: Your purchased gold is safely stored in world-class
          vaults until you’re ready to redeem it.
        </Text>
        <Text style={styles.bulletPoint}>
          2. Transparent Pricing: Real-time gold rates with no hidden charges.
        </Text>
        <Text style={styles.bulletPoint}>
          3. Flexibility: Redeem your gold anytime in physical form or
          equivalent cash value.
        </Text>
        <Text style={styles.bulletPoint}>
          4. Convenience: Easy payments through secure online gateways and app
          integration.
        </Text>
        <Text style={styles.bulletPoint}>
          5. Trusted Partner: Backed by decades of experience and thousands of
          satisfied customers.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Why Buy Gold with Just Buy Gold?</Text>
        <Text style={styles.bulletPoint}>
          1. Proven Expertise: With over 20 years in the gold industry, we
          deliver trust and reliability.
        </Text>
        <Text style={styles.bulletPoint}>
          2. Accessible Investment: Start your gold journey without large
          upfront costs. Save daily at your convenience.
        </Text>
        <Text style={styles.bulletPoint}>
          3. Certified Gold Coins: Get tangible gold coins that are 24k (999)
          pure, backed by a certificate.
        </Text>
        <Text style={styles.bulletPoint}>
          4. Trusted Legacy: With over two decades of expertise in the gold
          market, we’re a name you can rely on.
        </Text>
        <Text style={styles.bulletPoint}>
          5. Ease of Access: Buy gold from anywhere, anytime, using our
          user-friendly app.
        </Text>
        <Text style={styles.bulletPoint}>
          6. Smart Investment: Gold has always been a stable asset for wealth
          preservation. Invest today for a secure tomorrow.
        </Text>
        <Text style={styles.bulletPoint}>
          7. Affordable: No need for a large upfront investment; start with
          small amounts daily.
        </Text>
        <Text style={styles.bulletPoint}>
          8. Community-Focused: Designed to make gold accessible for everyone,
          from homemakers to entrepreneurs.
        </Text>
        <Text style={styles.bulletPoint}>
          9. 100% Transparency: No surprises, no hidden fees—just a
          straightforward gold buying experience.
        </Text>
        <Text style={styles.content}>
          Join thousands of happy customers who trust Just Buy Gold for their
          daily gold investments. Start building your gold portfolio today and
          secure your financial future with ease and confidence.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
  },
  section: {
    marginBottom: 20,
  },
  mainheading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    // textAlign: 'center',
  },
  content: {
    fontSize: 14,
    color: 'black',
    // textAlign: 'justify',
    lineHeight: 20,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    marginLeft: 10,
  },
});
 */


import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"

const AboutUs = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
 */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="stars" size={24} color="#f3d25b" />
            <Text style={styles.mainheading}>About Just Buy Gold</Text>
          </View>
          <Text style={styles.content}>
            Welcome to Just Buy Gold, the most trusted platform for daily gold buying and gold coin conversion. With
            over 20 years of expertise, we specialize in transforming your daily savings into tangible 24k (999) gold
            coins, complete with certification for quality and purity.
          </Text>
          <Text style={styles.content}>
            Our vision is to make gold investment simple, secure, and accessible for everyone. Whether you're saving for
            a special occasion or securing your future wealth, Just Buy Gold is your partner in turning money into pure
            gold.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="info" size={24} color="#f3d25b" />
            <Text style={styles.heading}>About Us</Text>
          </View>
          <Text style={styles.content}>
            At Just Buy Gold, we bring together decades of trust and cutting-edge technology to revolutionize gold
            ownership. We enable customers to save daily and convert their savings into 24k (999) gold coins, ensuring
            value, security, and satisfaction.
          </Text>

          <View style={styles.bulletContainer}>
            <Icon name="verified" size={16} color="#4CAF50" />
            <Text style={styles.bulletPoint}>
              Decades of Trust: Backed by over 20 years of experience in gold trading.
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <Icon name="verified" size={16} color="#4CAF50" />
            <Text style={styles.bulletPoint}>
              Guaranteed Purity: Every gold coin comes with a 24k 999 purity certification.
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <Icon name="verified" size={16} color="#4CAF50" />
            <Text style={styles.bulletPoint}>
              Simplified Savings: Start with small daily investments and redeem them for physical gold coins.
            </Text>
          </View>

          <Text style={styles.content}>
            Whether you're saving for personal milestones or as an investment, Just Buy Gold makes gold ownership
            seamless and stress-free.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="card-giftcard" size={24} color="#f3d25b" />
            <Text style={styles.heading}>User Benefits</Text>
          </View>

          {[
            {
              icon: "security",
              text: "Secure Storage: Your purchased gold is safely stored in world-class vaults until you're ready to redeem it.",
            },
            { icon: "visibility", text: "Transparent Pricing: Real-time gold rates with no hidden charges." },
            {
              icon: "swap-horiz",
              text: "Flexibility: Redeem your gold anytime in physical form or equivalent cash value.",
            },
            { icon: "payment", text: "Convenience: Easy payments through secure online gateways and app integration." },
            {
              icon: "thumb-up",
              text: "Trusted Partner: Backed by decades of experience and thousands of satisfied customers.",
            },
          ].map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Icon name={benefit.icon} size={20} color="#f3d25b" />
              </View>
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="diamond" size={24} color="#f3d25b" />
            <Text style={styles.heading}>Why Buy Gold with Just Buy Gold?</Text>
          </View>

          {[
            "Proven Expertise: With over 20 years in the gold industry, we deliver trust and reliability.",
            "Accessible Investment: Start your gold journey without large upfront costs. Save daily at your convenience.",
            "Certified Gold Coins: Get tangible gold coins that are 24k (999) pure, backed by a certificate.",
            "Trusted Legacy: With over two decades of expertise in the gold market, we're a name you can rely on.",
            "Ease of Access: Buy gold from anywhere, anytime, using our user-friendly app.",
            "Smart Investment: Gold has always been a stable asset for wealth preservation. Invest today for a secure tomorrow.",
            "Affordable: No need for a large upfront investment; start with small amounts daily.",
            "Community-Focused: Designed to make gold accessible for everyone, from homemakers to entrepreneurs.",
            "100% Transparency: No surprises, no hidden fees—just a straightforward gold buying experience.",
          ].map((reason, index) => (
            <View key={index} style={styles.reasonItem}>
              <View style={styles.reasonNumber}>
                <Text style={styles.reasonNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.reasonText}>{reason}</Text>
            </View>
          ))}

          <View style={styles.ctaContainer}>
            <Text style={styles.ctaText}>
              Join thousands of happy customers who trust Just Buy Gold for their daily gold investments. Start building
              your gold portfolio today and secure your financial future with ease and confidence.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AboutUs

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
    paddingVertical: 12,
    paddingTop: 40,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  placeholder: {
    width: 40,
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderLeftWidth: 4,
    borderLeftColor: "#f3d25b",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  mainheading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginLeft: 12,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginLeft: 12,
    flex: 1,
  },
  content: {
    fontSize: 15,
    color: "#34495e",
    lineHeight: 22,
    marginBottom: 12,
    textAlign: "justify",
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#34495e",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(243, 210, 91, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: "#34495e",
    flex: 1,
    lineHeight: 20,
  },
  reasonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reasonNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f3d25b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  reasonNumberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  reasonText: {
    fontSize: 14,
    color: "#34495e",
    flex: 1,
    lineHeight: 20,
  },
  ctaContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(243, 210, 91, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(243, 210, 91, 0.3)",
  },
  ctaText: {
    fontSize: 15,
    color: "#2c3e50",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 22,
  },
})
