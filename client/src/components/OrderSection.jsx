import { useState } from 'react'
import { Box, Container, Heading, VStack, Text, Input, Button, Flex, Spacer, Textarea, Badge } from '@chakra-ui/react'
import { submitContactForm } from '../utils/contactService'
import { toaster } from './ui/toaster'

const OrderSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate: name is required, and at least phone or email must be provided
    if (!formData.name || (!formData.phone && !formData.email)) {
      toaster.create({
        title: 'Validation Error',
        description: 'Please provide your name and either phone or email',
        type: 'error',
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitContactForm({
        name: formData.name,
        phone: formData.phone || '',
        email: formData.email || '',
        message: formData.message || '',
        source: 'contact-form'
      })

      toaster.create({
        title: 'Form submitted successfully!',
        description: 'Your message has been processed. We will contact you shortly.',
        type: 'success',
      })

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      })
    } catch (error) {
      toaster.create({
        title: 'Error sending message',
        description: error.message || 'Please try again later.',
        type: 'error',
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
    <Box as="section" py={{ base: 12, md: 20 }} pb={{ base: 12, md: 24 }} bg="sectionPeach" position="relative" zIndex={6} mt={{ base: 0, md: -30 }} id="contact">
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <VStack spacing={8} px={{ base: 4, md: 0 }} w="100%" align="center">
          <Box textAlign="center" mb={4} w="100%">
            <Heading size="xl" mb={4} color="gray.800">
              Contact Us
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              Have a question? Get in touch with us!
            </Text>
          </Box>

          <Box w="100%" display="flex" justifyContent="center">
            <Box w="100%" maxW="700px" bg="gray.50" p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="lg">
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Box w="100%">
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

                  <Spacer h={3} />

                  <Box w="100%">
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

                  <Spacer h={3} />

                  <Box w="100%">
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

                  <Text fontSize="xs" color="gray.500" mt={-2} mb={2}>
                    * Required. At least phone or email must be provided.
                  </Text>

                  <Spacer h={3} />

                  <Box w="100%">
                    <Text fontWeight="bold" mb={2}>MESSAGE</Text>
                    <Textarea
                      name="message"
                      placeholder="Your message or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      bg="white"
                      rows={6}
                    />
                  </Box>

                  <Spacer h={3} />

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
                    SEND MESSAGE
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default OrderSection

