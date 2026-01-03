# EmailJS Setup Guide

## Why EmailJS?

EmailJS allows you to send emails directly from the frontend without a backend server. When configured, emails are automatically sent to all 3 recipients when forms are submitted.

## Setup Steps

### 1. Sign Up for EmailJS

1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free account available)
3. Verify your email address

### 2. Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. **Copy the Service ID** (you'll need this)

### 3. Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** Contact Form Template

**Subject:**
```
📧 New Contact Form - {{from_name}} ({{from_phone}})
```

**Content (HTML):**
```html
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">{{date}}</p>
    </div>
    <div class="content">
      <div class="section">
        <h3 style="color: #015CAF; margin-top: 0;">Contact Information</h3>
        <div class="info-row">
          <span class="label">Name:</span> {{from_name}}
        </div>
        <div class="info-row">
          <span class="label">Phone:</span> {{from_phone}}
        </div>
        <div class="info-row">
          <span class="label">Email:</span> {{from_email}}
        </div>
        <div class="info-row">
          <span class="label">Message:</span> {{message}}
        </div>
        <div class="info-row">
          <span class="label">Source:</span> {{source}}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

4. **Copy the Template ID** (you'll need this)

### 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy the Public Key**

### 5. Configure in Your Project

1. Create a `.env` file in the `client` directory (if it doesn't exist)
2. Add these variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. **Restart your Vite dev server** for the environment variables to take effect

### 6. Test

1. Submit the contact form
2. Check all 3 email inboxes - you should receive the email automatically!

## For Order Form

You'll need a second template for orders. Follow the same steps but use this template:

**Subject:**
```
🛒 New Order: {{product_name}} - {{from_name}} ({{from_phone}})
```

**Content:** Similar structure but include:
- `{{from_name}}`
- `{{from_phone}}`
- `{{from_email}}`
- `{{location}}`
- `{{address}}`
- `{{product_id}}`
- `{{product_name}}`
- `{{product_price}}`

Then update `client/src/utils/config.js` to include a second template ID for orders, or use the same template with conditional content.

## Free Tier Limits

- 200 emails per month (free tier)
- Perfect for testing and small projects
- Upgrade available if needed

## Troubleshooting

- **Emails not sending?** Check that all environment variables are set correctly
- **Template not working?** Make sure variable names match exactly (case-sensitive)
- **Service not connected?** Verify your email service is properly configured in EmailJS dashboard

