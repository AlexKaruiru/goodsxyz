import { Box, Container, Heading, Text, SimpleGrid, VStack, Icon, HStack, Badge } from '@chakra-ui/react'
import { TbAlertTriangle, TbClipboardCheck, TbTruck, TbWallet } from "react-icons/tb"
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

const TrustSection = () => {
    const steps = [
        {
            icon: TbClipboardCheck,
            title: "Order Form",
            text: "Simply complete our quick order form with your basic details."
        },
        {
            icon: TbTruck,
            title: "Fast Shipping",
            text: "Our team will contact you to choose the best shipping method."
        },
        {
            icon: TbWallet,
            title: "Pay on Receipt",
            text: "Total safety. You only pay for the product upon receipt."
        }
    ]

    return (
        <Box as="section" py={{ base: 16, md: 24 }} bg="bg">
            <Container maxW="1200px" px={6} mx="auto">
                <VStack spacing={20}>


                    {/* How to Order */}
                    <VStack spacing={12} w="100%">
                        <VStack spacing={4}>
                            <Text
                                fontSize="sm"
                                fontWeight="extrabold"
                                color="brandOrange"
                                letterSpacing="widest"
                                textTransform="uppercase"
                            >
                                The Process
                            </Text>
                            <Heading size="2xl" textAlign="center" color="fg">
                                How to Get Your <Text as="span" color="brandOrange">Order</Text>
                            </Heading>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={10} w="100%">
                            {steps.map((step, idx) => (
                                <VStack
                                    key={idx}
                                    spacing={6}
                                    align="center"
                                    textAlign="center"
                                    p={8}
                                    bg="bg.subtle"
                                    borderRadius="2xl"
                                    border="1px solid"
                                    borderColor="bg.muted"
                                    _hover={{ borderColor: 'brandOrange/30', transform: 'translateY(-5px)' }}
                                    transition="all 0.3s"
                                >
                                    <Box
                                        bg="brandOrange"
                                        color="white"
                                        p={5}
                                        borderRadius="2xl"
                                        boxShadow="0 8px 16px rgba(255, 107, 53, 0.2)"
                                    >
                                        <Icon as={step.icon} boxSize={8} />
                                    </Box>
                                    <VStack spacing={3}>
                                        <Heading size="md" color="fg">{step.title}</Heading>
                                        <Text color="fg.muted" lineHeight="tall">{step.text}</Text>
                                    </VStack>
                                </VStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default TrustSection
