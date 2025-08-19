import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const { width } = Dimensions.get("window")

const Toast = ({ visible, message, type = "info", duration = 3000, onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(-100))

  useEffect(() => {
    if (visible) {
      // Slide in and fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [visible])

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide && onHide()
    })
  }

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#4CAF50",
          borderLeftColor: "#2E7D32",
        }
      case "error":
        return {
          backgroundColor: "#F44336",
          borderLeftColor: "#C62828",
        }
      case "warning":
        return {
          backgroundColor: "#FF9800",
          borderLeftColor: "#E65100",
        }
      case "info":
      default:
        return {
          backgroundColor: "#874701",
          borderLeftColor: "#5D2F00",
        }
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Ionicons name="checkmark-circle" size={20} color="white" />
      case "error":
        return <Ionicons name="close-circle" size={20} color="white" />
      case "warning":
        return <Ionicons name="warning" size={20} color="white" />
      case "info":
      default:
        return <Ionicons name="information-circle" size={20} color="white" />
    }
  }

  if (!visible) return null

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={hideToast} style={[styles.toast, getToastStyle()]}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <Ionicons name="close" size={16} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
    elevation: 999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
})

export default Toast
