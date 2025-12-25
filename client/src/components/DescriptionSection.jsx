import { Box, Container, Text, Button } from '@chakra-ui/react'

const DescriptionSection = () => {
  return (
    <Box as="section" py={16} bg="gray.50">
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <Box maxW="900px" mx="auto" bg="white" p={{ base: 6, md: 10 }} px={{ base: 4, md: 10 }} borderRadius="xl" boxShadow="md">
          <Text fontSize="xl" mb={6} lineHeight="tall" color="gray.700">
            <Text as="i" fontWeight="bold" color="brandPurple" fontSize="2xl">Flekosteel</Text> can quickly eliminate pain from osteoarthritis and osteochondrosis. 
            Reduces muscle spasm and inflammation, and effective treatment for osteochondrosis and osteoarthritis 
            because it slows the cartilaginous tissue degeneration process, and improves metabolism to promote 
            regeneration of articular cartilage.
          </Text>
          <Text fontSize="lg" mb={8} lineHeight="tall" color="gray.600">
            The positive effect can be seen after the first application. When used regularly, diseases of joints 
            and backbone are stopped fast.
          </Text>
          <Box textAlign="center">
            <Button
              bg="brandPurple"
              color="white"
              size="lg"
              px={10}
              py={7}
              fontSize="lg"
              fontWeight="bold"
              borderRadius="full"
              boxShadow="xl"
              _hover={{ 
                bg: 'brandPurple', 
                transform: 'translateY(-2px)',
                boxShadow: '2xl'
              }}
              transition="all 0.2s"
            >
              Flekosteel only uses active components
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default DescriptionSection

