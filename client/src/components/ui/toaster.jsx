import toast, { Toaster as ReactHotToaster } from 'react-hot-toast'

// Create a toaster API that matches the Chakra UI v3 pattern
export const toaster = {
  create: (options) => {
    const { title, description, type = 'info' } = options
    
    // Map Chakra UI types to react-hot-toast types
    const toastType = type === 'error' ? 'error' : 
                     type === 'success' ? 'success' : 
                     type === 'warning' ? 'error' : 'default'
    
    // Combine title and description into a single message
    const message = description 
      ? `${title}\n${description}`
      : title
    
    return toast[toastType](message, {
      duration: options.duration || 5000,
    })
  },
  success: (options) => toaster.create({ ...options, type: 'success' }),
  error: (options) => toaster.create({ ...options, type: 'error' }),
  warning: (options) => toaster.create({ ...options, type: 'warning' }),
  info: (options) => toaster.create({ ...options, type: 'info' }),
}

// Export the Toaster component from react-hot-toast
export const Toaster = ReactHotToaster

