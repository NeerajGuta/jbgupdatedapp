import { useState } from "react"

const useToast = () => {
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    message: "",
    type: "info",
    duration: 3000,
  })

  const showToast = (message, type = "info", duration = 3000) => {
    setToastConfig({
      visible: true,
      message,
      type,
      duration,
    })
  }

  const hideToast = () => {
    setToastConfig((prev) => ({
      ...prev,
      visible: false,
    }))
  }

  const showSuccess = (message, duration = 3000) => {
    showToast(message, "success", duration)
  }

  const showError = (message, duration = 4000) => {
    showToast(message, "error", duration)
  }

  const showWarning = (message, duration = 3500) => {
    showToast(message, "warning", duration)
  }

  const showInfo = (message, duration = 3000) => {
    showToast(message, "info", duration)
  }

  return {
    toastConfig,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}

export default useToast
