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

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native-animatable';

const {width} = Dimensions.get('window');

const Help = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/app-bg.jpg')}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container1}>
            <View style={styles.contact}>
              <FontAwesome5 name="phone-alt" size={22} style={styles.service} />
              <View style={styles.textContainer}>
                <Text style={styles.textfont}>Our 24x7 Customer Service</Text>
                <Text style={styles.textfont1}>
                  +91 9019095596 / 9019070105
                </Text>
              </View>
            </View>

            <View style={styles.contact}>
              <MaterialCommunityIcons
                name="email-outline"
                size={22}
                style={styles.service}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textfont}>Write us at</Text>
                <Text style={styles.textfont1}>justbuygold100@gmail.com</Text>
              </View>
            </View>

            <View style={styles.contact}>
              <FontAwesome6
                name="location-dot"
                size={22}
                style={styles.service}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textfont}>Location</Text>
                <Text style={styles.textfont1}>
                  Ground Floor, No 3, 9th A Main Road, Byraweshwara Nagar,
                  Nagarbhavi, Bengaluru Karnataka{'\n'}560072
                </Text>
              </View>
            </View>

            <Image
              source={require('../../assets/images/g11.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Help;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  container1: {
    flex: 1,
    padding: 10,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  service: {
    borderWidth: 1,
    height: 50,
    width: 50,
    padding: 11,
    textAlign: 'center',
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    color: '#feac03',
    textAlignVertical: 'center',
  },
  textContainer: {
    flex: 1,
  },
  textfont: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Poppins-ExtraBoldItalic',
  },
  textfont1: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  image: {
    width: width - 40,
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
});
