import { Toaster as ChakraToaster, createToaster } from "@chakra-ui/react"

// Create toaster instance matching makini's pattern
export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
})

// Export the Toaster component
export const Toaster = () => {
  return <ChakraToaster toaster={toaster} />
}

