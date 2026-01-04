import { useState } from 'react'
import { 
  Box, 
  VStack, 
  Text, 
  Input, 
  Button, 
  Flex, 
  Heading,
  Textarea
} from '@chakra-ui/react'
import { Steps } from '@chakra-ui/react'
import { submitOrder } from '../utils/orderService'

const MultiStepOrder = ({ product }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { title: 'Product Selection', description: 'Confirm your product' },
    { title: 'Customer Details', description: 'Enter your information' },
    { title: 'Delivery Location', description: 'Where to deliver' },
    { title: 'Review & Submit', description: 'Confirm your order' }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.name || (!formData.phone && !formData.email)) {
        alert('Validation Error: Please provide at least your name and either phone or email')
        return
      }
    }
    if (currentStep === 2) {
      if (!formData.location) {
        alert('Validation Error: Please provide your delivery location')
        return
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      await submitOrder({
        name: formData.name,
        phone: formData.phone || '',
        email: formData.email || '',
        location: formData.location,
        address: formData.address || '',
        productId: product.id,
        productName: product.name,
        price: product.price
      })

      alert('Order submitted successfully! Your order has been processed. We will contact you shortly to confirm.')

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        address: ''
      })
      setCurrentStep(0)
    } catch (error) {
      alert(`Error submitting order: ${error.message || 'Please try again later.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <VStack spacing={6} align="stretch" w="100%">
            <Heading size="md" color="gray.800">
              Product Selection
            </Heading>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontWeight="bold" fontSize="lg" mb={2}>{product.name}</Text>
              <Text color="gray.600" mb={3}>{product.description}</Text>
              <Flex align="center" gap={4}>
                <Text fontSize="2xl" fontWeight="bold" color="brandOrange">
                  {product.price.toLocaleString()} KES
                </Text>
                {product.originalPrice && product.originalPrice !== product.price && (
                  <Text fontSize="lg" color="gray.400" textDecoration="line-through">
                    {product.originalPrice.toLocaleString()} KSh
                  </Text>
                )}
              </Flex>
            </Box>
            <Text color="gray.600" fontSize="sm">
              Review the product details above. Click "Next" to continue with your order.
            </Text>
          </VStack>
        )

      case 1:
        return (
          <VStack spacing={4} align="stretch" w="100%">
            <Heading size="md" color="gray.800">
              Customer Details
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={2}>
              Please provide at least your name and either phone or email
            </Text>
            
            <Box>
              <Text fontWeight="bold" mb={2}>NAME *</Text>
              <Input
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                bg="white"
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>PHONE NUMBER</Text>
              <Flex gap={2}>
                <Input
                  value="+254"
                  disabled
                  w="80px"
                  bg="gray.200"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  bg="white"
                  flex={1}
                />
              </Flex>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>EMAIL</Text>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                bg="white"
              />
            </Box>

            <Text fontSize="xs" color="gray.500" mt={-2}>
              * Required. At least phone or email must be provided.
            </Text>
          </VStack>
        )

      case 2:
        return (
          <VStack spacing={4} align="stretch" w="100%">
            <Heading size="md" color="gray.800">
              Delivery Location
            </Heading>
            
            <Box>
              <Text fontWeight="bold" mb={2}>LOCATION *</Text>
              <Input
                name="location"
                type="text"
                placeholder="City, Town, or Area"
                value={formData.location}
                onChange={handleChange}
                required
                bg="white"
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>DETAILED ADDRESS (Optional)</Text>
              <Textarea
                name="address"
                placeholder="Street address, building, apartment, etc."
                value={formData.address}
                onChange={handleChange}
                bg="white"
                rows={4}
              />
            </Box>
          </VStack>
        )

      case 3:
        return (
          <VStack spacing={4} align="stretch" w="100%">
            <Heading size="md" color="gray.800">
              Review Your Order
            </Heading>
            
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontWeight="bold" mb={3}>Product:</Text>
              <Text mb={4}>{product.name} - {product.price.toLocaleString()} KSh</Text>
              
              <Text fontWeight="bold" mb={3}>Customer Information:</Text>
              <VStack align="stretch" spacing={2} mb={4}>
                <Text><strong>Name:</strong> {formData.name}</Text>
                {formData.phone && <Text><strong>Phone:</strong> {formData.phone}</Text>}
                {formData.email && <Text><strong>Email:</strong> {formData.email}</Text>}
              </VStack>
              
              <Text fontWeight="bold" mb={3}>Delivery:</Text>
              <VStack align="stretch" spacing={2}>
                <Text><strong>Location:</strong> {formData.location}</Text>
                {formData.address && <Text><strong>Address:</strong> {formData.address}</Text>}
              </VStack>
            </Box>

            <Text color="gray.600" fontSize="sm">
              Please review all information above. Click "Submit Order" to complete your purchase.
            </Text>
          </VStack>
        )

      default:
        return null
    }
  }

  return (
    <Box w="100%">
      <Steps.Root
        step={currentStep}
        onStepChange={(e) => setCurrentStep(e.step)}
        count={steps.length}
        colorPalette="orange"
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index}>
              <Steps.Trigger>
                <Steps.Indicator />
                <Box textAlign="left" ml={2}>
                  <Steps.Title>{step.title}</Steps.Title>
                  <Steps.Description>{step.description}</Steps.Description>
                </Box>
              </Steps.Trigger>
              {index < steps.length - 1 && <Steps.Separator />}
            </Steps.Item>
          ))}
        </Steps.List>

        <Box mt={8} minH="300px">
          <Steps.Content>
            {renderStepContent()}
          </Steps.Content>
        </Box>

        <Flex justify="space-between" mt={8}>
          <Button
            onClick={handlePrev}
            isDisabled={currentStep === 0}
            variant="outline"
            size="lg"
          >
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              bg="brandOrange"
              color="white"
              size="lg"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              _hover={{ bg: 'brandOrange', opacity: 0.9 }}
            >
              Submit Order
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              bg="brandOrange"
              color="white"
              size="lg"
              _hover={{ bg: 'brandOrange', opacity: 0.9 }}
            >
              Next
            </Button>
          )}
        </Flex>
      </Steps.Root>
    </Box>
  )
}

export default MultiStepOrder

