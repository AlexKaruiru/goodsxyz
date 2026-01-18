import { useState, useEffect } from 'react'
import { Box, Container, Flex, VStack, Stack, HStack, Text, Button, Badge, SimpleGrid, Heading, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllProducts, searchProducts, getProductSlug } from '../utils/productsService'
import CountdownTimer from './CountdownTimer'
import QuickOrderModal from './QuickOrderModal'
import wormwoodImage from '../images/wormwood.jpg'
import biotinImage from '../images/biotin.jpg'

const MotionBox = motion.create(Box)

// Map product image names to actual imports
const imageMap = {
  'wormwood.jpg': wormwoodImage,
  'biotin.jpg': biotinImage,
  'product1.webp': wormwoodImage, // fallback
  'product2.webp': biotinImage // fallback
}

const ProductSection = ({ searchQuery = '' }) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const benefits = [
    'Relieves pain',
    'Stimulates cartilage regeneration',
    'Alleviates muscle hypertension',
    'Lessens swelling',
    'Eliminates inflammations'
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        let fetchedProducts
        if (searchQuery && searchQuery.trim()) {
          fetchedProducts = await searchProducts(searchQuery)
        } else {
          fetchedProducts = await getAllProducts()
        }
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery])

  const ProductCard = ({ product }) => (
    <MotionBox
      bg="bg"
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      position="relative"
      h="100%"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      onClick={() => navigate(`/product/${getProductSlug(product)}`)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: 'xl' }}
      transition={{ duration: 0.3 }}
      border="1px solid"
      borderColor="bg.muted"
    >
      <VStack spacing={4} align="stretch" flex="1">
        <Box position="relative" w="100%" display="flex" justifyContent="center" alignItems="center">
          <Box position="relative" w="100%" pt="100%" borderRadius="xl" overflow="hidden" bg="bg.muted">
            <Image
              src={imageMap[product.image] || wormwoodImage}
              alt={product.name}
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.5s"
              _hover={{ transform: 'scale(1.1)' }}
            />
            <Badge
              position="absolute"
              top="12px"
              right="12px"
              bg="brandOrange"
              color="white"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="bold"
              borderRadius="full"
              boxShadow="lg"
            >
              -{product.discount}% OFF
            </Badge>
          </Box>
        </Box>

        <VStack spacing={2} align="center" textAlign="center">
          <Heading size="md" color="fg">{product.name}</Heading>
          <VStack spacing={1} align="center">
            {benefits.slice(0, 3).map((benefit, index) => (
              <Flex key={index} align="center">
                <Box as="span" mr="2" color="brandOrange" fontSize="sm">●</Box>
                <Text fontSize="xs" color="fg.muted" noOfLines={1}>{benefit}</Text>
              </Flex>
            ))}
          </VStack>
        </VStack>

        <Box py={3} borderTop="1px solid" borderColor="bg.muted" mt="auto">
          <Stack direction="row" align="baseline" justify="center" gap={2} mb={4}>
            <Text fontSize="2xl" fontWeight="900" color="brandOrange">
              {product.price.toLocaleString()} KES
            </Text>
            <Text fontSize="sm" color="fg.subtle" textDecoration="line-through">
              {product.originalPrice.toLocaleString()} KES
            </Text>
          </Stack>

          <Button
            bg="brandOrange"
            color="white"
            size="lg"
            w="100%"
            fontWeight="bold"
            borderRadius="full"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedProduct(product)
              setIsOrderModalOpen(true)
            }}
            _hover={{
              bg: 'brandOrange',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(255, 107, 53, 0.4)'
            }}
          >
            ORDER NOW
          </Button>
        </Box>
      </VStack>
    </MotionBox>
  )

  return (
    <Box as="section" pt={{ base: 8, md: 12 }} pb={{ base: 16, md: 24 }} bg="bg" id="products">
      <Container maxW="1400px" px={6} mx="auto">
        <VStack spacing={16} align="stretch" w="100%">
          {/* Header Area */}
          <VStack spacing={8} align="center" textAlign="center" w="100%">
            <VStack spacing={4}>
              <Text
                fontSize="sm"
                fontWeight="extrabold"
                color="brandOrange"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                Our Collection
              </Text>
              <Heading size="3xl" color="fg">
                Wellness Essentials
              </Heading>
            </VStack>

            <Box>
              <CountdownTimer />
            </Box>
          </VStack>

          {searchQuery && (
            <HStack bg="bg.subtle" p={4} borderRadius="xl" border="1px solid" borderColor="bg.muted">
              <Text color="fg.muted">
                Showing results for <Text as="span" fontWeight="bold" color="brandOrange">"{searchQuery}"</Text>
                <Text as="span" ml={2} color="fg.subtle">({products.length} products found)</Text>
              </Text>
            </HStack>
          )}

          {isLoading ? (
            <Flex justify="center" py={20}>
              <Text color="fg.muted">Discovering products...</Text>
            </Flex>
          ) : products.length > 0 ? (
            <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justify="center" gap={8} w="100%">
              {products.map((product) => (
                <Box key={product.id} w={{ base: '100%', md: 'calc(50% - 32px)', lg: 'calc(33.333% - 32px)' }} minH="100%">
                  <ProductCard product={product} />
                </Box>
              ))}
            </Flex>
          ) : (
            <VStack py={20} bg="bg.subtle" borderRadius="3xl" border="1px dashed" borderColor="bg.muted">
              <Text fontSize="xl" color="fg.muted">No products found matching your search.</Text>
              <Button
                variant="ghost"
                color="brandOrange"
                onClick={() => window.location.reload()}
              >
                View all products
              </Button>
            </VStack>
          )}
        </VStack>
      </Container>

      <QuickOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false)
          setSelectedProduct(null)
        }}
        product={selectedProduct}
      />
    </Box>
  )
}

export default ProductSection

