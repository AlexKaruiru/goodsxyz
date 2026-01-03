export const config = {
  // Email recipients (for frontend-only email service)
  emailRecipients: [
    'wands.express@gmail.com',
    'alexndegwa49@gmail.com',
    'jwandera35@gmail.com'
  ],
  // EmailJS configuration (optional - for frontend email sending)
  // To use EmailJS, sign up at https://www.emailjs.com/ and get your credentials
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  }
}

