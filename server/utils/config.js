import dotenv from 'dotenv'

dotenv.config()

export const config = {
  email: {
    // Multiple recipients for all emails
    recipients: [
      'wands.express@gmail.com',
      'alexndegwa49@gmail.com',
      'jwandera35@gmail.com'
    ],
    // Email service configuration
    // For Gmail, you'll need to use an App Password
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    // Alternative: SMTP configuration
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true' || false
  }
}

