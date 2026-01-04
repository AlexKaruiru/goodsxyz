import { useState, useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'

const CountdownTimer = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const totalSecondsRef = useRef(0)

  useEffect(() => {
    // Initialize with a random number of hours (1-24)
    const getRandomHours = () => Math.floor(Math.random() * 24) + 1
    
    // Initialize total seconds
    if (totalSecondsRef.current === 0) {
      totalSecondsRef.current = getRandomHours() * 3600
    }

    const updateTimer = () => {
      if (totalSecondsRef.current <= 0) {
        // Reset to a new random countdown when it reaches 0
        totalSecondsRef.current = getRandomHours() * 3600
      }

      const h = Math.floor(totalSecondsRef.current / 3600)
      const m = Math.floor((totalSecondsRef.current % 3600) / 60)
      const s = totalSecondsRef.current % 60

      setHours(h)
      setMinutes(m)
      setSeconds(s)
      totalSecondsRef.current--
    }

    // Update immediately
    updateTimer()

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (value) => String(value).padStart(2, '0')

  return (
    <Box
      bg="brandOrange"
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      display="inline-flex"
      alignItems="center"
      gap={2}
      boxShadow="md"
    >
      <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
        Offer expires in:
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" fontFamily="mono">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Text>
    </Box>
  )
}

export default CountdownTimer

