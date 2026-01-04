export const config = {
  // EmailJS Configuration
  // Get these from https://www.emailjs.com/
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'goodsxyz_test_alex',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_839lsv5',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dEVhIHa6zuxqH7nKk',
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

