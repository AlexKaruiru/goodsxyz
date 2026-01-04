import { useState } from 'react'
import { Box, Container, Heading, VStack, Text, Input, Button, Flex, Spacer, Textarea, Badge } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { submitOrderForm } from '../utils/orderService'
import { toaster } from './ui/toaster'

const OrderSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryAddress: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate: all fields are required
    if (!formData.name || !formData.phone || !formData.deliveryAddress) {
      createToast({
        title: 'Validation Error',
        description: 'Please fill in all fields: Name, Phone Number, and Delivery Address',
        type: 'error',
        duration: 5000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitOrderForm({
        name: formData.name,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        source: 'order-form'
      })

      createToast({
        title: 'Order submitted successfully!',
        description: 'We have received your order. We will contact you shortly to confirm.',
        type: 'success',
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: '',
        phone: '',
        deliveryAddress: ''
      })
    } catch (error) {
      createToast({
        title: 'Error submitting order',
        description: error.message || 'Please try again later.',
        type: 'error',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Box as="section" py={{ base: 12, md: 20 }} pb={{ base: 12, md: 24 }} bg="sectionPeach" position="relative" zIndex={6} mt={{ base: 0, md: -30 }} id="order">
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <VStack spacing={8} px={{ base: 4, md: 0 }} w="100%" align="center">
          <Box textAlign="center" mb="4" w="100%">
            <Heading size="xl" mb="4" color="gray.800">
              Place Your Order
            </Heading>
            <Text fontSize="lg" color="gray.600" mb="8">
              Fill in your details and we'll contact you to confirm your order
            </Text>
          </Box>

          <Box w="100%" display="flex" justifyContent="center" px={{ base: 4, md: 0 }}>
            <Box w="100%" maxW="700px" bg="gray.50" p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="lg">
              <form onSubmit={handleSubmit}>
                <Box mb="4">
                  <Text fontWeight="bold" mb="2">NAME *</Text>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    bg="white"
                  />
                </Box>

                <Box mb="4">
                  <Text fontWeight="bold" mb="2">PHONE NUMBER *</Text>
                  <Box
                    className="phone-input-wrapper"
                    sx={{
                      '& .react-tel-input': {
                        width: '100% !important',
                      },
                      '& .form-control': {
                        width: '100% !important',
                        height: '40px !important',
                        fontSize: '16px !important',
                        borderRadius: '6px !important',
                        border: '1px solid #CBD5E0 !important',
                        backgroundColor: 'white !important',
                      },
                      '& .form-control:focus': {
                        borderColor: '#FF6B35 !important',
                        boxShadow: '0 0 0 1px #FF6B35 !important',
                        outline: 'none !important'
                      },
                      '& .flag-dropdown': {
                        borderRadius: '6px 0 0 6px !important',
                        borderRight: '1px solid #CBD5E0 !important',
                        backgroundColor: '#EDF2F7 !important'
                      }
                    }}
                  >
                    <PhoneInput
                      country={'ke'}
                      value={formData.phone}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          phone: value
                        })
                      }}
                      inputProps={{
                        name: 'phone',
                        required: true,
                      }}
                      placeholder="Phone number"
                    />
                  </Box>
                </Box>

                <Box mb="4">
                  <Text fontWeight="bold" mb="2">DELIVERY ADDRESS *</Text>
                  <Textarea
                    name="deliveryAddress"
                    placeholder="Street, City, Area, etc."
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    bg="white"
                    rows={4}
                  />
                </Box>

                <Button
                  type="submit"
                  bg="brandOrange"
                  color="white"
                  size="lg"
                  w="100%"
                  py={7}
                  fontSize="xl"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="xl"
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                  _hover={{ 
                    bg: 'brandOrange', 
                    transform: 'translateY(-2px)',
                    boxShadow: '2xl'
                  }}
                  transition="all 0.2s"
                >
                  ORDER
                </Button>
              </form>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default OrderSection

