import emailjs from '@emailjs/browser'
import { config } from './config'

/**
 * Initialize EmailJS (call this once when app loads)
 */
export const initEmailJS = () => {
  if (config.emailjs.publicKey && config.emailjs.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(config.emailjs.publicKey)
  }
}

/**
 * Submit order form (simplified order form)
 * @param {Object} formData - Form data containing name, phone, deliveryAddress
 * @returns {Promise<Object>} Success response
 */
export const submitOrderForm = async (formData) => {
  try {
    const { name, phone, deliveryAddress, source } = formData

    // Prepare email template parameters
    // Note: Recipient emails should be configured in the EmailJS template settings
    const templateParams = {
      from_name: config.email.from,
      customer_name: name,
      customer_phone: phone,
      delivery_address: deliveryAddress,
      source: source || 'order-form',
      subject: `New Order from ${name}`,
      message: `
New Order Request

Customer Information:
- Name: ${name}
- Phone: ${phone}
- Delivery Address: ${deliveryAddress}
- Source: ${source || 'order-form'}

ACTION REQUIRED: Please contact the customer at ${phone} to confirm the order and arrange delivery.
      `.trim()
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      templateParams
    )

    if (response.status === 200) {
      return { success: true, message: 'Order submitted successfully' }
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error submitting order form:', error)
    throw new Error(error.text || error.message || 'Failed to submit order. Please try again.')
  }
}

/**
 * Submit order with product details
 * @param {Object} orderData - Order data containing name, phone, email, location, product info
 * @returns {Promise<Object>} Success response
 */
export const submitOrder = async (orderData) => {
  try {
    const { name, phone, email, location, address, deliveryAddress, productId, productName, price, originalPrice, discount } = orderData

    // Prepare email template parameters
    // Note: Recipient emails should be configured in the EmailJS template settings
    const templateParams = {
      from_name: config.email.from,
      customer_name: name,
      customer_phone: phone,
      customer_email: email || 'Not provided',
      delivery_address: deliveryAddress || address || location || 'Not provided',
      product_id: productId || 'N/A',
      product_name: productName || 'N/A',
      product_price: price ? `${price.toLocaleString()} KES` : 'N/A',
      original_price: originalPrice ? `${originalPrice.toLocaleString()} KES` : 'N/A',
      discount: discount ? `${discount}%` : 'N/A',
      subject: `New Product Order: ${productName || 'Product'} from ${name}`,
      message: `
New Product Order

CUSTOMER INFORMATION:
- Name: ${name}
- Phone: ${phone}
- Email: ${email || 'Not provided'}
- Delivery Address: ${deliveryAddress || address || location || 'Not provided'}

ORDER DETAILS:
- Product Name: ${productName || 'N/A'}
- Product ID: ${productId || 'N/A'}
- Price: ${price ? `${price.toLocaleString()} KES` : 'N/A'}
- Original Price: ${originalPrice ? `${originalPrice.toLocaleString()} KES` : 'N/A'}
- Discount: ${discount ? `${discount}%` : 'N/A'}

ACTION REQUIRED: Please contact the customer at ${phone} to confirm the order and arrange delivery.
      `.trim()
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      templateParams
    )

    if (response.status === 200) {
      return { success: true, message: 'Order submitted successfully' }
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error submitting order:', error)
    throw new Error(error.text || error.message || 'Failed to submit order. Please try again.')
  }
}

