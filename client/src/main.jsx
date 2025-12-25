import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'

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
        brandGray: { value: '#474747' },
        brandLightGray: { value: '#efeee9' },
      },
      fonts: {
        body: { value: 'Arial, sans-serif' },
        heading: { value: 'Arial, sans-serif' },
      },
    },
  },
}

const system = createSystem(defaultConfig, customTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

