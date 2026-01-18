import { Box, Container, Text, Link, HStack, VStack, Separator } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" bg="bg" py={12} borderTop="1px solid" borderColor="bg.muted">
      <Container maxW="1200px" px={6} mx="auto">
        <VStack spacing={8} align="center">
          <VStack spacing={4} align="center">
            <Box fontWeight="900" fontSize="2xl" color="brandOrange">
              SupleeHub
            </Box>
            <Text fontSize="sm" color="fg.muted" textAlign="center" maxW="600px">
              Your trusted partner for premium natural wellness solutions. Dedicated to improving your quality of life through science-backed nutrition.
            </Text>
          </VStack>

          <HStack spacing={6} fontSize="sm" color="fg.muted" flexWrap="wrap" justify="center">
            <Link href="#" _hover={{ color: 'brandOrange' }}>Terms & Conditions</Link>
            <Link href="#" _hover={{ color: 'brandOrange' }}>Privacy Policy</Link>
            <Link href="#" _hover={{ color: 'brandOrange' }}>Cookie Policy</Link>
            <Link href="#" _hover={{ color: 'brandOrange' }}>About Us</Link>
          </HStack>

          <VStack spacing={4} w="100%">
            <Box w="100%" h="1px" bg="bg.muted" />
            <Text fontSize="xs" color="fg.subtle" textAlign="center" maxW="800px">
              &copy; {new Date().getFullYear()} SupleeHub. All rights reserved.
              By interacting with this site, you agree to our terms of service.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer

