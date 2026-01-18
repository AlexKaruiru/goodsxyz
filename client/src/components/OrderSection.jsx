import { useState } from 'react'
import { Box, Container, Heading, VStack, HStack, Text, Input, Button, Flex, Textarea, Stack } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { submitOrderForm } from '../utils/orderService'

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
      alert('Please fill in all fields: Name, Phone Number, and Delivery Address')
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

      alert('Order submitted successfully! We have received your order. We will contact you shortly to confirm.')

      // Reset form
      setFormData({
        name: '',
        phone: '',
        deliveryAddress: ''
      })
    } catch (error) {
      // Handle EmailJS specific error
      const errorMessage = error.text || error.message || 'Please try again later.'
      const isRecipientError = errorMessage.includes('recipients address is empty') || errorMessage.includes('recipient')

      const alertMessage = isRecipientError
        ? 'Email Configuration Error: Please configure recipient emails in your EmailJS template settings (To Email field).'
        : `Error submitting order: ${errorMessage}`

      alert(alertMessage)
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
    <Box as="section" py={{ base: 16, md: 24 }} bg="bg" id="order">
      <Container maxW="1200px" px={6} mx="auto">
        <Stack direction={{ base: 'column', md: 'row' }} gap={16} align="center">
          <VStack align={{ base: 'center', md: 'flex-start' }} flex="1" spacing={6}>
            <Text
              fontSize="sm"
              fontWeight="extrabold"
              color="brandOrange"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Order Now
            </Text>
            <Heading size="3xl" color="fg" textAlign={{ base: 'center', md: 'left' }}>
              Bring Natural <Text as="span" color="brandOrange">Wellness</Text> To Your Door
            </Heading>
            <Text fontSize="lg" color="fg.muted" textAlign={{ base: 'center', md: 'left' }}>
              Join thousands of satisfied customers. Fill in your details below and our team will reach out to confirm your order and delivery details.
            </Text>

            <VStack align="stretch" w="100%" spacing={4}>
              <HStack spacing={4}>
                <Box bg="brandOrange/10" p={2} borderRadius="md">
                  <Text color="brandOrange" fontWeight="bold">✓</Text>
                </Box>
                <Text color="fg.muted">Fast Delivery Across Nairobi</Text>
              </HStack>
              <HStack spacing={4}>
                <Box bg="brandOrange/10" p={2} borderRadius="md">
                  <Text color="brandOrange" fontWeight="bold">✓</Text>
                </Box>
                <Text color="fg.muted">Secure Cash on Delivery</Text>
              </HStack>
              <HStack spacing={4}>
                <Box bg="brandOrange/10" p={2} borderRadius="md">
                  <Text color="brandOrange" fontWeight="bold">✓</Text>
                </Box>
                <Text color="fg.muted">100% Satisfaction Guarantee</Text>
              </HStack>
            </VStack>
          </VStack>

          <Box flex="1" w="100%">
            <Box
              bg="bg.subtle"
              p={{ base: 8, md: 10 }}
              borderRadius="3xl"
              boxShadow="xl"
              border="1px solid"
              borderColor="bg.muted"
            >
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <Box w="100%">
                    <Text fontWeight="bold" mb="2" fontSize="sm" color="fg">FULL NAME</Text>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      bg="bg"
                      size="lg"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="bg.muted"
                      _focus={{ borderColor: 'brandOrange', boxShadow: '0 0 0 1px brandOrange' }}
                    />
                  </Box>

                  <Box w="100%">
                    <Text fontWeight="bold" mb="2" fontSize="sm" color="fg">PHONE NUMBER</Text>
                    <Box
                      className="phone-input-wrapper"
                      sx={{
                        '& .react-tel-input': {
                          width: '100% !important',
                        },
                        '& .form-control': {
                          width: '100% !important',
                          height: '48px !important',
                          fontSize: '16px !important',
                          borderRadius: '12px !important',
                          border: '1px solid {colors.bg.muted} !important',
                          backgroundColor: 'bg !important',
                          color: 'fg !important',
                        },
                        '& .form-control:focus': {
                          borderColor: 'brandOrange !important',
                          boxShadow: '0 0 0 1px brandOrange !important',
                          outline: 'none !important'
                        },
                        '& .flag-dropdown': {
                          borderRadius: '12px 0 0 12px !important',
                          borderRight: '1px solid {colors.bg.muted} !important',
                          backgroundColor: 'bg.muted !important'
                        },
                        '& .selected-flag': {
                          backgroundColor: 'transparent !important'
                        }
                      }}
                    >
                      <PhoneInput
                        country={'ke'}
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                        inputProps={{ name: 'phone', required: true }}
                        placeholder="Phone number"
                      />
                    </Box>
                  </Box>

                  <Box w="100%">
                    <Text fontWeight="bold" mb="2" fontSize="sm" color="fg">DELIVERY ADDRESS</Text>
                    <Textarea
                      name="deliveryAddress"
                      placeholder="Street, City, Area, etc."
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                      bg="bg"
                      size="lg"
                      borderRadius="xl"
                      rows={3}
                      border="1px solid"
                      borderColor="bg.muted"
                      _focus={{ borderColor: 'brandOrange', boxShadow: '0 0 0 1px brandOrange' }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    bg="brandOrange"
                    color="white"
                    size="xl"
                    w="100%"
                    fontWeight="bold"
                    borderRadius="full"
                    boxShadow="0 8px 16px rgba(255, 107, 53, 0.3)"
                    isLoading={isSubmitting}
                    loadingText="Processing..."
                    _hover={{
                      bg: 'brandOrange',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 24px rgba(255, 107, 53, 0.4)'
                    }}
                  >
                    PLACE ORDER
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default OrderSection

