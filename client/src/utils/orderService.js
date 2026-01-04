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

    // Prepare email template parameters for HTML email
    // Note: Recipient emails should be configured in the EmailJS template settings
    // The template in EmailJS dashboard should be HTML format
    const templateParams = {
      from_name: 'SupleeHub', // Display name, not email address
      to_email: config.email.recipients.join(','), // Recipient emails (comma-separated)
      customer_name: name,
      customer_phone: phone,
      delivery_address: deliveryAddress,
      source: source || 'order-form',
      subject: `New Order from ${name}`,
      // Plain text version (fallback)
      message: `
New Order Request

Customer Information:
- Name: ${name}
- Phone: ${phone}
- Delivery Address: ${deliveryAddress}
- Source: ${source || 'order-form'}

ACTION REQUIRED: Please contact the customer at ${phone} to confirm the order and arrange delivery.
      `.trim(),
      // HTML version - this will be used if template is HTML
      html_message: `
        <h2 style="color: #FF6B35;">New Order Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
          <p><strong>Source:</strong> ${source || 'order-form'}</p>
        </div>
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>ACTION REQUIRED:</strong> Please contact the customer at ${phone} to confirm the order and arrange delivery.</p>
        </div>
      `
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

    // Prepare email template parameters for HTML email
    // Note: Recipient emails should be configured in the EmailJS template settings
    // The template in EmailJS dashboard should be HTML format
    const templateParams = {
      from_name: 'SupleeHub', // Display name, not email address
      to_email: config.email.recipients.join(','), // Recipient emails (comma-separated)
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
      // Plain text version (fallback)
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
      `.trim(),
      // HTML version - this will be used if template is HTML
      html_message: `
        <h2 style="color: #FF6B35;">New Product Order</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Delivery Address:</strong> ${deliveryAddress || address || location || 'Not provided'}</p>
        </div>
        <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Order Details</h3>
          <p><strong>Product Name:</strong> ${productName || 'N/A'}</p>
          <p><strong>Product ID:</strong> ${productId || 'N/A'}</p>
          <p><strong>Price:</strong> <span style="color: #FF6B35; font-weight: bold; font-size: 18px;">${price ? `${price.toLocaleString()} KES` : 'N/A'}</span></p>
          ${originalPrice ? `<p><strong>Original Price:</strong> <span style="text-decoration: line-through; color: #999;">${originalPrice.toLocaleString()} KES</span></p>` : ''}
          ${discount ? `<p><strong>Discount:</strong> <span style="color: #28a745; font-weight: bold;">${discount}%</span></p>` : ''}
        </div>
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>ACTION REQUIRED:</strong> Please contact the customer at ${phone} to confirm the order and arrange delivery.</p>
        </div>
      `
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

