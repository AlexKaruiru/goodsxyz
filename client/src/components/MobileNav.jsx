import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Flex, IconButton, VStack, Drawer, HStack, Text, Icon } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TbX } from 'react-icons/tb'
import { getAllProducts, getProductSlug } from '../utils/productsService'
import { ColorModeButton } from './ui/color-mode'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

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
      <HStack
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        px={4}
        py={3}
        bg="bg/80"
        backdropFilter="blur(10px)"
        zIndex={10000}
        justify="space-between"
        borderBottom="1px solid"
        borderColor="bg.muted"
      >
        <Box
          onClick={() => navigate('/')}
          cursor="pointer"
          fontWeight="900"
          color="brandOrange"
          fontSize="xl"
        >
          SupleeHub
        </Box>
        <HStack spacing={2}>
          <ColorModeButton />
          <IconButton
            variant="ghost"
            onClick={() => setIsOpen(true)}
            aria-label="Toggle menu"
            color="fg"
            size="md"
          >
            <GiHamburgerMenu />
          </IconButton>
        </HStack>
      </HStack>

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="right" size="full">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="bg/95" backdropFilter="blur(30px)">
            <Drawer.Header borderBottom="1px solid" borderColor="bg.muted" py={6} px={6}>
              <HStack justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="900" color="brandOrange" letterSpacing="tight">
                  SupleeHub
                </Text>
                <Drawer.CloseTrigger asChild>
                  <IconButton variant="ghost" size="lg" borderRadius="full" color="fg">
                    <TbX size={32} />
                  </IconButton>
                </Drawer.CloseTrigger>
              </HStack>
            </Drawer.Header>

            <Drawer.Body py={10} px={6}>
              <Flex direction="column" justify="space-between" h="100%">
                <VStack spacing={6} align="start" w="100%">
                  {menuItems.map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                      onClick={(e) => handleNavClick(e, item)}
                      cursor="pointer"
                      w="100%"
                    >
                      <HStack spacing={4} group>
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="brandOrange"
                          opacity={0.5}
                          fontFamily="mono"
                        >
                          0{index + 1}
                        </Text>
                        <Text
                          fontSize="4xl"
                          fontWeight="900"
                          color="fg"
                          transition="all 0.3s"
                          _groupHover={{ color: 'brandOrange', transform: 'translateX(10px)' }}
                          textTransform="uppercase"
                          letterSpacing="tighter"
                        >
                          {item.label}
                        </Text>
                      </HStack>
                    </MotionBox>
                  ))}
                </VStack>

                <VStack spacing={8} align="start" pt={10} borderTop="1px solid" borderColor="bg.muted">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="bold" color="fg.subtle" letterSpacing="widest" textTransform="uppercase">
                      Quality Guaranteed
                    </Text>
                    <Text fontSize="md" color="fg" fontWeight="medium">
                      Premium Wellness Solutions
                    </Text>
                  </VStack>

                  <HStack spacing={6} w="100%" justify="space-between" align="center">
                    <HStack spacing={4}>
                      {/* Placeholder for social or other links */}
                    </HStack>
                    <ColorModeButton />
                  </HStack>
                </VStack>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}

export default MobileNav

