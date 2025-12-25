import { Box, Flex, Text, Image } from '@chakra-ui/react'

const SafetyBanner = () => {
  const checkmarkSvg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjAuMCwgU1ZGIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA0NS40IDM3LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1LjQgMzcuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtmaWxsOiMwMEE2NTE7fQo8L3N0eWxlPgo8Zz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNS45LDI5LjNjLTIuNCwwLTQuMywxLjktNC4zLDQuM3MxLjksNC4zLDQuMyw0LjNjMi40LDAsNC4zLTEuOSw0LjMtNC4zUzE4LjMsMjkuMywxNS45LDI5LjN6IE0xNS45LDM1LjIKCQkJYy0wLjksMC0xLjctMC43LTEuNy0xLjdzMC43LTEuNywxLjctMS43YzAuOSwwLDEuNywwLjcsMS43LDEuN1MxNi44LDM1LjIsMTUuOSwzNS4yeiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNS40LDI5LjNjLTIuNCwwLTQuMywxLjktNC4zLDQuM3MxLjksNC4zLDQuMyw0LjNjMi40LDAsNC4zLTEuOSw0LjMtNC4zUzM3LjgsMjkuMywzNS40LDI5LjN6IE0zNS40LDM1LjIKCQkJYy0wLjksMC0xLjctMC43LTEuNy0xLjdzMC43LTEuNywxLjctMS43YzAuOSwwLDEuNywwLjcsMS43LDEuN1MzNi40LDM1LjIsMzUuNCwzNS4yeiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zLjQsMzIuNGg3LjNjMC4yLTEsMC43LTEuOCwxLjMtMi41SDMuNFYzMi40eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My44LDI5Ljl2LTguN2wtNi05LjdoLTkuN3YxOC4zaC04LjNjMC43LDAuNywxLjEsMS41LDEuMywyLjVoOS4yYzAuNS0yLjQsMi42LTQuMiw1LjItNC4yczQuNywxLjgsNS4yLDQuMgoJCQloNC44di0yLjVINDMuOHogTTMxLDIwLjF2LTUuN2g0LjVsNCw1LjdIMzF6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3LjMsOGMwLDEuMSwwLDIuMiwwLDMuNGMwLDcuNC05LjMsMTAuMi05LjMsMTAuMnMtMS41LDAtMywwdjYuNGgyMS40VjhIMTcuM3oiLz4KCTwvZz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNS43LDMuNEMxMi40LDMuNCw5LjYsMiw4LjYsMEg3LjFDNi4xLDIsMy4zLDMuNCwwLDMuNGMwLDIuMSwwLDUsMCw3LjdjMCw1LjQsOCw4LjUsOCw4LjVzNy43LTIuMyw3LjctOC41CgkJQzE1LjgsOC4xLDE1LjgsNS40LDE1LjcsMy40QzE1LjcsMy40LDE1LjcsMy40LDE1LjcsMy40eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LjUsNC40Yy0yLjgsMC01LjEtMS4yLTYtMi45SDcuM0M2LjQsMy4yLDQsNC40LDEuMyw0LjRjMCwxLjgsMCw0LjIsMCw2LjZjMCw0LjYsNi43LDcuMiw2LjcsNy4yCgkJczYuNS0yLDYuNS03LjJDMTQuNSw4LjQsMTQuNSw2LjEsMTQuNSw0LjRDMTQuNSw0LjQsMTQuNSw0LjQsMTQuNSw0LjR6Ii8+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNy4zLDEyLjJDNy4zLDEyLjIsNy4yLDEyLjIsNy4zLDEyLjJjLTAuMiwwLTAuNC0wLjEtMC42LTAuMkw0LjgsOS44Yy0wLjMtMC4zLTAuMy0wLjgsMC0xLjEKCQkJYzAuMy0wLjMsMC44LTAuMywxLjEsMGwxLjQsMS41bDIuNi0yLjdjMC4zLTAuMywwLjgtMC4zLDEuMSwwYzAuMywwLjMsMC4zLDAuOCwwLDEuMWwtMy4yLDMuM0M3LjcsMTIuMSw3LjUsMTIuMiw3LjMsMTIuMnoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K"

  return (
    <Box bg="brandRed" color="white" py={3} position="relative" zIndex={1000000}>
      <Box maxW="1200px" mx="auto" px={{ base: 0, md: 6 }}>
        <Flex justify="center" align="center" gap={4} px={{ base: 4, md: 0 }}>
          <Box flexShrink={0}>
            <Box w="65px" h="5px" borderRadius="2px" bg="rgba(255, 255, 255, 0.3)" mb={2} />
            <Box w="65px" h="5px" borderRadius="2px" bg="rgba(255, 255, 255, 0.3)" mb={2} ml={5} />
            <Box w="65px" h="5px" borderRadius="2px" bg="rgba(255, 255, 255, 0.3)" ml={2} />
          </Box>
          <Image src={checkmarkSvg} alt="Checkmark" w="60px" h="auto" flexShrink={0} />
          <Box textAlign="center" px={2}>
            <Text fontWeight="bold" mb={1} fontSize="16px">
              SAFE DELIVERY! Don't worry, the safety of our customers is very important to us!
            </Text>
            <Text fontSize="15px">
              Our couriers change masks every two hours. Delivery and payment are rendered without direct contact.
            </Text>
          </Box>
          <Box flexShrink={0}>
            <Box w="65px" h="5px" borderRadius="2px" bg="rgba(255, 255, 255, 0.3)" mb={2} />
            <Box w="65px" h="5px" borderRadius="2px" bg="rgba(255, 255, 255, 0.3)" mb={2} ml={5} />
            <Box w="65px" h="5px" borderRadius="2px" bg="rgba(255, 255, 255, 0.3)" ml={2} />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default SafetyBanner

