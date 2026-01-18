import { Box, Container, Heading, Text, VStack, Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import MobileNav from './MobileNav'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

const Header = () => {
  return (
    <Box
      as="header"
      bg="bg"
      position="relative"
      zIndex={1}
      id="home"
      overflow="hidden"
    >
      <MobileNav />

      {/* Background Decorative Elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="40%"
        h="60%"
        bgGradient="radial(brandOrange/20, transparent)"
        filter="blur(60px)"
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-5%"
        w="30%"
        h="50%"
        bgGradient="radial(brandBlue/20, transparent)"
        filter="blur(60px)"
        borderRadius="full"
        zIndex={0}
      />

      <Container maxW="1200px" px={{ base: 6, md: 6 }} pt={{ base: 20, md: 32 }} pb={{ base: 10, md: 12 }} mx="auto">
        <Flex direction="column" align="center" justify="center" gap={12} textAlign="center">
          <VStack spacing={8} align="center" flex="1" zIndex={1}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Text
                fontSize="sm"
                fontWeight="extrabold"
                color="brandOrange"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                Premium Wellness Solutions
              </Text>
            </MotionBox>

            <MotionHeading
              as="h1"
              size={{ base: "4xl", md: "6xl" }}
              fontWeight="900"
              lineHeight="1.1"
              color="fg"
              textAlign="center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Painful  <Text as="span" color="brandOrange">Joints</Text> or Back?
            </MotionHeading>

            <MotionText
              fontSize={{ base: "lg", md: "xl" }}
              color="fg.muted"
              textAlign="center"
              maxW="800px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              SupleeHub provides effective products for osteochondrosis, osteoarthritis and injuries. Experience fast relief and start your recovery process today.
            </MotionText>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="xl"
                bg="brandOrange"
                color="white"
                px={10}
                borderRadius="full"
                fontSize="lg"
                fontWeight="bold"
                boxShadow="0 10px 20px rgba(255, 107, 53, 0.3)"
                _hover={{
                  bg: 'brandOrange',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 30px rgba(255, 107, 53, 0.4)'
                }}
                onClick={() => {
                  const element = document.querySelector('#products')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Explore Products
              </Button>
            </MotionBox>
          </VStack>

          {/* Optional: Add an image or graphic element here */}
          <Box flex="0.8" display={{ base: 'none', md: 'block' }} position="relative">
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              position="relative"
              zIndex={1}
            >
              <Box
                w="100%"
                h="400px"
                bgGradient="linear(to-br, brandOrange, brandBlue)"
                borderRadius="40% 60% 70% 30% / 40% 50% 60% 70%"
                animation="morph 10s ease-in-out infinite"
                opacity="0.3"
                filter="blur(20px)"
              />
            </MotionBox>
          </Box>
        </Flex>
      </Container>

      <style>{`
        @keyframes morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 70%; }
          50% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 70%; }
        }
      `}</style>
    </Box>
  )
}

export default Header

