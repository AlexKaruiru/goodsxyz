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
    }
  ]

  return (
    <Box as="section" py={16} bg="gray.50">
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <Heading size="xl" textAlign="center" mb={12} color="gray.800">
          Advantages of Flekosteel for back and joints
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} px={{ base: 4, md: 0 }}>
          {advantages.map((advantage, index) => (
            <Box
              key={index}
              p={8}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              textAlign="center"
              _hover={{ 
                transform: 'translateY(-5px)',
                boxShadow: '2xl'
              }}
              transition="all 0.3s"
            >
              <VStack spacing={4}>
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
                >
                  <Text fontSize="3xl" color="white">✓</Text>
                </Box>
                <Heading size="md" fontWeight="bold" color="gray.800">
                  {advantage.title}
                </Heading>
                <Text fontSize="md" color="gray.600" lineHeight="tall">
                  {advantage.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default AdvantagesSection

