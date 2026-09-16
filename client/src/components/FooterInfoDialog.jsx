import { Box, Button, CloseButton, Dialog, Heading, Portal, VStack, Text } from '@chakra-ui/react'

// Shared presentation for every footer link that opens a dialog instead of navigating
// (Footer.jsx). See utils/footerContent.js for the actual copy - kept generic
// (eyebrow/title/updated/sections) so a new footer entry just needs a content object and an icon.
const FooterInfoDialog = ({ isOpen, onClose, icon: Icon, eyebrow = 'Info', content }) => {
  if (!content) return null
  const { title, updated, sections } = content

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="center" size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={4}>
          <Dialog.Content
            maxW={{ base: '100%', md: '2xl' }}
            maxH="85vh"
            bg="bg"
            borderRadius="3xl"
            border="1px solid"
            borderColor="bg.muted"
            boxShadow="2xl"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Dialog.Header
              position="relative"
              bg="bg.subtle"
              borderBottom="1px solid"
              borderColor="bg.muted"
              px={{ base: 6, md: 8 }}
              py={{ base: 5, md: 6 }}
            >
              <VStack align="start" gap={3}>
                <Box display="flex" alignItems="center" gap={3}>
                  {Icon && (
                    <Box
                      flexShrink={0}
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg="brandOrange/10"
                      color="brandOrange"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon size={18} />
                    </Box>
                  )}
                  <Box>
                    <Text fontSize="xs" fontWeight="extrabold" color="brandOrangeCta" textTransform="uppercase" letterSpacing="widest">
                      {eyebrow}
                    </Text>
                    <Dialog.Title fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="900" color="fg">
                      {title}
                    </Dialog.Title>
                  </Box>
                </Box>
                {updated && (
                  <Text fontSize="xs" color="fg.subtle">
                    Last updated {new Date().getFullYear()}
                  </Text>
                )}
              </VStack>
              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top="5" right="5" size="sm" borderRadius="full" aria-label={`Close ${title}`} />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body px={{ base: 6, md: 8 }} py={{ base: 6, md: 7 }} overflowY="auto">
              <VStack align="stretch" gap={6}>
                {sections.map((section, i) => (
                  <Box key={i}>
                    <Heading as="h3" fontFamily="heading" fontSize="sm" fontWeight="800" color="fg" mb={2}>
                      {section.heading}
                    </Heading>
                    <VStack align="stretch" gap={2}>
                      {section.paragraphs.map((p, j) => (
                        <Text key={j} fontSize="sm" color="fg.muted" lineHeight="tall">
                          {p}
                        </Text>
                      ))}
                    </VStack>
                    {section.list && (
                      <Box as="ul" mt={2} pl={5} css={{ listStyleType: 'disc' }}>
                        {section.list.map((item, k) => (
                          <Box as="li" key={k} fontSize="sm" color="fg.muted" lineHeight="tall" mb={1}>
                            {item}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </VStack>
            </Dialog.Body>

            <Dialog.Footer bg="bg.subtle" borderTop="1px solid" borderColor="bg.muted" px={{ base: 6, md: 8 }} py={4}>
              <Button
                onClick={onClose}
                bg="brandOrange"
                color="white"
                size="sm"
                borderRadius="full"
                px={6}
                fontWeight="bold"
                _hover={{ bg: 'brandOrange', transform: 'translateY(-1px)', boxShadow: 'md' }}
                transition="all 0.2s"
              >
                Got it
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default FooterInfoDialog
