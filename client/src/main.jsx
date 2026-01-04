import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import { initEmailJS } from './utils/orderService'

const customTheme = {
  theme: {
    tokens: {
      colors: {
        brandRed: { value: '#FF0000' },
        brandOrange: { value: '#FF6B35' },
        brandPurple: { value: '#6B46C1' },
        brandBlue: { value: '#015CAF' },
        brandGreen: { value: '#35870d' },
        brandWhite: { value: '#FFFFFF' },
        brandGray: { value: '#4B4B4B' },
        brandLightGray: { value: '#efeee9' },
        sectionTeal: { value: '#D3E6E3' },
        sectionCyan: { value: '#E6F8F8' },
        sectionYellowGreen: { value: '#E5EBCA' },
        sectionPeach: { value: '#FAD68C' },
        sectionBeige: { value: '#DFDDBF' },
      },
      fonts: {
        body: { value: '"Open Sans", sans-serif' },
        heading: { value: '"Open Sans", sans-serif' },
      },
    },
  },
}

const system = createSystem(defaultConfig, customTheme)

// Initialize EmailJS
initEmailJS()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

