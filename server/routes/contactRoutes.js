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

// Contact form submission (for simplified order form)
router.post('/contact', async (req, res) => {
  try {
    const { name, phone, deliveryAddress, source } = req.body

    // Validate: name, phone, and deliveryAddress are required
    if (!name || !phone || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and delivery address are required'
      })
    }

    // Send email
    await sendContactEmail({
      name,
      phone: phone || '',
      deliveryAddress: deliveryAddress || '',
      source: source || 'order-form'
    })

    res.json({
      success: true,
      message: 'Order submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit order. Please try again later.'
    })
  }
})

// Order form submission
router.post('/orders', async (req, res) => {
  try {
    const { name, phone, productId, productName, price, email, address, location, deliveryAddress } = req.body

    // Validate required fields - for simplified order form, we need name, phone, and deliveryAddress
    if (!name || !phone || (!deliveryAddress && !location)) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and delivery address are required'
      })
    }

    // Fetch full product details if productId is provided
    let productDetails = null
    if (productId) {
      productDetails = getProductDetails(productId)
    }

    // Use deliveryAddress if provided, otherwise use location
    const finalAddress = deliveryAddress || location || address || 'Not provided'

    // Send email with full product information
    await sendOrderEmail({
      name,
      phone: phone || '',
      email: email || 'Not provided',
      location: location || finalAddress,
      address: finalAddress,
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

