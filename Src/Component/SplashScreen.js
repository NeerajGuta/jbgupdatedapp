import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState, useRef } from "react"
import { 
  View, 
  StyleSheet, 
  Image, 
  StatusBar, 
  Animated, 
  Dimensions,
  Easing
} from "react-native"
import * as Animatable from "react-native-animatable"
import LinearGradient from "react-native-linear-gradient"

const { width, height } = Dimensions.get("window")

function SpasssSc({ navigation, setSplashCompleted }) {
  const [hasNavigated, setHasNavigated] = useState(false)
  const [fadeAnim] = useState(new Animated.Value(0))
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const getUser = async () => {
    if (hasNavigated) return

    try {
      let user = await AsyncStorage.getItem("user")
      user = JSON.parse(user)

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ]).start()

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
      }, 3000)
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
      // Reset animations
      fadeAnim.setValue(0)
      scaleAnim.setValue(0.8)
      rotateAnim.setValue(0)
      getUser()
    }, []),
  )

  // Rotate interpolation for continuous rotation
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#a55a02" />
      
      {/* Gold gradient background */}
      <LinearGradient
        colors={['#f3d25b', '#e6c34a', '#d4af37']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated decorative elements */}
        <Animated.View style={[styles.circle, styles.circle1, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.circle, styles.circle2, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.circle, styles.circle3, { opacity: fadeAnim }]} />
        
        <View style={styles.content}>
          <Animated.View style={[
            styles.logoContainer, 
            { 
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { rotate: rotateInterpolate }
              ] 
            }
          ]}>
            <Image 
              source={require("../../assets/images/Buygold.jpg")} 
              resizeMode="contain" 
              style={styles.logoImage} 
            />
          </Animated.View>
          
          <Animatable.Text 
            animation="fadeInUp" 
            delay={800}
            style={styles.tagline}
          >
            Your Trusted Gold Partner
          </Animatable.Text>
          
          <Animatable.View 
            animation="fadeIn" 
            delay={1500}
            style={styles.loadingContainer}
          >
            <View style={styles.loadingDots}>
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                delay={0}
                style={[styles.dot, styles.dot1]}
              />
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                delay={300}
                style={[styles.dot, styles.dot2]}
              />
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                delay={600}
                style={[styles.dot, styles.dot3]}
              />
            </View>
          </Animatable.View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default SpasssSc

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    maxWidth: 300,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 290/150,
    maxHeight: 180,
    borderRadius: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#874701',
    fontWeight: '600',
    marginTop: 20,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainer: {
    marginTop: 40,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#874701',
  },
  dot1: {
    opacity: 0.6,
  },
  dot2: {
    opacity: 0.8,
  },
  dot3: {
    opacity: 1,
  },
  // Decorative circles
  circle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: height * 0.2,
    left: -40,
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.6,
    left: width * 0.7,
  },
})


/* https://justbuygold.co.in */