import { Box, Container, Text, Link, HStack, VStack } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" bg="sectionBeige" py={10} position="relative" zIndex={7} mt={{ base: 0, md: 0 }}>
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <VStack spacing={4} px={{ base: 4, md: 0 }}>
          <Text fontSize="sm" color="brandGray">
            &copy; {new Date().getFullYear()} Copyright. All rights reserved.
          </Text>
          <HStack spacing={2} fontSize="sm" color="brandGray">
            <Link href="#" _hover={{ textDecoration: 'underline' }}>
              Terms & Conditions
            </Link>
            <Text>|</Text>
            <Link href="#" _hover={{ textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            <Text>|</Text>
            <Link href="#" _hover={{ textDecoration: 'underline' }}>
              Feedback
            </Link>
          </HStack>
          <Text fontSize="xs" color="brandGray" textAlign="center" maxW="800px" mt={4}>
            By clicking the «order» button you confirm that you have read{' '}
            <Link href="#" _hover={{ textDecoration: 'underline' }}>
              Privacy Policy
            </Link>{' '}
            and give your consent to the procession of your personal data.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer

