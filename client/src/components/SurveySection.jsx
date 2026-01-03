import { useState } from 'react'
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react'

const SurveySection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const questions = [
    {
      title: "1. After a long day of work, your limbs feel heavy and stiff:",
      options: ["Rarely", "Very Often", "Always"]
    },
    {
      title: "2. Ever had injuries, sprains, bruises, or fractures?",
      options: ["Yes, every couple of years", "Nothing that required hospital treatment", "Just minor injuries"]
    },
    {
      title: "3. How old are you?",
      options: ["Up to 30", "30-45", "45+"]
    }
  ]

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="white" position="relative" zIndex={4} mt={{ base: 0, md: -10 }}>
      <Container maxW="1200px" px={{ base: 0, md: 6 }} mx="auto">
        <VStack spacing={8} align="stretch" px={{ base: 4, md: 0 }} maxW="800px" mx="auto">
          <Heading size="xl" textAlign="center" mb={4} color="gray.800">
            Need Goodsxyz? Complete this survey:
          </Heading>

          {currentQuestion < questions.length ? (
            <Box bg="gray.50" p={8} borderRadius="xl" boxShadow="sm">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color="gray.800">
                {questions[currentQuestion].title}
              </Text>
              <VStack spacing={4} mb={8} align="stretch">
                {questions[currentQuestion].options.map((option, index) => (
                  <Box
                    key={index}
                    p={4}
                    border="2px solid"
                    borderColor="gray.300"
                    borderRadius="lg"
                    cursor="pointer"
                    bg="white"
                    _hover={{ 
                      bg: 'brandBlue', 
                      color: 'white',
                      borderColor: 'brandBlue',
                      transform: 'translateX(5px)'
                    }}
                    transition="all 0.2s"
                  >
                    <Text fontSize="lg">{option}</Text>
                  </Box>
                ))}
              </VStack>
              <Box textAlign="center">
                <Button
                  bg="brandBlue"
                  color="white"
                  onClick={handleNext}
                  size="lg"
                  px={10}
                  py={6}
                  fontSize="lg"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="xl"
                  _hover={{ 
                    bg: 'brandBlue', 
                    transform: 'translateY(-2px)',
                    boxShadow: '2xl'
                  }}
                  transition="all 0.2s"
                >
                  FORWARD &gt;&gt;&gt;
                </Button>
              </Box>
            </Box>
          ) : (
            <Box p={10} bg="blue.50" borderRadius="xl" boxShadow="md">
              <Text fontSize="xl" lineHeight="tall" color="gray.700">
                An injury or bruise can happen anytime - and it's easy to fix them asap! Try{' '}
                <Text as="span" fontWeight="bold" color="brandBlue">Goodsxyz</Text> which alleviates sprains, 
                contusions and even osteoarthritis. The unique capability of{' '}
                <Text as="span" fontWeight="bold" color="brandBlue">Goodsxyz</Text> to relieve pain and inflammation 
                will give you comfort anytime. Longer use of this product will fix long-term ailments 
                and stimulate the cartilaginous tissue regeneration.
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default SurveySection

