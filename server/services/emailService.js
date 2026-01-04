import nodemailer from 'nodemailer'

// Create transporter with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alexndegwa49@gmail.com',
    pass: 'huumwjugrxugghzq',
  },
})

// Email recipients
const emailRecipients = [
  'wands.express@gmail.com',
  'jwandera35@gmail.com'
]

/**
 * Send contact form email
 * @param {Object} data - Contact form data
 */
export const sendContactEmail = async (data) => {
  const { name, phone, deliveryAddress, source } = data

  const mailOptions = {
    from: 'alexndegwa49@gmail.com',
    to: emailRecipients.join(', '), // Send to all recipients
    subject: `New Order from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B35;">New Order Request</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Delivery Address:</strong> ${deliveryAddress || 'Not provided'}</p>
          <p><strong>Source:</strong> ${source || 'order-form'}</p>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>ACTION REQUIRED:</strong> Please contact the customer at ${phone || 'the phone number provided'} to confirm the order and arrange delivery.</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This email was sent from the Goodsxyz website order form.
        </p>
      </div>
    `,
    text: `
New Order Request

CUSTOMER INFORMATION:
Name: ${name}
Phone: ${phone || 'Not provided'}
Delivery Address: ${deliveryAddress || 'Not provided'}
Source: ${source || 'order-form'}

ACTION REQUIRED: Please contact the customer at ${phone || 'the phone number provided'} to confirm the order and arrange delivery.

This email was sent from the Goodsxyz website order form.
    `
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Contact email sent:', info.response)
    return info
  } catch (error) {
    console.error('Error sending contact email:', error)
    throw error
  }
}

/**
 * Send order email with product details
 * @param {Object} data - Order data with product information
 */
export const sendOrderEmail = async (data) => {
  const {
    name,
    phone,
    email,
    location,
    address,
    productId,
    productName,
    productDescription,
    price,
    originalPrice,
    discount,
    productBenefits,
    productIngredients
  } = data

  const mailOptions = {
    from: 'alexndegwa49@gmail.com',
    to: emailRecipients.join(', '), // Send to all recipients
    subject: `New Order: ${productName} - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B35;">New Product Order</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Location:</strong> ${location || 'Not provided'}</p>
          <p><strong>Address:</strong> ${address || 'Not provided'}</p>
        </div>
        
        <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Order Details</h3>
          <p><strong>Product ID:</strong> ${productId || 'N/A'}</p>
          <p><strong>Product Name:</strong> ${productName || 'N/A'}</p>
          ${productDescription ? `<p><strong>Description:</strong> ${productDescription}</p>` : ''}
          <p><strong>Price:</strong> ${price ? `${price.toLocaleString()} KES` : 'N/A'}</p>
          ${originalPrice ? `<p><strong>Original Price:</strong> ${originalPrice.toLocaleString()} KES</p>` : ''}
          ${discount ? `<p><strong>Discount:</strong> ${discount}%</p>` : ''}
          
          ${productBenefits && productBenefits.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Benefits:</strong>
              <ul>
                ${productBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${productIngredients && productIngredients.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Ingredients:</strong>
              <ul>
                ${productIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>ACTION REQUIRED:</strong> Please contact the customer at ${phone || 'the phone number provided'} to confirm the order and arrange delivery.</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This email was sent from the Goodsxyz website order form.
        </p>
      </div>
    `,
    text: `
New Product Order

CUSTOMER INFORMATION:
Name: ${name}
Phone: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}
Location: ${location || 'Not provided'}
Address: ${address || 'Not provided'}

ORDER DETAILS:
Product ID: ${productId || 'N/A'}
Product Name: ${productName || 'N/A'}
${productDescription ? `Description: ${productDescription}\n` : ''}
Price: ${price ? `${price.toLocaleString()} KES` : 'N/A'}
${originalPrice ? `Original Price: ${originalPrice.toLocaleString()} KES\n` : ''}
${discount ? `Discount: ${discount}%\n` : ''}

${productBenefits && productBenefits.length > 0 ? `Benefits:\n${productBenefits.map(b => `- ${b}`).join('\n')}\n` : ''}
${productIngredients && productIngredients.length > 0 ? `Ingredients:\n${productIngredients.map(i => `- ${i}`).join('\n')}\n` : ''}

ACTION REQUIRED: Please contact the customer at ${phone || 'the phone number provided'} to confirm the order and arrange delivery.

This email was sent from the Goodsxyz website order form.
    `
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Order email sent:', info.response)
    return info
  } catch (error) {
    console.error('Error sending order email:', error)
    throw error
  }
}
