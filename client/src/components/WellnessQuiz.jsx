import { useState } from 'react'
import { Box, Container, Heading, Text, VStack, Button, HStack, Progress, Stack, Icon } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { TbArrowRight, TbChevronRight, TbCheck } from 'react-icons/tb'

const MotionBox = motion.create(Box)

const WellnessQuiz = () => {
    const [step, setStep] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const questions = [
        {
            title: "After a long day of work, your limbs feel heavy and stiff:",
            variants: ["Rarely", "Very Often", "Always"]
        },
        {
            title: "Ever had injuries, sprains, bruises, or fractures?",
            variants: ["Yes, every couple of years", "Nothing that required hospital treatment", "Just minor injuries"]
        },
        {
            title: "How your age range?",
            variants: ["Up to 30", "30-45", "45+"]
        }
    ]

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1)
        } else {
            setIsFinished(true)
        }
    }

    const progress = ((step) / questions.length) * 100

    return (
        <Box as="section" py={{ base: 16, md: 24 }} bg="bg">
            <Container maxW="800px" px={6} mx="auto">
                <VStack spacing={8} align="stretch">
                    <VStack spacing={4} align="center">
                        <Text
                            fontSize="sm"
                            fontWeight="extrabold"
                            color="brandOrange"
                            letterSpacing="widest"
                            textTransform="uppercase"
                        >
                            Diagnostic Survey
                        </Text>
                        <Heading size="2xl" textAlign="center" color="fg">
                            Quick Wellness <Text as="span" color="brandOrange">Analysis</Text>
                        </Heading>
                        {!isFinished && (
                            <Text color="fg.muted" textAlign="center">
                                Answer {questions.length} simple questions to find the best solution for your mobility.
                            </Text>
                        )}
                    </VStack>

                    <Box
                        bg="bg.subtle"
                        p={{ base: 8, md: 12 }}
                        borderRadius="3xl"
                        border="1px solid"
                        borderColor="bg.muted"
                        boxShadow="2xl"
                        position="relative"
                        overflow="hidden"
                    >
                        <AnimatePresence mode="wait">
                            {!isFinished ? (
                                <MotionBox
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <VStack align="stretch" spacing={8}>
                                        <HStack justify="space-between" align="center">
                                            <Text fontWeight="bold" color="brandOrange" fontSize="sm">
                                                QUESTION {step + 1} OF {questions.length}
                                            </Text>
                                            <Text fontWeight="bold" color="fg.subtle" fontSize="sm">
                                                {Math.round(progress)}%
                                            </Text>
                                        </HStack>
                                        <Box h="2px" bg="bg.muted" borderRadius="full" overflow="hidden">
                                            <Box
                                                h="100%"
                                                bg="brandOrange"
                                                w={`${progress}%`}
                                                transition="width 0.4s ease-in-out"
                                            />
                                        </Box>

                                        <Heading size="lg" color="fg" lineHeight="tall" textAlign="center">
                                            {questions[step].title}
                                        </Heading>

                                        <VStack align="stretch" spacing={4}>
                                            {questions[step].variants.map((variant, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant="outline"
                                                    size="xl"
                                                    justifyContent="space-between"
                                                    px={8}
                                                    py={8}
                                                    borderRadius="2xl"
                                                    borderColor="bg.muted"
                                                    _hover={{ borderColor: 'brandOrange', bg: 'brandOrange/5' }}
                                                    onClick={handleNext}
                                                    rightIcon={<TbChevronRight />}
                                                    textAlign="center"
                                                    whiteSpace="normal"
                                                    height="auto"
                                                >
                                                    <Text color="fg" fontWeight="bold">{variant}</Text>
                                                </Button>
                                            ))}
                                        </VStack>
                                    </VStack>
                                </MotionBox>
                            ) : (
                                <MotionBox
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <VStack align="center" spacing={8} py={4}>
                                        <Box
                                            w="80px"
                                            h="80px"
                                            bg="green.500/10"
                                            color="green.500"
                                            borderRadius="full"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <TbCheck size={40} />
                                        </Box>
                                        <VStack spacing={4} textAlign="center">
                                            <Heading size="xl" color="fg">Analysis Complete</Heading>
                                            <Text fontSize="lg" color="fg.muted">
                                                Based on your answers, an injury or bruise can happen anytime - and it's easy to fix them fast! We recommend joining thousands who use <Text as="span" fontWeight="bold" color="brandOrange">SupleeHub</Text> solutions.
                                            </Text>
                                            <Text color="fg.muted">
                                                Our unique capacity to relieve pain and inflammation will give you comfort anytime. Longer use will help stimulate cartilaginous tissue regeneration.
                                            </Text>
                                        </VStack>
                                        <Button
                                            size="xl"
                                            bg="brandOrange"
                                            color="white"
                                            px={12}
                                            borderRadius="full"
                                            rightIcon={<TbArrowRight />}
                                            onClick={() => {
                                                const element = document.querySelector('#order')
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' })
                                                }
                                            }}
                                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                                        >
                                            CLAIM DISCOUNT NOW
                                        </Button>
                                    </VStack>
                                </MotionBox>
                            )}
                        </AnimatePresence>
                    </Box>
                </VStack>
            </Container>
        </Box>
    )
}

export default WellnessQuiz
