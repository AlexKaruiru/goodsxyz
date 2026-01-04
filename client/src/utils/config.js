export const config = {
  // EmailJS Configuration
  // Get these from https://www.emailjs.com/
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  },
  // Email configuration
  email: {
    from: 'alexndegwa49@gmail.com',
    recipients: [
      'wands.express@gmail.com',
      'jwandera35@gmail.com'
    ]
  }
}

