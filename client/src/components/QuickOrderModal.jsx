import { useState, useId } from 'react'
import { Dialog, Box, Text, Input, Button, Textarea, Field, CloseButton, Portal, Flex, VStack } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { submitOrder } from '../utils/orderService'
import { TbTruck } from 'react-icons/tb'
import { toaster } from './ui/toaster'
import { hasValidPhoneDigits } from '../utils/phone'

const QuickOrderModal = ({ isOpen, onClose, product }) => {
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
      await submitOrder({
        name: formData.name,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        location: formData.deliveryAddress,
        productId: product?.id,
        productName: product?.name,
        price: product?.price
      })

      toaster.create({
        title: 'Order submitted!',
        description: 'We have received your order. We will contact you shortly to confirm.',
        type: 'success',
        duration: 5000,
      })

      // Reset form and close modal
      setFormData({
        name: '',
        phone: '',
        deliveryAddress: ''
      })
      onClose()
    } catch (error) {
      // Handle EmailJS specific error
      const errorMessage = error.text || error.message || 'Please try again later.'
      const isRecipientError = errorMessage.includes('recipients address is empty')

      toaster.create({
        title: isRecipientError ? 'Email configuration error' : 'Order submission failed',
        description: isRecipientError
          ? 'Please configure recipient emails in your EmailJS template settings.'
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
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="center" size="md">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="bg"
            borderRadius="3xl"
            p={0}
            overflow="hidden"
            border="1px solid"
            borderColor="bg.muted"
          >
            <Dialog.Header bg="bg.subtle" px={8} pt={8} pb={6} borderBottom="1px solid" borderColor="bg.muted">
              <VStack align="start" gap={1}>
                <Dialog.Title fontSize="2xl" fontWeight="900" color="fg">
                  Quick Order
                </Dialog.Title>
                <Text color="fg.muted" fontSize="sm">
                  Ordering: <Text as="span" color="brandOrangeCta" fontWeight="bold">{product?.name}</Text>
                </Text>
              </VStack>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="md" position="absolute" right="6" top="6" borderRadius="full" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body px={8} py={8}>
              <form onSubmit={handleSubmit} id="quick-order-form">
                <VStack gap={6}>
                  <Field.Root>
                    <Field.Label fontWeight="bold" color="fg">FULL NAME</Field.Label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      bg="bg.subtle"
                      size="lg"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="bg.muted"
                      _focus={{ borderColor: 'brandOrange', boxShadow: '0 0 0 1px brandOrange' }}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label htmlFor={phoneFieldId} fontWeight="bold" color="fg">PHONE NUMBER</Field.Label>
                    <Box className="phone-input-wrapper">
                      <PhoneInput
                        country={'ke'}
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                        inputProps={{ name: 'phone', required: true, id: phoneFieldId }}
                        placeholder="Phone number"
                      />
                    </Box>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontWeight="bold" color="fg">DELIVERY ADDRESS</Field.Label>
                    <Textarea
                      name="deliveryAddress"
                      placeholder="Street, City, Area, etc."
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                      bg="bg.subtle"
                      size="lg"
                      borderRadius="xl"
                      rows={3}
                      border="1px solid"
                      borderColor="bg.muted"
                      _focus={{ borderColor: 'brandOrange', boxShadow: '0 0 0 1px brandOrange' }}
                    />
                  </Field.Root>
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer px={8} pb={8} pt={0}>
              <VStack gap={4} w="100%">
                <Button
                  type="submit"
                  form="quick-order-form"
                  bg="brandOrangeCta"
                  color="white"
                  w="100%"
                  size="xl"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="0 8px 16px rgba(255, 107, 53, 0.3)"
                  loading={isSubmitting}
                  loadingText="Processing..."
                  _hover={{
                    bg: 'brandOrangeCta',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(255, 107, 53, 0.4)'
                  }}
                >
                  PLACE ORDER - {product?.price.toLocaleString()} KES
                </Button>
                <Flex align="center" justify="center" gap={2} color="#16a34a" w="100%">
                  <TbTruck size={20} />
                  <Text fontSize="sm" fontWeight="bold" letterSpacing="wide">
                    FREE DELIVERY COUNTRYWIDE.
                  </Text>
                </Flex>
              </VStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default QuickOrderModal

