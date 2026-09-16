import { useState, useId } from 'react'
import { Box, Container, Heading, VStack, HStack, Text, Input, Button, Flex, Textarea, Stack, Field } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { submitOrderForm } from '../utils/orderService'
import { TbTruck } from 'react-icons/tb'
import { toaster } from './ui/toaster'
import { hasValidPhoneDigits } from '../utils/phone'

const OrderSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryAddress: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  // react-phone-input-2 manages its own <input> id, ignoring Field.Root's auto-generated one,
  // so the label needs an explicit id passed straight into the phone input to actually link up.
  const phoneFieldId = useId()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate: all fields are required
    if (!formData.name || !hasValidPhoneDigits(formData.phone) || !formData.deliveryAddress) {
      toaster.create({
        title: 'Missing information',
        description: 'Please fill in your name, a valid phone number, and delivery address.',
        type: 'warning',
        duration: 4000,
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

      toaster.create({
        title: 'Order submitted!',
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
      // Handle EmailJS specific error
      const errorMessage = error.text || error.message || 'Please try again later.'
      const isRecipientError = errorMessage.includes('recipients address is empty') || errorMessage.includes('recipient')

      toaster.create({
        title: isRecipientError ? 'Email configuration error' : 'Order submission failed',
        description: isRecipientError
          ? 'Please configure recipient emails in your EmailJS template settings (To Email field).'
          : errorMessage,
        type: 'error',
        duration: 6000,
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
    <Box as="section" py={{ base: 16, md: 24 }} bg="bg" id="order">
      <Container maxW="1200px" px={6} mx="auto">
        <Stack direction={{ base: 'column', md: 'row' }} gap={16} align="center">
          <VStack align={{ base: 'center', md: 'flex-start' }} flex="1" gap={6}>
            <Text
              fontSize="sm"
              fontWeight="extrabold"
              color="brandOrange"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Order Now
            </Text>
            <Heading as="h2" size="3xl" color="fg" textAlign={{ base: 'center', md: 'left' }}>
              Bring Natural <Text as="span" color="brandOrange">Wellness</Text> To Your Door
            </Heading>
            <Text fontSize="lg" color="fg.muted" textAlign={{ base: 'center', md: 'left' }}>
              Join thousands of satisfied customers. Fill in your details below and our team will reach out to confirm your order and delivery details.
            </Text>

            <VStack align="stretch" w="100%" gap={4}>
              <HStack gap={4}>
                <Box bg="brandOrange/10" p={2} borderRadius="md">
                  <Text color="brandOrange" fontWeight="bold">✓</Text>
                </Box>
                <Text color="fg.muted">Free Delivery Across Kenya</Text>
              </HStack>
              <HStack gap={4}>
                <Box bg="brandOrange/10" p={2} borderRadius="md">
                  <Text color="brandOrange" fontWeight="bold">✓</Text>
                </Box>
                <Text color="fg.muted">Secure Cash on Delivery</Text>
              </HStack>
              <HStack gap={4}>
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
                <VStack gap={6}>
                  <Field.Root w="100%">
                    <Field.Label fontWeight="bold" mb="2" fontSize="sm" color="fg">FULL NAME</Field.Label>
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
                  </Field.Root>

                  <Field.Root w="100%">
                    <Field.Label htmlFor={phoneFieldId} fontWeight="bold" mb="2" fontSize="sm" color="fg">PHONE NUMBER</Field.Label>
                    <Box className="phone-input-wrapper" w="100%">
                      <PhoneInput
                        country={'ke'}
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                        inputProps={{ name: 'phone', required: true, id: phoneFieldId }}
                        placeholder="Phone number"
                      />
                    </Box>
                  </Field.Root>

                  <Field.Root w="100%">
                    <Field.Label fontWeight="bold" mb="2" fontSize="sm" color="fg">DELIVERY ADDRESS</Field.Label>
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
                  </Field.Root>

                  <VStack gap={4} w="100%">
                    <Button
                      type="submit"
                      bgGradient="to-r, brandOrange, #ff8a45"
                      color="white"
                      size="xl"
                      w="100%"
                      fontWeight="bold"
                      borderRadius="full"
                      boxShadow="0 8px 16px rgba(255, 107, 53, 0.3)"
                      loading={isSubmitting}
                      loadingText="Processing..."
                      _hover={{
                        bgGradient: 'to-r, #ff8a45, brandOrange',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 28px rgba(255, 107, 53, 0.5)'
                      }}
                      transition="all 0.3s ease"
                    >
                      PLACE ORDER
                    </Button>
                    <Flex align="center" justify="center" gap={2} color="#16a34a" w="100%">
                      <TbTruck size={20} />
                      <Text fontSize="sm" fontWeight="bold" letterSpacing="wide">
                        FREE DELIVERY COUNTRYWIDE.
                      </Text>
                    </Flex>
                  </VStack>
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

