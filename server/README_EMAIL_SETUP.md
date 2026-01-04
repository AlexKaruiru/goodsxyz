# Email Setup Instructions

This application uses Nodemailer to send emails when contact forms or orders are submitted.

## Configuration

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your email configuration.

## Gmail Setup (Recommended)

If you're using Gmail, you'll need to:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the generated password

3. Update your `.env` file:
   ```env
   RECIPIENT_EMAIL=alexndegwa49@gmail.com
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   ```

## Alternative: SMTP Configuration

If you're using a different email provider, configure SMTP settings:

```env
RECIPIENT_EMAIL=alexndegwa49@gmail.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@your-provider.com
EMAIL_PASSWORD=your-password
```

## Testing

After configuration, restart the server and test the contact form. Emails will be sent to the `RECIPIENT_EMAIL` address.

## Troubleshooting

- **Authentication failed**: Make sure you're using an App Password for Gmail, not your regular password
- **Connection timeout**: Check your SMTP host and port settings
- **Email not received**: Check spam folder and verify the recipient email address




