import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Flex, VStack, HStack, Text, Button, Badge, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import wormwoodImage from '../images/wormwood.jpg'
import biotinImage from '../images/biotin.jpg'
import TopNav from '../components/TopNav'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import QuickOrderModal from '../components/QuickOrderModal'
import { getProductByName } from '../utils/productsService'
import { toaster } from '../components/ui/toaster'

// Map product image names to actual imports
const imageMap = {
  'wormwood.jpg': wormwoodImage,
  'biotin.jpg': biotinImage,
  'product1.webp': wormwoodImage, // fallback
  'product2.webp': biotinImage // fallback
}

const advantagesData = [
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

const ProductDetail = () => {
  const { productName } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductByName(productName)
        if (fetchedProduct) {
          // Map image path to actual import
          if (fetchedProduct.image && imageMap[fetchedProduct.image]) {
            fetchedProduct.image = imageMap[fetchedProduct.image]
          }
          setProduct(fetchedProduct)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productName])

  if (loading) {
    return (
      <Box minH="100vh" bg="white" w="100%" maxW="100vw" overflowX="hidden">
        <TopNav />
        <MobileNav />
        <Box pt={{ base: 0, md: '80px' }}>
          <Container maxW="1200px" px={{ base: 4, md: 6 }} mx="auto" py={10}>
            <Text>Loading product details...</Text>
          </Container>
        </Box>
        <Footer />
      </Box>
    )
  }

  if (error || !product) {
    return (
      <Box minH="100vh" bg="white" w="100%" maxW="100vw" overflowX="hidden">
        <TopNav />
        <MobileNav />
        <Box pt={{ base: 0, md: '80px' }}>
          <Container maxW="1200px" px={{ base: 4, md: 6 }} mx="auto" py={10}>
            <Text color="red.500">{error || 'Product not found'}</Text>
            <Button mt={4} onClick={() => navigate('/')}>
              Back 
            </Button>
          </Container>
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="white" w="100%" maxW="100vw" overflowX="hidden">
      <TopNav />
      <MobileNav />
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
                  <Heading size="2xl" mb="4" color="gray.800">
                    {product.name}
                  </Heading>
                  <Text fontSize="lg" color="gray.700" lineHeight="tall" mb="6">
                    {product.description}
                  </Text>
                </Box>

                {/* Pricing */}
                <Box bg="gray.50" p={6} borderRadius="xl">
                  <Text fontSize="sm" color="gray.600" mb="3">
                    Advertising Spot <Text as="span" fontWeight="bold" color="brandOrange">DISCOUNT PRICE</Text>
                  </Text>
                  <Flex align="center" gap={4}>
                    <Text fontSize="4xl" fontWeight="bold" color="brandOrange">
                      {product.price.toLocaleString()} KES
                    </Text>
                    <Text fontSize="xl" color="gray.400" textDecoration="line-through">
                      {product.originalPrice.toLocaleString()} KES
                    </Text>
                  </Flex>
                </Box>

                {/* Benefits */}
                <Box>
                  <Heading size="md" mb="4" color="gray.800">
                    Benefits
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {product.benefits.map((benefit, index) => (
                      <Flex key={index} align="center" p="2">
                        <Text as="span" mr="3" fontSize="lg" color="brandOrange">✓</Text>
                        <Text fontSize="md">{benefit}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Order Button */}
                <Box bg="gray.50" p={{ base: 6, md: 8 }} borderRadius="xl">
                  <Heading size="md" mb="6" color="gray.800">
                    Order Now
                  </Heading>
                  <Button
                    bg="brandOrange"
                    color="white"
                    size="lg"
                    w="100%"
                    py={7}
                    fontSize="xl"
                    fontWeight="bold"
                    borderRadius="full"
                    boxShadow="xl"
                    onClick={() => setIsOrderModalOpen(true)}
                    _hover={{ 
                      bg: 'brandOrange', 
                      transform: 'translateY(-2px)',
                      boxShadow: '2xl'
                    }}
                    transition="all 0.2s"
                  >
                    ORDER NOW
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Container>
        </Box>

        {/* Advantages Section */}
        <Box as="section" py={{ base: 12, md: 16 }} bg="sectionYellowGreen">
          <Container maxW="1200px" px={{ base: 4, md: 6 }} mx="auto">
            <Heading 
              size="xl" 
              textAlign="center" 
              mb={{ base: 8, md: 12 }} 
              color="gray.800"
              fontSize={{ base: "2xl", md: "3xl" }}
            >
              Advantages of SupleeHub for back and joints
            </Heading>
            <Box as="ul" listStyleType="none" p={0} m={0} maxW="900px" mx="auto">
              <VStack spacing={0} align="stretch" divider={<Box borderColor="gray.200" />}>
                {advantagesData.map((advantage, index) => (
                  <Box
                    key={index}
                    as="li"
                    py={{ base: 6, md: 8 }}
                    px={{ base: 4, md: 6 }}
                    _hover={{ bg: 'rgba(255, 255, 255, 0.5)' }}
                    transition="background 0.2s"
                  >
                    <Flex 
                      direction={{ base: 'column', md: 'row' }} 
                      align={{ base: 'flex-start', md: 'center' }}
                      gap={{ base: 3, md: 6 }}
                    >
                      {/* Icon */}
                      <Box
                        w={{ base: "50px", md: "60px" }}
                        h={{ base: "50px", md: "60px" }}
                        bg="brandBlue"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Text fontSize={{ base: "lg", md: "xl" }} color="white" fontWeight="bold">⚡</Text>
                      </Box>
                      
                      {/* Content */}
                      <Box flex="1">
                        <Heading 
                          size="sm" 
                          fontWeight="bold" 
                          color="gray.800"
                          fontSize={{ base: "md", md: "lg" }}
                          mb={2}
                        >
                          {advantage.title}
                        </Heading>
                        <Text 
                          fontSize={{ base: "sm", md: "md" }} 
                          color="gray.600" 
                          lineHeight="tall"
                        >
                          {advantage.description}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          </Container>
        </Box>

        <Footer />
      </Box>
      
      <QuickOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        product={product}
      />
    </Box>
  )
}

export default ProductDetail

