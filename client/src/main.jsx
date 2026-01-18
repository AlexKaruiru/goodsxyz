import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode'
import './index.css'
import App from './App.jsx'
import { initEmailJS } from './utils/orderService'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#cce5ff' },
          200: { value: '#99cbff' },
          300: { value: '#66b1ff' },
          400: { value: '#3397ff' },
          500: { value: '#007dff' },
          600: { value: '#0064cc' },
          700: { value: '#004b99' },
          800: { value: '#003266' },
          900: { value: '#001933' },
        },
        accent: {
          50: { value: '#fff0e6' },
          100: { value: '#ffdecce' },
          200: { value: '#ffbe99' },
          300: { value: '#ff9d66' },
          400: { value: '#ff7d33' },
          500: { value: '#ff5c00' },
          600: { value: '#cc4a00' },
          700: { value: '#993700' },
          800: { value: '#662500' },
          900: { value: '#331200' },
        },
      },
      fonts: {
        body: { value: '"Inter", sans-serif' },
        heading: { value: '"Montserrat", sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { base: '{colors.white}', _dark: '#0f172a' }
          },
          subtle: {
            value: { base: '{colors.gray.50}', _dark: '#1e293b' }
          },
          muted: {
            value: { base: '{colors.gray.100}', _dark: '#334155' }
          }
        },
        fg: {
          DEFAULT: {
            value: { base: '{colors.gray.800}', _dark: '{colors.gray.100}' }
          },
          muted: {
            value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' }
          },
          subtle: {
            value: { base: '{colors.gray.400}', _dark: '{colors.gray.600}' }
          }
        },
        brandRed: { value: { base: '#FF0000', _dark: '#FF4D4D' } },
        brandOrange: { value: { base: '#FF6B35', _dark: '#FF8559' } },
        brandPurple: { value: { base: '#6B46C1', _dark: '#9F7AEA' } },
        brandBlue: { value: { base: '#015CAF', _dark: '#3182CE' } },
        brandGreen: { value: { base: '#35870d', _dark: '#48BB78' } },
        sectionTeal: { value: { base: '#D3E6E3', _dark: '#1a202c' } },
        sectionCyan: { value: { base: '#E6F8F8', _dark: '#171923' } },
        sectionYellowGreen: { value: { base: '#E5EBCA', _dark: '#2d3748' } },
        sectionPeach: { value: { base: '#FAD68C', _dark: '#c05621' } },
        sectionBeige: { value: { base: '#DFDDBF', _dark: '#2c313c' } },
      },
    },
  },
})

const system = createSystem(defaultConfig, customConfig)

// Initialize EmailJS
initEmailJS()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

