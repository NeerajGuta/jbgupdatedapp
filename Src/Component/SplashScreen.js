// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useFocusEffect} from '@react-navigation/native';
// import React, {useCallback, useEffect} from 'react';
// import {View, Text, StyleSheet, Image} from 'react-native';
// import * as Animatable from 'react-native-animatable';

// function SpasssSc({navigation}) {
//   const getUser = async () => {
//     setTimeout(()=>{
//     navigation.navigate('SlapScreen2');
//     },2000)

//   };

//   useFocusEffect(
//     useCallback(() => {
//       getUser();
//     }, []),
//   );

//   return (
//     <>
//       <View style={styles.container}>
//         <Animatable.View animation="zoomInUp" style={styles.img}>
//           <Image
//             source={require('../../assets/images/Buygold.jpg')}
//             resizeMode="cover"
//             style={styles.image}
//           />
//         </Animatable.View>
//       </View>
//     </>
//   );
// }

// export default SpasssSc;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffff',
//   },
//   img: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   image: {
//     width: 290,
//     height: 150,
//   },
// });

//Kiran Changed Code


/* import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import * as Animatable from "react-native-animatable"

function SpasssSc({ navigation, setSplashCompleted }) {
  const [hasNavigated, setHasNavigated] = useState(false)

  const getUser = async () => {
    // Prevent multiple executions
    if (hasNavigated) return

    try {
      let user = await AsyncStorage.getItem("user")
      user = JSON.parse(user)

      setTimeout(() => {
        // Mark that we've handled navigation
        setHasNavigated(true)

        // If this is the initial app launch (setSplashCompleted exists)
        if (setSplashCompleted) {
          console.log("🎬 Initial splash completed, marking as done")
          setSplashCompleted(true)
          // Don't navigate here - let AppWrapper handle it
          return
        }

        // If this is a regular navigation (setSplashCompleted doesn't exist)
        // This happens when user manually navigates to splash screen
        console.log("🔄 Regular splash navigation")
        if (user) {
          navigation.replace("Home1")
        } else {
          navigation.replace("SignIn")
        }
      }, 2000)
    } catch (error) {
      console.error("Error in splash screen:", error)
      setHasNavigated(true)
      if (setSplashCompleted) {
        setSplashCompleted(true)
      } else {
        navigation.replace("SignIn")
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      // Reset navigation state when screen comes into focus
      setHasNavigated(false)
      getUser()
    }, []),
  )

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomInUp" style={styles.img}>
        <Image source={require("../../assets/images/Buygold.jpg")} resizeMode="cover" style={styles.image} />
      </Animatable.View>
    </View>
  )
}

export default SpasssSc

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  img: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 290,
    height: 150,
  },
})
 */


import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { View, StyleSheet, Image, StatusBar, Animated } from "react-native"
import * as Animatable from "react-native-animatable"

function SpasssSc({ navigation, setSplashCompleted }) {
  const [hasNavigated, setHasNavigated] = useState(false)
  const [fadeAnim] = useState(new Animated.Value(0))

  const getUser = async () => {
    if (hasNavigated) return

    try {
      let user = await AsyncStorage.getItem("user")
      user = JSON.parse(user)

      // Start fade animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()

      setTimeout(() => {
        setHasNavigated(true)
        
        if (setSplashCompleted) {
          console.log("🎬 Initial splash completed, marking as done")
          setSplashCompleted(true)
          return
        }

        console.log("🔄 Regular splash navigation")
        if (user) {
          navigation.replace("Home1")
        } else {
          navigation.replace("SignIn")
        }
      }, 2500)
    } catch (error) {
      console.error("Error in splash screen:", error)
      setHasNavigated(true)
      if (setSplashCompleted) {
        setSplashCompleted(true)
      } else {
        navigation.replace("SignIn")
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      setHasNavigated(false)
      // Reset animation
      fadeAnim.setValue(0)
      getUser()
    }, []),
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animatable.View 
          animation="zoomIn" 
          duration={1200}
          style={styles.logoContainer}
        >
          <Image 
            source={require("../../assets/images/Buygold.jpg")} 
            resizeMode="contain" 
            style={styles.logoImage} 
          />
        </Animatable.View>
      </Animated.View>
    </View>
  )
}

export default SpasssSc

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: '80%',
    maxWidth: 300,
  },
  logoImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 290/150,
    maxHeight: 180,
  },
})