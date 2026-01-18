import { Box, Container, Heading, SimpleGrid, VStack, Text, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { TbCheck } from 'react-icons/tb'

const MotionBox = motion.create(Box)

const AdvantagesSection = () => {
  const advantages = [
    {
      title: "NUMEROUS EFFECTS",
      description: "Fixes ailments of traumatic and age-related joints and spine."
    },
    {
      title: "PERFECTLY SAFE",
      description: "Completely safe for one-time or regular usage with no side-effects."
    },
    {
      title: "100% NATURAL",
      description: "Only herbal active components carefully selected for maximum purity."
    },
    {
      title: "HIGH EFFICIENCY",
      description: "improves the general condition and reduces pain after first application."
    },
    {
      title: "EXPERT TESTED",
      description: "Certified and meets high standards for quality and effectiveness.*"
    },
    {
      title: "FAST ACTING",
      description: "Provides quick relief and visible results within days of consistent use."
    }
  ]

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="bg" position="relative" id="advantages">
      <Container maxW="1200px" px={6} mx="auto">
        <VStack spacing={16}>
          <VStack spacing={4} align="center">
            <Text
              fontSize="sm"
              fontWeight="extrabold"
              color="brandOrange"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Why Choose Us
            </Text>
            <Heading size="3xl" textAlign="center" color="fg">
              The SupleeHub Advantage
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="100%">
            {advantages.map((advantage, index) => (
              <MotionBox
                key={index}
                bg="bg.subtle"
                p={8}
                borderRadius="2xl"
                border="1px solid"
                borderColor="bg.muted"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'brandOrange/30' }}
              >
                <VStack spacing={6} align="start">
                  <Box
                    w="50px"
                    h="50px"
                    bg="brandOrange/10"
                    color="brandOrange"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <TbCheck size={24} />
                  </Box>
                  <VStack align="start" spacing={3}>
                    <Heading size="md" color="fg" fontWeight="900">
                      {advantage.title}
                    </Heading>
                    <Text fontSize="md" color="fg.muted" lineHeight="tall">
                      {advantage.description}
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default AdvantagesSection

