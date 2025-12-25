import { Box } from '@chakra-ui/react'
import SafetyBanner from './components/SafetyBanner'
import Header from './components/Header'
import ProductSection from './components/ProductSection'
import DescriptionSection from './components/DescriptionSection'
import SurveySection from './components/SurveySection'
import AdvantagesSection from './components/AdvantagesSection'
import OrderSection from './components/OrderSection'
import Footer from './components/Footer'

function App() {
  return (
    <Box minH="100vh" bg="white" w="100%" maxW="100vw" overflowX="hidden">
      <SafetyBanner />
      <Header />
      <ProductSection />
      <DescriptionSection />
      <SurveySection />
      <AdvantagesSection />
      <OrderSection />
      <Footer />
    </Box>
  )
}

export default App

