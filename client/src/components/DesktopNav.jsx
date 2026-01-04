import { Box, HStack, Text } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'

const DesktopNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const menuItems = [
    { label: 'Home', href: '#home', isHome: true },
    { label: 'Products', href: '#products', isHome: false },
    { label: 'About', href: '#about', isHome: false },
    { label: 'Order', href: '#order', isHome: false },
  ]

  const handleNavClick = (e, item) => {
    e.preventDefault()
    
    if (item.isHome) {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        const element = document.querySelector(item.href)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    } else {
      if (location.pathname !== '/') {
        navigate(`/${item.href}`)
      } else {
        const element = document.querySelector(item.href)
        if (element) {
          const offset = 80
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
    <Box 
      display={{ base: 'none', md: 'block' }} 
      position="fixed" 
      top={4} 
      right={8} 
      zIndex={10000}
      bg="white"
      borderRadius="full"
      px={6}
      py={3}
      boxShadow="lg"
    >
      <HStack spacing={6}>
        {menuItems.map((item, index) => (
          <Box
            key={index}
            onClick={(e) => handleNavClick(e, item)}
            fontWeight="medium"
            color="gray.700"
            cursor="pointer"
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
    </Box>
  )
}

export default DesktopNav

