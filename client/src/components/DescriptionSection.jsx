import { Box, Container, Text, Button } from '@chakra-ui/react'

const DescriptionSection = () => {
  return (
    <Box as="section" py={{ base: 12, md: 20 }} bg="sectionCyan" position="relative" zIndex={3} mt={{ base: 0, md: -20 }} id="about">
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <Box maxW="900px" w="100%" mx="auto" bg="white" p={{ base: 6, md: 10 }} px={{ base: 4, md: 10 }} borderRadius="xl" boxShadow="md">
          <Text fontSize={{ base: 'lg', md: 'xl' }} mb={6} lineHeight="tall" color="gray.700">
            <Text as="i" fontWeight="bold" color="brandPurple" fontSize={{ base: 'xl', md: '2xl' }}>Goodsxyz</Text> can quickly eliminate pain from osteoarthritis and osteochondrosis. 
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
              Goodsxyz only uses active components
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default DescriptionSection

