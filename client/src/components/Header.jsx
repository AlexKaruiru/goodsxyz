import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <Box as="header" bg="sectionTeal" py={{ base: 8, md: 20 }} pt={{ base: 8, md: 24 }} position="relative" zIndex={1} id="home">
      <MobileNav />
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <VStack spacing={6} align="center" px={{ base: 4, md: 0 }}>
          <Heading as="h4" size="2xl" mb="2" color="gray.800" textAlign="center">
            Painful joints or back?
          </Heading>
          <Text fontSize="xl" color="gray.700" textAlign="center" maxW="800px">
            Goodsxyz is an effective product for osteochondrosis, osteoarthritis and injuries!
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Header

