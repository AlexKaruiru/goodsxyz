import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import TopNav from '../components/TopNav'
import Header from '../components/Header'
import ProductSection from '../components/ProductSection'
import OrderSection from '../components/OrderSection'
import Footer from '../components/Footer'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Scroll to products section
    setTimeout(() => {
      const element = document.querySelector('#products')
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
  }

  return (
    <Box minH="100vh" bg="white" w="100%" maxW="100vw" overflowX="hidden">
      <TopNav onSearch={handleSearch} />
      <Header />
      <ProductSection searchQuery={searchQuery} />
      <OrderSection />
      <Footer />
    </Box>
  )
}

export default Home

