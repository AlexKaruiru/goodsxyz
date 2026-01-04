import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, IconButton, VStack, Drawer } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { getAllProducts, getProductSlug } from '../utils/productsService'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

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
    setIsOpen(false) // Close drawer when item is clicked
    
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

  return (
    <>
      <Box 
        display={{ base: 'block', md: 'none' }} 
        position="fixed" 
        top={4} 
        right={4} 
        zIndex={10000}
      >
        <IconButton
          icon={<GiHamburgerMenu />}
          onClick={() => setIsOpen(true)}
          aria-label="Toggle menu"
          bg="transparent"
          color="gray.800"
          size="lg"
          borderRadius="md"
          _hover={{ bg: 'rgba(0, 0, 0, 0.05)' }}
          _active={{ bg: 'rgba(0, 0, 0, 0.1)' }}
        />
      </Box>

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="right" size="sm">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Box fontSize="xl" fontWeight="bold" color="gray.800">
                Menu
              </Box>
            </Drawer.Header>
            <Drawer.Body>
              <VStack spacing={4} align="stretch" mt="4">
                {menuItems.map((item, index) => (
                  <Box
                    key={index}
                    onClick={(e) => handleNavClick(e, item)}
                    py={4}
                    px={4}
                    borderRadius="md"
                    _hover={{ bg: 'gray.50' }}
                    fontWeight="medium"
                    color="gray.700"
                    cursor="pointer"
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                  >
                    {item.label}
                  </Box>
                ))}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}

export default MobileNav

