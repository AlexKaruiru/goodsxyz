import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Flex, VStack, HStack, Stack, Text, Button, Badge, Heading, Image, SimpleGrid, Icon, Center } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { TbArrowLeft, TbCheck } from 'react-icons/tb'
import wormwoodImage from '../images/wormwood.jpg'
import biotinImage from '../images/biotin.jpg'
import TopNav from '../components/TopNav'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import QuickOrderModal from '../components/QuickOrderModal'
import AdvantagesSection from '../components/AdvantagesSection'
import { getProductByName } from '../utils/productsService'

const MotionBox = motion.create(Box)
const MotionImage = motion.create(Image)

const imageMap = {
  'wormwood.jpg': wormwoodImage,
  'biotin.jpg': biotinImage,
  'product1.webp': wormwoodImage,
  'product2.webp': biotinImage
}

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
      <Box minH="100vh" bg="bg">
        <TopNav />
        <Center h="calc(100vh - 80px)">
          <Text color="fg.muted">Loading product details...</Text>
        </Center>
      </Box>
    )
  }

  if (error || !product) {
    return (
      <Box minH="100vh" bg="bg">
        <TopNav />
        <Container maxW="1200px" py={20} textAlign="center">
          <Text color="red.500" fontSize="xl" mb={8}>{error || 'Product not found'}</Text>
          <Button onClick={() => navigate('/')} leftIcon={<TbArrowLeft />}>
            Back to Home
          </Button>
        </Container>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="bg">
      <TopNav />
      <MobileNav />

      <Box pt={{ base: 20, md: 24 }} pb={20}>
        <Container maxW="1200px" px={6}>
          <Button
            mb={10}
            onClick={() => navigate('/')}
            variant="ghost"
            color="fg.muted"
            _hover={{ color: 'brandOrange', bg: 'brandOrange/10' }}
          >
            <TbArrowLeft style={{ marginRight: '8px' }} /> Back to Products
          </Button>

          <Flex direction={{ base: 'column', lg: 'row' }} gap={16} align="flex-start">
            {/* Image Section */}
            <MotionBox
              flex="1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                position="relative"
                borderRadius="3xl"
                overflow="hidden"
                bg="bg.subtle"
                border="1px solid"
                borderColor="bg.muted"
                boxShadow="2xl"
              >
                <MotionImage
                  src={product.image}
                  alt={product.name}
                  w="100%"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                />
                <Badge
                  position="absolute"
                  top={6}
                  right={6}
                  bg="brandOrange"
                  color="white"
                  px={6}
                  py={3}
                  fontSize="xl"
                  fontWeight="900"
                  borderRadius="full"
                  boxShadow="0 8px 16px rgba(255, 107, 53, 0.4)"
                  transform="rotate(12deg)"
                >
                  SAVE 50%
                </Badge>
              </Box>
            </MotionBox>

            {/* Info Section */}
            <MotionBox
              flex="1.2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={8} align="stretch">
                <Box>
                  <Badge colorPalette="orange" variant="subtle" mb={4} p={2} borderRadius="md" fontWeight="bold">
                    TRUSTED WELLNESS
                  </Badge>
                  <Heading size="4xl" color="fg" mb={6} lineHeight="tight">
                    {product.name}
                  </Heading>
                  <Text fontSize="xl" color="fg.muted" lineHeight="tall">
                    {product.description}
                  </Text>
                </Box>

                <Box bg="bg.subtle" p={{ base: 6, md: 8 }} borderRadius="2xl" border="1px solid" borderColor="bg.muted">
                  <VStack align="stretch" spacing={6}>
                    <HStack justify="space-between" wrap="wrap" gap={4}>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="fg.subtle" fontWeight="bold" letterSpacing="widest">PRICE</Text>
                        <Stack direction={{ base: 'column', sm: 'row' }} align={{ base: 'start', sm: 'baseline' }} spacing={{ base: 2, sm: 4 }}>
                          <Text fontSize={{ base: "4xl", md: "5xl" }} fontWeight="900" color="brandOrange" lineHeight="1">
                            {product.price.toLocaleString()} <Text as="span" fontSize={{ base: "xl", md: "2xl" }}>KES</Text>
                          </Text>
                          <Text fontSize={{ base: "lg", md: "xl" }} color="fg.subtle" textDecoration="line-through">
                            {product.originalPrice.toLocaleString()} KES
                          </Text>
                        </Stack>
                      </VStack>
                      <Badge colorPalette="green" variant="solid" p={3} borderRadius="lg">
                        IN STOCK
                      </Badge>
                    </HStack>

                    <Button
                      bg="brandOrange"
                      color="white"
                      size="xl"
                      w="100%"
                      h={{ base: "70px", md: "80px" }}
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="900"
                      borderRadius="full"
                      boxShadow="0 12px 24px rgba(255, 107, 53, 0.3)"
                      onClick={() => setIsOrderModalOpen(true)}
                      _hover={{
                        bg: 'brandOrange',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 40px rgba(255, 107, 53, 0.4)'
                      }}
                    >
                      ORDER NOW
                    </Button>
                  </VStack>
                </Box>

                <Box pt={4}>
                  <Heading size="md" mb={6} color="fg" fontWeight="900">
                    Why You'll Love It
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {product.benefits.map((benefit, index) => (
                      <HStack key={index} spacing={4} p={4} bg="bg.subtle" borderRadius="xl">
                        <Box bg="brandOrange/20" p={2} borderRadius="lg">
                          <TbCheck color="brandOrange" />
                        </Box>
                        <Text fontSize="md" fontWeight="bold" color="fg.muted">{benefit}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* New "How it works" section */}
                <Box pt={12}>
                  <VStack spacing={8} align="stretch">
                    <VStack align="start" spacing={2}>
                      <Heading size="2xl" color="brandOrange" fontWeight="900">
                        HOW {product.name} WORKS
                      </Heading>
                      <Text fontSize="lg" color="fg.muted">
                        The effectiveness of {product.name.toLowerCase()} comes from the synergy between its active ingredients. Each component serves a specific function and together they address multiple aspects of joint health simultaneously.
                      </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                      <VStack align="start" p={6} bg="bg.subtle" borderRadius="2xl" border="1px solid" borderColor="bg.muted">
                        <Heading size="md" color="brandOrange" mb={3} fontWeight="900">
                          CARTILAGE REGENERATION AND JOINT STRENGTHENING
                        </Heading>
                        <Text color="fg.muted">
                          Shark liver oil acts as fundamental structural material for cartilage repair. It allows efficient absorption, which promotes the recovery of elasticity, mechanical resistance and reduction of joint friction.
                        </Text>
                      </VStack>

                      <VStack align="start" p={6} bg="bg.subtle" borderRadius="2xl" border="1px solid" borderColor="bg.muted">
                        <Heading size="md" color="brandOrange" mb={3} fontWeight="900">
                          REDUCTION OF INFLAMMATION AND PAIN
                        </Heading>
                        <Text color="fg.muted">
                          Flavonoids and phenolic acids possess anti-inflammatory properties that help reduce stiffness and joint pain. It also promotes local micro-circulation and contributes to the functional mobility of the joint.
                        </Text>
                      </VStack>

                      <VStack align="start" p={6} bg="bg.subtle" borderRadius="2xl" border="1px solid" borderColor="bg.muted">
                        <Heading size="md" color="brandOrange" mb={3} fontWeight="900">
                          LUBRICATION AND PROTECTION AGAINST WEAR
                        </Heading>
                        <Text color="fg.muted">
                          Wormwood stimulates the production of synovial fluid which functions as a natural lubricant, reducing cartilage wear and extending the useful life of joints under conditions of mechanical load.
                        </Text>
                      </VStack>

                      <VStack align="start" p={6} bg="bg.subtle" borderRadius="2xl" border="1px solid" borderColor="bg.muted">
                        <Heading size="md" color="brandOrange" mb={3} fontWeight="900">
                          BONE STRENGTHENING AND INJURY PREVENTION
                        </Heading>
                        <Text color="fg.muted">
                          The combination of collagen type II and vitamin D3 contributes to collagen synthesis, improves bone mineral density and prevents degenerative processes such as osteoporosis. In this way the joint support structure is reinforced.
                        </Text>
                      </VStack>
                    </SimpleGrid>
                  </VStack>
                </Box>
              </VStack>
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      <AdvantagesSection />
      <Footer />

      <QuickOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
      />
    </Box>
  )
}

export default ProductDetail

