import { useState } from 'react'
import { Box, Container, Heading, SimpleGrid, VStack, Text, Input, Button, Flex, Badge, Spacer } from '@chakra-ui/react'

const OrderSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Box as="section" py={16} bg="white">
      <Container maxW="1200px" px={{ base: 0, md: 6 }}>
        <VStack spacing={8} px={{ base: 4, md: 0 }}>
          <Box textAlign="center" mb={4}>
            <Badge bg="red.500" color="white" px={6} py={3} fontSize="lg" mb={6} borderRadius="full" boxShadow="md">
              BEWARE OF RISKY IMITATIONS!
            </Badge>
            <Heading size="xl" mb={10} color="gray.800">
              How to order Flekosteel for your backbone and joints
            </Heading>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12} w="100%">
            <VStack spacing={4}>
              <Box 
                w="80px" 
                h="80px" 
                bg="brandBlue" 
                borderRadius="full" 
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="lg"
              >
                <Text fontSize="2xl" color="white" fontWeight="bold">1</Text>
              </Box>
              <Text fontWeight="bold" textAlign="center" fontSize="lg">
                Complete order form
              </Text>
            </VStack>
            <VStack spacing={4}>
              <Box 
                w="80px" 
                h="80px" 
                bg="brandBlue" 
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="lg"
              >
                <Text fontSize="2xl" color="white" fontWeight="bold">2</Text>
              </Box>
              <Text fontWeight="bold" textAlign="center" fontSize="lg">
                Choose shipping method
              </Text>
            </VStack>
            <VStack spacing={4}>
              <Box 
                w="80px" 
                h="80px" 
                bg="brandBlue" 
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="lg"
              >
                <Text fontSize="2xl" color="white" fontWeight="bold">3</Text>
              </Box>
              <Text fontWeight="bold" textAlign="center" fontSize="lg">
                Pay for product upon receipt
              </Text>
            </VStack>
          </SimpleGrid>

          <Flex direction={{ base: 'column', lg: 'row' }} gap={8} w="100%" maxW="1000px">
            {/* Product Image Area */}
            <Box flex="1" display={{ base: 'none', lg: 'flex' }} alignItems="center" justifyContent="center">
              <Box w="300px" h="300px" bg="gray.100" borderRadius="xl" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.400">Product Image</Text>
              </Box>
            </Box>

            {/* Form Area */}
            <Box flex="1" bg="gray.50" p={10} borderRadius="xl" boxShadow="lg">
            <VStack spacing={4} mb={6}>
              <Badge bg="brandOrange" color="white" px={4} py={2} fontSize="lg">
                DISCOUNT <Text as="span" fontSize="xl">50%</Text>
              </Badge>
              <Text fontSize="sm" color="gray.600" mb={2}>
                LIMITED OFFER WITH DISCOUNT
              </Text>
              <Flex align="center" justify="center" gap={4}>
                <Text fontSize="3xl" fontWeight="bold" color="brandOrange">
                  6500 KSh
                </Text>
                <Text fontSize="xl" color="gray.400" textDecoration="line-through">
                  13000 KSh
                </Text>
              </Flex>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>NAME</Text>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    bg="white"
                  />
                </Box>

                <Spacer h={3} />

                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>PHONE NUMBER</Text>
                  <Flex gap={2}>
                    <Input
                      value="+254"
                      disabled
                      w="80px"
                      bg="gray.200"
                    />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone No"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      bg="white"
                      flex={1}
                    />
                  </Flex>
                </Box>

                <Spacer h={3} />

                <Button
                  type="submit"
                  bg="brandOrange"
                  color="white"
                  size="lg"
                  w="100%"
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
                  ORDER
                </Button>
              </VStack>
            </form>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default OrderSection

