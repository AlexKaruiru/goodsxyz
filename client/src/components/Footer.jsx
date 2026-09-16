import { useState } from 'react'
import { Box, Container, Text, HStack, VStack } from '@chakra-ui/react'
import { TbInfoCircle, TbFileText, TbShieldCheck, TbCookie } from 'react-icons/tb'
import FooterInfoDialog from './FooterInfoDialog'
import { ABOUT_US, TERMS_OF_SERVICE, PRIVACY_POLICY, COOKIES_POLICY } from '../utils/footerContent'

const FOOTER_LINKS = [
  { key: 'terms', label: 'Terms & Conditions', icon: TbFileText, content: TERMS_OF_SERVICE, eyebrow: 'Legal' },
  { key: 'privacy', label: 'Privacy Policy', icon: TbShieldCheck, content: PRIVACY_POLICY, eyebrow: 'Legal' },
  { key: 'cookies', label: 'Cookie Policy', icon: TbCookie, content: COOKIES_POLICY, eyebrow: 'Legal' },
  { key: 'about', label: 'About Us', icon: TbInfoCircle, content: ABOUT_US, eyebrow: 'Company' },
]

const Footer = () => {
  const [openKey, setOpenKey] = useState(null)
  const activeLink = FOOTER_LINKS.find((l) => l.key === openKey)

  return (
    <Box as="footer" bg="bg" py={12} borderTop="1px solid" borderColor="bg.muted">
      <Container maxW="1200px" px={6} mx="auto">
        <VStack gap={8} align="center">
          <VStack gap={4} align="center">
            <Box fontWeight="900" fontSize="2xl" color="brandOrange">
              SupleeHub
            </Box>
            <Text fontSize="sm" color="fg.muted" textAlign="center" maxW="600px">
              Your trusted partner for premium natural wellness solutions. Dedicated to improving your quality of life through science-backed nutrition.
            </Text>
          </VStack>

          <HStack gap={6} fontSize="sm" color="fg.muted" flexWrap="wrap" justify="center">
            {FOOTER_LINKS.map((link) => (
              <Text
                key={link.key}
                as="button"
                type="button"
                onClick={() => setOpenKey(link.key)}
                cursor="pointer"
                color="fg.muted"
                _hover={{ color: 'brandOrange' }}
                transition="color 0.2s"
              >
                {link.label}
              </Text>
            ))}
          </HStack>

          <VStack gap={4} w="100%">
            <Box w="100%" h="1px" bg="bg.muted" />
            <Text fontSize="xs" color="fg.subtle" textAlign="center" maxW="800px">
              &copy; {new Date().getFullYear()} SupleeHub. All rights reserved.
              By interacting with this site, you agree to our terms of service.
            </Text>
          </VStack>
        </VStack>
      </Container>

      <FooterInfoDialog
        isOpen={!!activeLink}
        onClose={() => setOpenKey(null)}
        icon={activeLink?.icon}
        eyebrow={activeLink?.eyebrow}
        content={activeLink?.content}
      />
    </Box>
  )
}

export default Footer
