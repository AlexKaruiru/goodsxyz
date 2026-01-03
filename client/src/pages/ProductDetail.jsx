import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Flex, VStack, HStack, Text, Button, Badge, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import product1Image from '../images/product1.webp'
import product2Image from '../images/product2.webp'
import product3Image from '../images/product3.webp'
import product4Image from '../images/product4.webp'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import MultiStepOrder from '../components/MultiStepOrder'
import { getProductById } from '../utils/productsService'
import { toaster } from '../components/ui/toaster'

const ProductDetail = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const products = {
    'product-a': {
      id: 'product-a',
      name: 'Product A',
      image: product1Image,
      price: 6500,
      originalPrice: 13000,
      description: 'Product A is an effective solution for osteochondrosis, osteoarthritis and injuries. It quickly eliminates pain, reduces muscle spasm and inflammation, and promotes regeneration of articular cartilage.',
      benefits: [
        'Relieves pain',
        'Stimulates cartilage regeneration',
        'Alleviates muscle hypertension',
        'Lessens swelling',
        'Eliminates inflammations',
        'Improves joint mobility',
        'Reduces stiffness',
        'Promotes healing'
      ],
      ingredients: [
        'Natural herbal extracts',
        'Anti-inflammatory compounds',
        'Cartilage-supporting nutrients',
        'Pain-relieving agents'
      ]
    },
    'product-b': {
      id: 'product-b',
      name: 'Product B',
      image: product2Image,
      price: 6500,
      originalPrice: 13000,
      description: 'Product B provides comprehensive relief for joint and back pain. Its unique formula targets the root causes of discomfort while supporting long-term joint health.',
      benefits: [
        'Relieves pain',
        'Stimulates cartilage regeneration',
        'Alleviates muscle hypertension',
        'Lessens swelling',
        'Eliminates inflammations',
        'Enhances flexibility',
        'Strengthens joints',
        'Prevents further damage'
      ],
      ingredients: [
        'Natural herbal extracts',
        'Anti-inflammatory compounds',
        'Cartilage-supporting nutrients',
        'Pain-relieving agents'
      ]
    }
  }

  const product = products[productId] || products['product-a']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitOrder({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        address: formData.address || '',
        productId: product.id,
        productName: product.name,
        price: product.price
      })

      toaster.create({
        title: 'Order submitted successfully!',
        description: 'We will contact you shortly.',
        type: 'success',
      })

      // Reset form
      setFormData({
        name: '',
        phone: ''
      })
    } catch (error) {
      toaster.create({
        title: 'Error submitting order',
        description: error.message || 'Please try again later.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Box minH="100vh" bg="white" w="100%" maxW="100vw" overflowX="hidden">
      <TopNav />
      <Box pt={{ base: 0, md: '80px' }}>
        <Box as="section" py={{ base: 8, md: 16 }} bg="sectionTeal">
        <Container maxW="1200px" px={{ base: 4, md: 6 }} mx="auto">
          <Button
            mb={6}
            onClick={() => navigate('/')}
            variant="ghost"
            _hover={{ bg: 'gray.100' }}
          >
            ← Back to Products
          </Button>

          <Flex direction={{ base: 'column', lg: 'row' }} gap={8} align="flex-start">
            {/* Product Image */}
            <Box flex="1" maxW={{ base: "100%", lg: "500px" }}>
              <Box position="relative" w="100%" borderRadius="xl" overflow="hidden" bg="gray.100">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  w="100%"
                  h="auto"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={4}
                  right={4}
                  bg="brandOrange"
                  color="white"
                  px={6}
                  py={3}
                  fontSize="lg"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="xl"
                  transform="rotate(15deg)"
                >
                  DISCOUNT <Text as="span" fontSize="xl">50%</Text>
                </Badge>
              </Box>
            </Box>

            {/* Product Info */}
            <Box flex="1" maxW={{ base: "100%", lg: "600px" }}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="2xl" mb={4} color="gray.800">
                    {product.name}
                  </Heading>
                  <Text fontSize="lg" color="gray.700" lineHeight="tall" mb={6}>
                    {product.description}
                  </Text>
                </Box>

                {/* Pricing */}
                <Box bg="gray.50" p={6} borderRadius="xl">
                  <Text fontSize="sm" color="gray.600" mb={3}>
                    Advertising Spot <Text as="span" fontWeight="bold" color="brandOrange">DISCOUNT PRICE</Text>
                  </Text>
                  <Flex align="center" gap={4}>
                    <Text fontSize="4xl" fontWeight="bold" color="brandOrange">
                      {product.price.toLocaleString()} KSh
                    </Text>
                    <Text fontSize="xl" color="gray.400" textDecoration="line-through">
                      {product.originalPrice.toLocaleString()} KSh
                    </Text>
                  </Flex>
                </Box>

                {/* Benefits */}
                <Box>
                  <Heading size="md" mb={4} color="gray.800">
                    Benefits
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {product.benefits.map((benefit, index) => (
                      <Flex key={index} align="center" p={2}>
                        <Text as="span" mr={3} fontSize="lg" color="brandOrange">✓</Text>
                        <Text fontSize="md">{benefit}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Multi-Step Order Form */}
                <Box bg="gray.50" p={6} borderRadius="xl">
                  <Heading size="md" mb={6} color="gray.800">
                    Order Now
                  </Heading>
                  <MultiStepOrder product={product} />
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Container>
        </Box>

        <Footer />
      </Box>
    </Box>
  )
}

export default ProductDetail

