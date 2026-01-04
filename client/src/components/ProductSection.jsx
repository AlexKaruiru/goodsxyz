import { useState, useEffect } from 'react'
import { Box, Container, Flex, VStack, Text, Button, Badge, SimpleGrid, Heading, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getAllProducts, searchProducts, getProductSlug } from '../utils/productsService'
import CountdownTimer from './CountdownTimer'
import QuickOrderModal from './QuickOrderModal'
import wormwoodImage from '../images/wormwood.jpg'
import biotinImage from '../images/biotin.jpg'

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
    <Box 
      bg="white" 
      borderRadius="xl" 
      p={{ base: 4, md: 4 }} 
      boxShadow="lg"
      position="relative"
      h="100%"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      onClick={() => navigate(`/product/${getProductSlug(product)}`)}
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      transition="all 0.3s"
    >
      <VStack spacing={3} align="stretch" flex="1">
        <Box position="relative" w="100%" display="flex" justify="center" align="center">
          <Box position="relative" w={{ base: "200px", md: "180px" }} h={{ base: "200px", md: "180px" }} borderRadius="lg" overflow="hidden" bg="gray.100">
            <Image 
              src={imageMap[product.image] || wormwoodImage} 
              alt={product.name}
              w="100%"
              h="100%"
              objectFit="cover"
            />
            <Badge
              position="absolute"
              top="-8px"
              right="-8px"
              bg="brandOrange"
              color="white"
              px={3}
              py={1}
              fontSize={{ base: "sm", md: "xs" }}
              fontWeight="bold"
              borderRadius="full"
              boxShadow="lg"
              transform="rotate(15deg)"
            >
              DISCOUNT <Text as="span" fontSize={{ base: "md", md: "sm" }}>50%</Text>
            </Badge>
          </Box>
        </Box>

        <VStack spacing={2} fontSize="sm" align="stretch" flex="1">
          {benefits.slice(0, 3).map((benefit, index) => (
            <Flex key={index} align="center" p={1}>
              <Text as="span" mr="2" fontSize="sm" color="brandOrange">✓</Text>
              <Text fontSize={{ base: "sm", md: "xs" }}>{benefit}</Text>
            </Flex>
          ))}
        </VStack>

        <Box textAlign="center" py={2} bg="gray.50" borderRadius="lg" px={2} mt="auto">
          <Text fontSize={{ base: "xs", md: "2xs" }} color="gray.600" mb="1">
            Advertising Spot <Text as="span" fontWeight="bold" color="brandOrange">DISCOUNT PRICE</Text>
          </Text>
          <Flex align="center" justify="center" gap={2}>
            <Text fontSize={{ base: "xl", md: "lg" }} fontWeight="bold" color="brandOrange">
              {product.price.toLocaleString()} KES
            </Text>
            <Text fontSize={{ base: "sm", md: "xs" }} color="gray.400" textDecoration="line-through">
              {product.originalPrice.toLocaleString()} KES
            </Text>
          </Flex>
        </Box>

        <Button
          bg="brandOrange"
          color="white"
          size={{ base: "md", md: "sm" }}
          w="100%"
          py={{ base: 4, md: 3 }}
          fontSize={{ base: "md", md: "sm" }}
          fontWeight="bold"
          borderRadius="full"
          boxShadow="xl"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedProduct(product)
            setIsOrderModalOpen(true)
          }}
          _hover={{ 
            bg: 'brandOrange', 
            transform: 'translateY(-2px)',
            boxShadow: '2xl'
          }}
          transition="all 0.2s"
          mt="2"
        >
          ORDER NOW
        </Button>
      </VStack>
    </Box>
  )

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="sectionTeal" position="relative" zIndex={2} mt={{ base: 0, md: -40 }} id="products">
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <VStack spacing={6} align="center" px={{ base: 4, md: 0 }} w="100%">
          <VStack spacing={4} align="center" w="100%">
            <Heading size="xl" textAlign="center" color="gray.800">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Products'}
            </Heading>
            {!searchQuery && (
              <CountdownTimer />
            )}
          </VStack>
          
          {isLoading ? (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" color="gray.600">
                Loading products...
              </Text>
            </Box>
          ) : products.length === 0 ? (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" color="gray.600" mb="4">
                No products found matching "{searchQuery}"
              </Text>
              <Text fontSize="md" color="gray.500">
                Try searching with different keywords
              </Text>
            </Box>
          ) : (
            <Box w="100%" display="flex" justifyContent="center" px={{ base: 0, md: 4, lg: 6 }}>
              <Flex 
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: 6, md: 8, lg: 10 }}
                w="100%"
                maxW="900px"
                justify="center"
              >
                {products.map((product) => (
                  <Box key={product.id} flex="1" maxW={{ base: "100%", md: "400px" }}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Flex>
            </Box>
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

