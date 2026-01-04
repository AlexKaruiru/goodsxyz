import { useState } from 'react'
import { Dialog, Box, Text, Input, Button, Textarea, Field, CloseButton, Portal, Flex } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { submitOrder } from '../utils/orderService'
import { toaster, createToast } from './ui/toaster'

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
      await submitOrder({
        name: formData.name,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        location: formData.deliveryAddress,
        productId: product?.id,
        productName: product?.name,
        price: product?.price
      })

      createToast({
        title: 'Order submitted successfully!',
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
      
      createToast({
        title: isRecipientError ? 'Email Configuration Error' : 'Error submitting order',
        description: isRecipientError 
          ? 'Please configure recipient emails in your EmailJS template settings.'
          : errorMessage,
        type: 'error',
        duration: 7000,
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
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop sx={{ zIndex: 10001 }} />
        <Dialog.Positioner sx={{ zIndex: 10002 }}>
          <Dialog.Content maxW="500px" p={0} sx={{ zIndex: 10002 }}>
            <Dialog.Header position="relative" px={6} pt={6} pb={4}>
              <Dialog.Title fontSize="xl" fontWeight="bold">
                Order Now
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" position="absolute" right="4" top="4" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body px={6} py={4}>
              <form onSubmit={handleSubmit} id="order-form">
                <Field.Root mb="4">
                  <Field.Label>NAME *</Field.Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Field.Root>

                <Field.Root mb="4">
                  <Field.Label>PHONE NUMBER *</Field.Label>
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
                </Field.Root>

                <Field.Root mb="4">
                  <Field.Label>DELIVERY ADDRESS *</Field.Label>
                  <Textarea
                    name="deliveryAddress"
                    placeholder="Street, City, Area, etc."
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </Field.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer px={6} pb={6} pt={4}>
              <Flex gap="3" w="100%">
                <Button
                  type="submit"
                  form="order-form"
                  bg="brandOrange"
                  color="white"
                  flex="1"
                  minW="120px"
                  px="6"
                  py="3"
                  fontSize="md"
                  fontWeight="bold"
                  loading={isSubmitting}
                  loadingText="Submitting..."
                  _hover={{ 
                    bg: 'brandOrange', 
                    opacity: 0.9
                  }}
                >
                  ORDER
                </Button>
                <Button 
                  colorPalette="gray" 
                  variant="outline" 
                  flex="1"
                  minW="120px"
                  px="6"
                  py="3"
                  fontSize="md"
                  fontWeight="medium"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default QuickOrderModal

