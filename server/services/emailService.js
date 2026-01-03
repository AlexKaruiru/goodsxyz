import nodemailer from 'nodemailer'
import { config } from '../utils/config.js'

// Create reusable transporter object
const createTransporter = () => {
  // If email user and password are provided, use them
  if (config.email.user && config.email.password) {
    return nodemailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    })
  }

  // Otherwise, use SMTP configuration
  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: config.email.user && config.email.password ? {
      user: config.email.user,
      pass: config.email.password
    } : undefined
  })
}

/**
 * Send contact form email
 */
export const sendContactEmail = async (data) => {
  const { name, phone, email, message, source } = data

  const transporter = createTransporter()

  // Create intelligent subject line
  const contactInfo = phone ? phone : (email ? email : 'No contact info')
  const subject = `📧 New Contact Form - ${name} (${contactInfo})`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #015CAF 0%, #FF6B35 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #015CAF; }
        h2 { margin-top: 0; }
        .info-row { margin: 8px 0; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">${new Date().toLocaleString()}</p>
        </div>
        <div class="content">
          <div class="section">
            <h3 style="color: #015CAF; margin-top: 0;">Contact Information</h3>
            <div class="info-row">
              <span class="label">Name:</span> 
              <span class="value">${name}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span> 
              <span class="value"><a href="tel:${phone}" style="color: #015CAF; text-decoration: none;">${phone}</a></span>
            </div>
            ${phone && phone !== '' ? `
            <div class="info-row">
              <span class="label">Phone:</span> 
              <span class="value"><a href="tel:${phone}" style="color: #015CAF; text-decoration: none;">${phone}</a></span>
            </div>
            ` : ''}
            ${email && email !== '' ? `
            <div class="info-row">
              <span class="label">Email:</span> 
              <span class="value"><a href="mailto:${email}" style="color: #015CAF; text-decoration: none;">${email}</a></span>
            </div>
            ` : ''}
            ${message && message !== '' ? `
            <div class="info-row" style="margin-top: 15px;">
              <span class="label">Message:</span> 
              <p class="value" style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Source:</span> 
              <span class="value">${source || 'contact-form'}</span>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: config.email.user || 'noreply@goodsxyz.com',
    to: config.email.recipients.join(', '), // Send to all recipients
    subject: subject,
    html: html,
    text: `
New Contact Form Submission - ${new Date().toLocaleString()}

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
${phone && phone !== '' ? `Phone: ${phone}\n` : ''}
${email && email !== '' ? `Email: ${email}\n` : ''}
${message && message !== '' ? `\nMessage:\n${message}\n` : ''}
Source: ${source || 'contact-form'}
    `
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Contact email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending contact email:', error)
    throw error
  }
}

/**
 * Send order email with full product details
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
    productImage,
    productBenefits,
    productIngredients
  } = data

  const transporter = createTransporter()

  // Create intelligent subject line
  const subject = `🛒 New Order: ${productName} - ${name} (${phone})`

  // Build product image HTML (using image URL or path)
  const productImageHtml = productImage 
    ? `<div style="text-align: center; margin: 20px 0;">
         <img src="${productImage.startsWith('http') ? productImage : `http://localhost:3000${productImage}`}" 
              alt="${productName}" 
              style="max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
       </div>`
    : ''

  // Build benefits list
  const benefitsHtml = productBenefits && productBenefits.length > 0
    ? `<div style="margin: 15px 0;">
         <h4 style="color: #015CAF; margin-bottom: 10px;">Benefits:</h4>
         <ul style="margin: 0; padding-left: 20px;">
           ${productBenefits.map(benefit => `<li style="margin: 5px 0;">${benefit}</li>`).join('')}
         </ul>
       </div>`
    : ''

  // Build ingredients list
  const ingredientsHtml = productIngredients && productIngredients.length > 0
    ? `<div style="margin: 15px 0;">
         <h4 style="color: #015CAF; margin-bottom: 10px;">Ingredients:</h4>
         <ul style="margin: 0; padding-left: 20px;">
           ${productIngredients.map(ingredient => `<li style="margin: 5px 0;">${ingredient}</li>`).join('')}
         </ul>
       </div>`
    : ''

  // Format price display
  const priceDisplay = originalPrice && originalPrice !== 'N/A' && price !== originalPrice
    ? `<p style="margin: 5px 0;"><strong>Price:</strong> <span style="color: #FF6B35; font-size: 18px; font-weight: bold;">${price} KSh</span> <span style="color: #999; text-decoration: line-through;">${originalPrice} KSh</span> <span style="color: #FF6B35;">(${discount}% OFF)</span></p>`
    : `<p style="margin: 5px 0;"><strong>Price:</strong> <span style="color: #FF6B35; font-size: 18px; font-weight: bold;">${price} KSh</span></p>`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #015CAF 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #FF6B35; }
        .product-section { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border: 2px solid #015CAF; }
        h2 { margin-top: 0; }
        h3 { color: #015CAF; border-bottom: 2px solid #FF6B35; padding-bottom: 5px; }
        .info-row { margin: 8px 0; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">🛒 New Order Received</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">${new Date().toLocaleString()}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>👤 Customer Information</h3>
            <div class="info-row">
              <span class="label">Name:</span> 
              <span class="value">${name}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span> 
              <span class="value"><a href="tel:${phone}" style="color: #015CAF; text-decoration: none;">${phone}</a></span>
            </div>
            ${phone && phone !== '' ? `
            <div class="info-row">
              <span class="label">Phone:</span> 
              <span class="value"><a href="tel:${phone}" style="color: #015CAF; text-decoration: none;">${phone}</a></span>
            </div>
            ` : ''}
            ${email && email !== 'Not provided' && email !== '' ? `
            <div class="info-row">
              <span class="label">Email:</span> 
              <span class="value"><a href="mailto:${email}" style="color: #015CAF; text-decoration: none;">${email}</a></span>
            </div>
            ` : ''}
            ${location && location !== 'Not provided' ? `
            <div class="info-row">
              <span class="label">Location:</span> 
              <span class="value">${location}</span>
            </div>
            ` : ''}
            ${address && address !== 'Not provided' && address !== '' ? `
            <div class="info-row">
              <span class="label">Detailed Address:</span> 
              <span class="value">${address}</span>
            </div>
            ` : ''}
          </div>

          <div class="product-section">
            <h3>📦 Product Details</h3>
            ${productImageHtml}
            <div class="info-row">
              <span class="label">Product ID:</span> 
              <span class="value">${productId}</span>
            </div>
            <div class="info-row">
              <span class="label">Product Name:</span> 
              <span class="value" style="font-size: 18px; font-weight: bold; color: #015CAF;">${productName}</span>
            </div>
            ${productDescription && productDescription !== 'N/A' ? `
            <div class="info-row" style="margin-top: 15px;">
              <span class="label">Description:</span> 
              <p class="value" style="margin: 5px 0;">${productDescription}</p>
            </div>
            ` : ''}
            ${priceDisplay}
            ${benefitsHtml}
            ${ingredientsHtml}
          </div>

          <div class="footer">
            <p>This is an automated email from Goodsxyz Order System</p>
            <p>Please contact the customer to confirm the order and arrange delivery.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
New Order Received - ${new Date().toLocaleString()}

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
${phone && phone !== '' ? `Phone: ${phone}\n` : ''}
${email && email !== 'Not provided' && email !== '' ? `Email: ${email}\n` : ''}
${location && location !== 'Not provided' ? `Location: ${location}\n` : ''}
${address && address !== 'Not provided' && address !== '' ? `Detailed Address: ${address}\n` : ''}

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Product ID: ${productId}
Product Name: ${productName}
${productDescription && productDescription !== 'N/A' ? `Description: ${productDescription}\n` : ''}
Price: ${price} KSh
${originalPrice && originalPrice !== 'N/A' && price !== originalPrice ? `Original Price: ${originalPrice} KSh (${discount}% OFF)\n` : ''}
${productBenefits && productBenefits.length > 0 ? `\nBenefits:\n${productBenefits.map(b => `  • ${b}`).join('\n')}\n` : ''}
${productIngredients && productIngredients.length > 0 ? `\nIngredients:\n${productIngredients.map(i => `  • ${i}`).join('\n')}\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please contact the customer to confirm the order and arrange delivery.
  `

  const mailOptions = {
    from: config.email.user || 'noreply@goodsxyz.com',
    to: config.email.recipients.join(', '), // Send to all recipients
    subject: subject,
    html: html,
    text: text
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Order email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending order email:', error)
    throw error
  }
}

