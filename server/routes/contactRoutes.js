import express from 'express'
import { sendContactEmail, sendOrderEmail } from '../services/emailService.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// Helper function to get product details
const getProductDetails = (productId) => {
  try {
    const productsPath = join(__dirname, '../../client/src/utils/products.json')
    const productsData = JSON.parse(readFileSync(productsPath, 'utf8'))
    return productsData.find(p => p.id === productId) || null
  } catch (error) {
    console.error('Error reading products:', error)
    return null
  }
}

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, message, source } = req.body

    // Validate: name is required, and at least phone or email must be provided
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      })
    }

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: 'At least phone or email must be provided'
      })
    }

    // Send email
    await sendContactEmail({
      name,
      phone: phone || '',
      email: email || '',
      message: message || '',
      source: source || 'contact-form'
    })

    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    })
  }
})

// Order form submission
router.post('/orders', async (req, res) => {
  try {
    const { name, phone, productId, productName, price, email, address } = req.body

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required'
      })
    }

    // Fetch full product details if productId is provided
    let productDetails = null
    if (productId) {
      productDetails = getProductDetails(productId)
    }

    // Send email with full product information
    await sendOrderEmail({
      name,
      phone: phone || '',
      email: email || 'Not provided',
      location: req.body.location || 'Not provided',
      address: address || 'Not provided',
      productId: productId || 'N/A',
      productName: productName || productDetails?.name || 'N/A',
      productDescription: productDetails?.description || 'N/A',
      price: price || productDetails?.price || 'N/A',
      originalPrice: productDetails?.originalPrice || 'N/A',
      discount: productDetails?.discount || 'N/A',
      productImage: productDetails?.image || null,
      productBenefits: productDetails?.benefits || [],
      productIngredients: productDetails?.ingredients || []
    })

    res.json({
      success: true,
      message: 'Order submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit order. Please try again later.'
    })
  }
})

export default router

