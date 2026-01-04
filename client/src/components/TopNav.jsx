import { Box, HStack, Input, Flex, Image } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logoImage from '../images/logo.webp'
import { getAllProducts, getProductSlug } from '../utils/productsService'

const TopNav = ({ onSearch }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products for navigation:', error)
      }
    }
    fetchProducts()
  }, [])

  // Build menu items dynamically
  const menuItems = [
    { label: 'Home', href: '#home', isHome: true, isProduct: false },
    ...products.map(product => ({
      label: product.name,
      href: `/product/${getProductSlug(product)}`,
      isHome: false,
      isProduct: true,
      productId: product.id
    })),
    { label: 'Order', href: '#order', isHome: false, isProduct: false },
  ]

  const handleNavClick = (e, item) => {
    e.preventDefault()
    
    if (item.isHome) {
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation, then scroll
        setTimeout(() => {
          const element = document.querySelector(item.href)
          if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else {
        const element = document.querySelector(item.href)
        if (element) {
          const offset = 100
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    } else if (item.isProduct) {
      // Navigate to product page
      navigate(item.href)
    } else {
      // Regular anchor link (like #order)
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation, then scroll
        setTimeout(() => {
          const element = document.querySelector(item.href)
          if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else {
        const element = document.querySelector(item.href)
        if (element) {
          const offset = 100
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }
  }

  // Real-time search as user types
  useEffect(() => {
    if (onSearch) {
      // Navigate to home if not already there
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          onSearch(searchQuery.trim())
        }, 100)
      } else {
        onSearch(searchQuery.trim())
      }
    }
  }, [searchQuery, onSearch, location.pathname, navigate])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="md"
      zIndex={10000}
      display={{ base: 'none', md: 'block' }}
    >
      <Box maxW="1200px" mx="auto" px={6} py={3}>
        <Flex align="center" justify="space-between" gap={6}>
          {/* Logo */}
          <Box
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/')
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            cursor="pointer"
            flexShrink={0}
          >
            <Image src={logoImage} alt="Goodsxyz Logo" h="50px" />
          </Box>

          {/* Navigation Menu */}
          <HStack spacing={12} flex="1" justify="center">
            {menuItems.map((item, index) => (
              <Box
                key={index}
                onClick={(e) => handleNavClick(e, item)}
                fontWeight="medium"
                color="gray.700"
                cursor="pointer"
                fontSize="md"
                px={2}
                _hover={{ 
                  color: 'brandOrange',
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.2s"
              >
                {item.label}
              </Box>
            ))}
          </HStack>

          {/* Search Bar */}
          <Box flexShrink={0} minW="200px" px={2}>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="md"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.300"
              px={4}
              _focus={{
                borderColor: 'brandOrange',
                boxShadow: '0 0 0 1px brandOrange'
              }}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default TopNav

