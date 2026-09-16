import { Box, Container, Heading, SimpleGrid, VStack, Text, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { TbStarFilled, TbStarHalfFilled } from 'react-icons/tb'

const MotionBox = motion.create(Box)

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Philip K.",
      location: "Nairobi",
      content: "I've been suffering from joint pain for years, and this product has been a game changer. Within just a few days, I noticed a significant reduction in stiffness. Highly recommended!",
      rating: 5
    },
    {
      name: "Charity M.",
      location: "Meru",
      content: "I bought this for my elderly mother who was really struggling with her knees. The fast-acting formula is no joke—her mobility has improved drastically, and she can finally enjoy her morning walks again without discomfort.",
      rating: 4.5
    }
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<TbStarFilled key={`full-${i}`} color="#F59E0B" size={20} />)
    }

    if (hasHalfStar) {
      stars.push(<TbStarHalfFilled key="half" color="#F59E0B" size={20} />)
    }

    return stars
  }

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="bg.subtle" id="testimonials">
      <Container maxW="1200px" px={6} mx="auto">
        <VStack gap={16}>
          <VStack gap={4} align="center">
            <Text
              fontSize="sm"
              fontWeight="extrabold"
              color="brandOrangeCta"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Reviews
            </Text>
            <Heading as="h2" size="3xl" textAlign="center" color="fg">
              What Our Customers Say
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} w="100%">
            {testimonials.map((testimonial, index) => (
              <MotionBox
                key={index}
                bg="bg"
                p={8}
                borderRadius="2xl"
                border="1px solid"
                borderColor="bg.muted"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, borderColor: 'brandOrange/30' }}
                boxShadow="sm"
              >
                <VStack gap={6} align="start" h="100%" justify="space-between">
                  <VStack align="start" gap={4}>
                    <HStack gap={1}>
                      {renderStars(testimonial.rating)}
                    </HStack>
                    <Text fontSize="lg" color="fg" fontStyle="italic" lineHeight="tall">
                      "{testimonial.content}"
                    </Text>
                  </VStack>
                  
                  <HStack gap={4}>
                    <Box 
                      w="40px" 
                      h="40px" 
                      borderRadius="full" 
                      bg="brandOrange" 
                      color="white" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center" 
                      fontWeight="bold"
                    >
                      {testimonial.name.charAt(0)}
                    </Box>
                    <VStack align="start" gap={0}>
                      <Heading as="h3" size="sm" color="fg">{testimonial.name}</Heading>
                      <Text fontSize="sm" color="fg.muted">{testimonial.location}</Text>
                    </VStack>
                  </HStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default TestimonialSection
