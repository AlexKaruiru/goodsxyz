import { Box, Container, Heading, SimpleGrid, VStack, Text } from '@chakra-ui/react'

const AdvantagesSection = () => {
  const advantages = [
    {
      title: "NUMEROUS EFFECTS",
      description: "Fixes ailments of traumatic and age-related joints and spine."
    },
    {
      title: "PERFECTLY SAFE - NO SIDE-EFFECTS",
      description: "Completely safe for one-time or regular usage"
    },
    {
      title: "100% NATURAL COMPOSITION",
      description: "Only herbal active components"
    },
    {
      title: "HIGH EFFICIENCY",
      description: "improves the general condition and reduces pain after first application"
    },
    {
      title: "TESTED BY EXPERTS",
      description: "Certified and meets high standards*"
    },
    {
      title: "FAST ACTING",
      description: "Provides quick relief and visible results within days of use"
    }
  ]

  return (
    <Box as="section" py={{ base: 12, md: 20 }} bg="sectionYellowGreen" position="relative" zIndex={5} mt={{ base: 0, md: -15 }}>
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <Heading size="xl" textAlign="center" mb={12} color="gray.800">
          Advantages of Goodsxyz for back and joints
        </Heading>
        <Box w="100%" display="flex" justifyContent="center" px={{ base: 4, md: 6, lg: 8 }}>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={{ base: 10, md: 16, lg: 24 }} 
            w="100%"
            maxW="1200px"
          >
          {advantages.map((advantage, index) => (
            <Box
              key={index}
              p={{ base: 6, md: 8, lg: 10 }}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              textAlign="center"
              _hover={{ 
                transform: 'translateY(-5px)',
                boxShadow: '2xl'
              }}
              transition="all 0.3s"
              minH={{ base: 'auto', md: '320px' }}
            >
              <VStack spacing={5}>
                <Box
                  w="80px"
                  h="80px"
                  bg="brandBlue"
                  borderRadius="full"
                  mx="auto"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="md"
                  mb={2}
                >
                  <Text fontSize="3xl" color="white">✓</Text>
                </Box>
                <Heading size="md" fontWeight="bold" color="gray.800" px={2}>
                  {advantage.title}
                </Heading>
                <Text fontSize="md" color="gray.600" lineHeight="tall" px={2}>
                  {advantage.description}
                </Text>
              </VStack>
            </Box>
          ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}

export default AdvantagesSection

