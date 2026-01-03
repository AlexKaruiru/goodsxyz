import { config } from './config'
import emailjs from '@emailjs/browser'

/**
 * Submit contact form (Frontend-only using EmailJS or mailto fallback)
 * @param {Object} formData - Form data containing name, phone, email, message
 * @returns {Promise<Object>} Success response
 */
export const submitContactForm = async (formData) => {
  try {
    const { name, phone, email, message, source } = formData

    // Try EmailJS first if configured
    if (config.emailjs.serviceId && config.emailjs.templateId && config.emailjs.publicKey) {
      try {
        // Send email to each recipient
        const emailPromises = config.emailRecipients.map(recipient =>
          emailjs.send(
            config.emailjs.serviceId,
            config.emailjs.templateId,
            {
              from_name: name,
              from_phone: phone || 'Not provided',
              from_email: email || 'Not provided',
              message: message || 'No message provided',
              source: source || 'contact-form',
              to_email: recipient
            },
            config.emailjs.publicKey
          )
        )
        
        await Promise.all(emailPromises)
        return { success: true, message: 'Contact form submitted successfully to all recipients' }
      } catch (emailjsError) {
        console.warn('EmailJS failed, using mailto fallback:', emailjsError)
        // Fall through to mailto
      }
    }

    // Fallback to mailto link (opens user's email client)
    // Note: mailto can only send to one recipient directly, but we can use CC for others
    const subject = encodeURIComponent(`Contact Form Submission from ${name}`)
    const body = encodeURIComponent(
      `Contact Form Submission\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Email: ${email || 'Not provided'}\n` +
      `Message: ${message || 'No message provided'}\n` +
      `Source: ${source || 'contact-form'}\n\n` +
      `---\n` +
      `Please ensure this email is sent to all recipients: ${config.emailRecipients.join(', ')}`
    )
    
    // Create mailto link with first recipient as TO and others as CC
    const toEmail = config.emailRecipients[0]
    const ccEmails = config.emailRecipients.slice(1).join(',')
    const mailtoLink = `mailto:${toEmail}${ccEmails ? `?cc=${encodeURIComponent(ccEmails)}` : ''}&subject=${subject}&body=${body}`
    
    // Open mailto link (this will open user's default email client)
    window.location.href = mailtoLink
    
    // Return success (user will manually send the email)
    return { success: true, message: 'Email client opened with all recipients. Please send the email to complete your submission.' }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw new Error('Failed to submit contact form. Please try again.')
  }
}

/**
 * Submit order form (Frontend-only using EmailJS or mailto fallback)
 * @param {Object} orderData - Order data containing name, phone, email, location, product info
 * @returns {Promise<Object>} Success response
 */
export const submitOrder = async (orderData) => {
  try {
    const { name, phone, email, location, address, productId, productName, price } = orderData

    // Try EmailJS first if configured
    if (config.emailjs.serviceId && config.emailjs.templateId && config.emailjs.publicKey) {
      try {
        // Send email to each recipient
        const emailPromises = config.emailRecipients.map(recipient =>
          emailjs.send(
            config.emailjs.serviceId,
            config.emailjs.templateId,
            {
              from_name: name,
              from_phone: phone || 'Not provided',
              from_email: email || 'Not provided',
              location: location,
              address: address || 'Not provided',
              product_id: productId || 'N/A',
              product_name: productName || 'N/A',
              product_price: price ? `${price.toLocaleString()} KSh` : 'N/A',
              to_email: recipient
            },
            config.emailjs.publicKey
          )
        )
        
        await Promise.all(emailPromises)
        return { success: true, message: 'Order submitted successfully to all recipients' }
      } catch (emailjsError) {
        console.warn('EmailJS failed, using mailto fallback:', emailjsError)
        // Fall through to mailto
      }
    }

    // Fallback to mailto link
    // Note: mailto can only send to one recipient directly, but we can use CC for others
    const subject = encodeURIComponent(`New Order: ${productName} - ${name}`)
    const body = encodeURIComponent(
      `New Product Order\n\n` +
      `CUSTOMER INFORMATION:\n` +
      `Name: ${name}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Email: ${email || 'Not provided'}\n` +
      `Location: ${location}\n` +
      `Address: ${address || 'Not provided'}\n\n` +
      `ORDER DETAILS:\n` +
      `Product ID: ${productId || 'N/A'}\n` +
      `Product Name: ${productName || 'N/A'}\n` +
      `Price: ${price ? `${price.toLocaleString()} KSh` : 'N/A'}\n\n` +
      `---\n` +
      `Please ensure this email is sent to all recipients: ${config.emailRecipients.join(', ')}`
    )
    
    // Create mailto link with first recipient as TO and others as CC
    const toEmail = config.emailRecipients[0]
    const ccEmails = config.emailRecipients.slice(1).join(',')
    const mailtoLink = `mailto:${toEmail}${ccEmails ? `?cc=${encodeURIComponent(ccEmails)}` : ''}&subject=${subject}&body=${body}`
    window.location.href = mailtoLink
    
    return { success: true, message: 'Email client opened with all recipients. Please send the email to complete your order.' }
  } catch (error) {
    console.error('Error submitting order:', error)
    throw new Error('Failed to submit order. Please try again.')
  }
}

