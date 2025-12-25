import { Box, Container, Heading, Text, Image, VStack } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box as="header" bg="gray.50" py={12}>
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <VStack spacing={6} align="center" px={{ base: 4, md: 0 }}>
          <Box mb={4}>
            <Image src="/logo.png" alt="Logo" h="80px" />
          </Box>
          <Heading as="h4" size="2xl" mb={2} color="gray.800" textAlign="center">
            Painful joints or back?
          </Heading>
          <Text fontSize="xl" color="gray.700" textAlign="center" maxW="800px">
            Flekosteel is an effective product for osteochondrosis, osteoarthritis and injuries!
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Header

