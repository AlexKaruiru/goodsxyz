import { Box, Container, Text, Button, Heading, VStack, Divider } from '@chakra-ui/react'

const DescriptionSection = () => {
  return (
    <Box as="section" py={{ base: 12, md: 20 }} bg="sectionCyan" position="relative" zIndex={3} mt={{ base: 0, md: -20 }} id="about">
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <Box maxW="900px" w="100%" mx="auto" bg="white" p={{ base: 6, md: 10 }} px={{ base: 4, md: 10 }} borderRadius="xl" boxShadow="md">
          {/* Main Description */}
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="brandPurple" mb={6}>
            WORMWOOD
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} mb={6} lineHeight="tall" color="gray.700">
            Wormwood is a multifunctional natural cream for people with osteoarthritis, arthritis or bone deterioration that makes movement difficult. Wormwood reduces inflammation, strengthens joints and prevents the problem from getting worse.
          </Text>

          {/* Benefits */}
          <Box mb={8}>
            <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="gray.800" mb={4}>
              Benefits
            </Heading>
            <VStack align="stretch" spacing={3}>
              <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                <Text as="span" fontWeight="bold" color="brandOrange">1. Say goodbye to pain!</Text> - Relieves discomfort in joints and muscles so you can enjoy everyday without aches and stiffness.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                <Text as="span" fontWeight="bold" color="brandOrange">2. Get your mobility back</Text> - Forget about stiffness and move freely with ease and comfort.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                <Text as="span" fontWeight="bold" color="brandOrange">3. Advanced formula with premium ingredients</Text> - Shark liver oil, vitamin D3, collagen, saffron, solitary living, absinthin, resins, log and, flavonoids, phenolic acids and photochemicals.
              </Text>
            </VStack>
          </Box>

          <Divider my={8} borderColor="gray.300" />

          {/* How Wormwood Works */}
          <Box mb={8}>
            <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="gray.800" mb={4} textTransform="uppercase">
              How Wormwood Works
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} mb={6} lineHeight="tall" color="gray.700">
              The effectiveness of wormwood comes from the synergy between its active ingredients. Each component serves a specific function and together they address multiple aspects of joint health simultaneously.
            </Text>

            <VStack align="stretch" spacing={6}>
              {/* Cartilage Regeneration */}
              <Box>
                <Heading as="h4" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="brandPurple" mb={3}>
                  Cartilage Regeneration and Joint Strengthening
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                  Shark liver oil acts as fundamental structural materials for cartilage repair. It allows efficient absorption, which promotes the recovery of elasticity, mechanical resistance and reduction of joint friction.
                </Text>
              </Box>

              {/* Reduction of Inflammation */}
              <Box>
                <Heading as="h4" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="brandPurple" mb={3}>
                  Reduction of Inflammation and Pain
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                  Flavonoids and phenolic acids possess anti-inflammatory properties that help reduce stiffness and joint pain. It also promotes local micro circulation and contributes to the functional mobility of the joint.
                </Text>
              </Box>

              {/* Lubrication */}
              <Box>
                <Heading as="h4" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="brandPurple" mb={3}>
                  Lubrication and Protection Against Wear
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                  Wormwood stimulates the production of synovial fluid which functions as a natural lubricant, reducing cartilage wear and extending the useful life of joints under conditions of mechanical load.
                </Text>
              </Box>

              {/* Bone Strengthening */}
              <Box>
                <Heading as="h4" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="brandPurple" mb={3}>
                  Bone Strengthening and Injury Prevention
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.700">
                  The combination of collagen type II and vitamin D3 contributes to collagen synthesis, improves bone mineral density and prevents degenerative processes such as osteoporosis. In this way the joint support structure is reinforced.
                </Text>
              </Box>
            </VStack>
          </Box>

          <Box textAlign="center" mt={8}>
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
              Wormwood only uses active components
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default DescriptionSection

