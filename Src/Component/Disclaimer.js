import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const Disclaimer = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Disclaimer</Text>
        <Text style={styles.content}>
          The information provided on the Just Buy Gold website and mobile
          application (collectively referred to as the “Platform”) is for
          general informational purposes only. By using the Platform, you
          acknowledge and agree to the following:
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>1. No Warranties</Text>
        <Text style={styles.content}>
          The content on the Platform is provided on an "as is" and "as
          available" basis without any representations or warranties, express or
          implied. We do not guarantee the accuracy, completeness, or
          reliability of the information provided, including gold rates,
          policies, or other services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>2. Investment Risks</Text>
        <Text style={styles.content}>
          Purchasing gold involves certain risks, including market fluctuations.
          The value of gold may increase or decrease over time, and past
          performance is not indicative of future results. Just Buy Gold Pvt.
          Ltd. is not responsible for any losses incurred due to market
          volatility or investment decisions made based on information available
          on the Platform.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>3. Third-Party Services</Text>
        <Text style={styles.content}>
          The Platform facilitates the purchase, sale, and redemption of gold
          via trusted third-party partners. Just Buy Gold Pvt. Ltd. does not
          own, store, or manage physical gold but acts as a facilitator. Any
          disputes or claims regarding the storage, delivery, or quality of gold
          must be resolved directly with the third-party service provider.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>4. Limited Liability</Text>
        <Text style={styles.content}>
          To the maximum extent permitted by law, Just Buy Gold Pvt. Ltd., its
          directors, employees, and affiliates shall not be liable for any
          direct, indirect, incidental, consequential, or punitive damages
          arising from:
        </Text>
        <Text style={styles.bulletPoint}>
          • Your use or inability to use the Platform.
        </Text>
        <Text style={styles.bulletPoint}>
          • Errors, omissions, or inaccuracies in the Platform's content.
        </Text>
        <Text style={styles.bulletPoint}>
          • Any unauthorized access to or use of your account or personal data.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>5. Regulatory Compliance</Text>
        <Text style={styles.content}>
          The Platform and its services comply with applicable laws and
          regulations. However, it is your responsibility to ensure compliance
          with your local laws when using the Platform.
        </Text>
      </View>

         <View style={styles.section}>
        <Text style={styles.subheading}>6. User Responsibility</Text>
        <Text style={styles.bulletPoint}>
          • Users are responsible for maintaining the confidentiality of their
          account credentials.
        </Text>
        <Text style={styles.bulletPoint}>
          • Users should ensure all information provided during registration or
          transactions is accurate and up-to-date.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>7. Updates and Changes</Text>
        <Text style={styles.content}>
          Just Buy Gold Pvt. Ltd. reserves the right to update or modify this
          Disclaimer at any time without prior notice. Continued use of the
          Platform constitutes acceptance of these changes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>8. Contact Us</Text>
        <Text style={styles.content}>
          If you have questions or concerns about this Disclaimer, please reach
          out to us at:
        </Text>
        <Text style={styles.bulletPoint}>Email: justbuygold100@gmail.com</Text>
        <Text style={styles.bulletPoint}>Phone: +99019095596 / 9019070105</Text>
      </View>
    </ScrollView>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#333',
    // textAlign: 'justify',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    marginLeft: 10,
  },
});
