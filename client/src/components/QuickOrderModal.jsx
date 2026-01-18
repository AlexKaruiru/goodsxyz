import { useState } from 'react'
import { Dialog, Box, Text, Input, Button, Textarea, Field, CloseButton, Portal, Flex, VStack } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { submitOrder } from '../utils/orderService'

const QuickOrderModal = ({ isOpen, onClose, product }) => {
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
      await submitOrder({
        name: formData.name,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        location: formData.deliveryAddress,
        productId: product?.id,
        productName: product?.name,
        price: product?.price
      })

      alert('Order submitted successfully! We have received your order. We will contact you shortly to confirm.')

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

      const alertMessage = isRecipientError
        ? 'Email Configuration Error: Please configure recipient emails in your EmailJS template settings.'
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
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="center" size="md">
      <Portal>
        <Dialog.Backdrop sx={{ zIndex: 10001 }} />
        <Dialog.Positioner sx={{ zIndex: 10002 }}>
          <Dialog.Content
            bg="bg"
            borderRadius="3xl"
            p={0}
            sx={{ zIndex: 10002 }}
            overflow="hidden"
            border="1px solid"
            borderColor="bg.muted"
          >
            <Dialog.Header bg="bg.subtle" px={8} pt={8} pb={6} borderBottom="1px solid" borderColor="bg.muted">
              <VStack align="start" spacing={1}>
                <Dialog.Title fontSize="2xl" fontWeight="900" color="fg">
                  Quick Order
                </Dialog.Title>
                <Text color="fg.muted" fontSize="sm">
                  Ordering: <Text as="span" color="brandOrange" fontWeight="bold">{product?.name}</Text>
                </Text>
              </VStack>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="md" position="absolute" right="6" top="6" borderRadius="full" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body px={8} py={8}>
              <form onSubmit={handleSubmit} id="quick-order-form">
                <VStack spacing={6}>
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
                    <Field.Label fontWeight="bold" color="fg">PHONE NUMBER</Field.Label>
                    <Box
                      className="phone-input-wrapper"
                      sx={{
                        '& .react-tel-input': { width: '100% !important' },
                        '& .form-control': {
                          width: '100% !important',
                          height: '48px !important',
                          fontSize: '16px !important',
                          borderRadius: '12px !important',
                          border: '1px solid {colors.bg.muted} !important',
                          backgroundColor: 'bg.subtle !important',
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
                        '& .selected-flag': { backgroundColor: 'transparent !important' }
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
              <Button
                type="submit"
                form="quick-order-form"
                bg="brandOrange"
                color="white"
                w="100%"
                size="xl"
                fontWeight="bold"
                borderRadius="full"
                boxShadow="0 8px 16px rgba(255, 107, 53, 0.3)"
                loading={isSubmitting}
                loadingText="Processing..."
                _hover={{
                  bg: 'brandOrange',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(255, 107, 53, 0.4)'
                }}
              >
                PLACE ORDER - {product?.price.toLocaleString()} KES
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default QuickOrderModal

