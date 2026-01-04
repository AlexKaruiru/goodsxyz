import { Toaster as ChakraToaster, createToaster } from "@chakra-ui/react"

// Create toaster instance matching makini's pattern
export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
})

// Helper function to create toast with proper structure for Chakra UI v3
// Chakra UI v3 toaster.create expects a render function that returns JSX
export const createToast = (options) => {
  const { title, description, type = 'info', duration = 5000 } = options
  
  // Map type to Chakra UI status
  const statusMap = {
    'success': 'success',
    'error': 'error',
    'warning': 'warning',
    'info': 'info'
  }
  
  const status = statusMap[type] || 'info'
  
  // Chakra UI v3 toaster.create API - returns a render function
  return toaster.create({
    title: title,
    description: description,
    status: status,
    duration: duration,
  })
}

// Export the Toaster component
export const Toaster = () => {
  return <ChakraToaster toaster={toaster} />
}

