import { useState, useEffect, useRef } from 'react'
import { Box, HStack, Text, Flex } from '@chakra-ui/react'

const CountdownTimer = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const totalSecondsRef = useRef(0)

  useEffect(() => {
    const getRandomHours = () => Math.floor(Math.random() * 24) + 1
    if (totalSecondsRef.current === 0) {
      totalSecondsRef.current = getRandomHours() * 3600
    }

    const updateTimer = () => {
      if (totalSecondsRef.current <= 0) {
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

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const TimeUnit = ({ value, label }) => (
    <VStack spacing={0}>
      <Box
        bg="brandOrange"
        color="white"
        w="50px"
        h="50px"
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
      >
        <Text fontSize="2xl" fontWeight="900" fontFamily="mono">
          {String(value).padStart(2, '0')}
        </Text>
      </Box>
      <Text fontSize="2xs" fontWeight="bold" color="fg.subtle" textTransform="uppercase">
        {label}
      </Text>
    </VStack>
  )

  return (
    <HStack spacing={6}>
      <Text fontSize="sm" fontWeight="bold" color="fg.muted" display={{ base: 'none', sm: 'block' }}>
        OFFER EXPIRES IN:
      </Text>
      <HStack spacing={3}>
        <TimeUnit value={hours} label="Hrs" />
        <Text fontSize="2xl" fontWeight="900" color="brandOrange">:</Text>
        <TimeUnit value={minutes} label="Min" />
        <Text fontSize="2xl" fontWeight="900" color="brandOrange">:</Text>
        <TimeUnit value={seconds} label="Sec" />
      </HStack>
    </HStack>
  )
}

import { VStack } from '@chakra-ui/react'
export default CountdownTimer

