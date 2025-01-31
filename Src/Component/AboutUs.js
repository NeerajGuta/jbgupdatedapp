import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
