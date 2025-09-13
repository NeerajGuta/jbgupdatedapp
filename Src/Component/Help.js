// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Image} from 'react-native-animatable';

// const Help = () => {
//   return (
//     <ImageBackground
//       source={require('../../assets/images/background.jpg')}
//       style={{flex: 1}}
//       resizeMode="cover">
//       <SafeAreaView style={styles.container}>
//         <ScrollView>
//           <View style={styles.container1}>
//             <View style={styles.contact}>
//               <FontAwesome5 name="phone-alt" size={22} style={styles.service} />
//               <View>
//                 <Text style={styles.textfont}>Our 24x7 Customer Service</Text>
//                 <Text style={styles.textfont1}>
//                   +91 9019095596 / 9019070105
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.contact}>
//               <MaterialCommunityIcons
//                 name="email-outline"
//                 size={22}
//                 style={styles.service}
//               />
//               <View>
//                 <Text style={styles.textfont}>Write us at</Text>
//                 <Text style={styles.textfont1}>justbuygold100@gmail.com</Text>
//               </View>
//             </View>
//             <View style={styles.contact}>
//               <FontAwesome6
//                 name="location-dot"
//                 size={22}
//                 style={styles.service}
//               />
//               <View>
//                 <Text style={styles.textfont}>Location</Text>
//                 <Text style={styles.textfont1}>
//                   Ground Floor, No 3, 9th A Main Road, Byraweshwara Nagar,
//                   Nagarbhavi, Bengaluru Karnataka{'\n'}560072
//                 </Text>
//               </View>
//             </View>
//             <Image
//               source={require('../../assets/images/g11.png')}
//               resizeMode="contain"
//               style={{
//                 width: '100%',
//                 height: 300,
//               }}
//             />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// export default Help;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   contact: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     marginVertical: 10,
//     marginHorizontal: 10,
//     shadowColor: '#000',
//     backgroundColor: '#fff',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     borderRadius: 5,
//   },
//   service: {
//     borderWidth: 1,
//     height: 50,
//     width: 50,
//     padding: 11,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     borderRadius: 50,
//     borderColor: 'white',
//     backgroundColor: 'white',
//     color: '#feac03',
//   },
//   textfont: {
//     color: 'black',
//     fontSize: 13,
//     fontFamily: 'Poppins-ExtraBoldItalic',
//   },
//   textfont1: {
//     color: 'black',
//     fontSize: 15,
//     fontFamily: 'Poppins-SemiBoldItalic',
//   },
// });

import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, StatusBar, Platform } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Image } from "react-native-animatable"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

const Help = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f3d25b" barStyle="dark-content" />

      {/* <LinearGradient colors={["#f3d25b", "#f3d25b"]} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={20} color="#874701" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient> */}

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.container1}>
            <View style={styles.contact}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="phone-alt" size={20} color="#874701" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textfont}>Our 24x7 Customer Service</Text>
                <Text style={styles.textfont1}>+91 9019095596 / 9019070105</Text>
              </View>
            </View>

            <View style={styles.contact}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#874701" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textfont}>Write us at</Text>
                <Text style={styles.textfont1}>justbuygold100@gmail.com</Text>
              </View>
            </View>

            <View style={styles.contact}>
              <View style={styles.iconContainer}>
                <FontAwesome6 name="location-dot" size={20} color="#874701" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textfont}>Location</Text>
                <Text style={styles.textfont1}>
                  Ground Floor, No 3, 9th A Main Road, Byraweshwara Nagar, Nagarbhavi, Bengaluru Karnataka{"\n"}560072
                </Text>
              </View>
            </View>

            <View style={styles.imageCard}>
              <View style={styles.helpTextContainer}>
                <Text style={styles.helpTitle}>Can I Help You?</Text>
                <Text style={styles.helpSubtitle}>Our customer service team is here to assist you 24/7</Text>
              </View>
              <Image source={require("../../assets/images/g11.png")} resizeMode="contain" style={styles.image} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Help

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    backgroundColor: "#f8f9fa",
  },

  headerGradient: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#874701",
    fontFamily: "Poppins-SemiBoldItalic",
  },
  headerSpacer: {
    width: 36,
  },

  contentContainer: {
    padding: 15,
  },
  container1: {
    flex: 1,
  },

  contact: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#f3d25b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
    shadowColor: "#f3d25b",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  textContainer: {
    flex: 1,
  },

  textfont: {
    color: "#1a1a1a",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Poppins-SemiBoldItalic",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  textfont1: {
    color: "#4a5568",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  imageCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 24,
    marginTop: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#f3d25b",
    padding: 20,
  },
  helpTextContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#874701",
    fontFamily: "Poppins-SemiBoldItalic",
    textAlign: "center",
    marginBottom: 8,
  },
  helpSubtitle: {
    fontSize: 16,
    color: "#4a5568",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  image: {
    width: "100%",
    height: 280,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#f3d25b",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
})
