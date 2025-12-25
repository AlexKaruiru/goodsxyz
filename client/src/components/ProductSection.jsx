import { Box, Container, Flex, VStack, Text, Button, Badge } from '@chakra-ui/react'

const ProductSection = () => {
  const benefits = [
    'Relieves pain',
    'Stimulates cartilage regeneration',
    'Alleviates muscle hypertension',
    'Lessens swelling',
    'Eliminates inflammations'
  ]

  return (
    <Box as="section" py={16} bg="white">
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" gap={10} px={{ base: 4, md: 0 }}>
          {/* Product Image Area */}
          <Box position="relative" flex="1" display="flex" justify="center" align="center">
            <Box position="relative" w="300px" h="300px" bg="gray.100" borderRadius="lg" display="flex" align="center" justify="center">
              <Text color="gray.400">Product Image</Text>
              <Badge
                position="absolute"
                top="-10px"
                right="-10px"
                bg="brandOrange"
                color="white"
                px={6}
                py={3}
                fontSize="xl"
                fontWeight="bold"
                borderRadius="full"
                boxShadow="lg"
                transform="rotate(15deg)"
              >
                DISCOUNT <Text as="span" fontSize="2xl">50%</Text>
              </Badge>
            </Box>
          </Box>

          {/* Content Area */}
          <Box flex="1" maxW="500px">
            <VStack spacing={6} align="stretch">

              <VStack spacing={3} fontSize="lg" align="stretch">
                {benefits.map((benefit, index) => (
                  <Flex key={index} align="center" p={2} borderRadius="md" _hover={{ bg: 'gray.50' }}>
                    <Text as="span" mr={3} fontSize="xl" color="brandOrange">✓</Text>
                    <Text fontSize="lg">{benefit}</Text>
                  </Flex>
                ))}
              </VStack>

              <Box textAlign="center" py={4} bg="gray.50" borderRadius="lg" px={4}>
                <Text fontSize="sm" color="gray.600" mb={3}>
                  Advertising Spot <Text as="span" fontWeight="bold" color="brandOrange">DISCOUNT PRICE</Text>
                </Text>
                <Flex align="center" justify="center" gap={4}>
                  <Text fontSize="4xl" fontWeight="bold" color="brandOrange">
                    6500 KSh
                  </Text>
                  <Text fontSize="xl" color="gray.400" textDecoration="line-through">
                    13000 KSh
                  </Text>
                </Flex>
              </Box>

              <Button
                bg="brandOrange"
                color="white"
                size="lg"
                px={10}
                py={7}
                fontSize="xl"
                fontWeight="bold"
                borderRadius="full"
                boxShadow="xl"
                _hover={{ 
                  bg: 'brandOrange', 
                  transform: 'translateY(-2px)',
                  boxShadow: '2xl'
                }}
                transition="all 0.2s"
              >
                ORDER NOW
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default ProductSection

