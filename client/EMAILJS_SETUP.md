# EmailJS Setup Guide for SupleeHub

Complete guide for setting up EmailJS email notifications for order forms.

## Overview

EmailJS allows you to send emails directly from the frontend without requiring a backend server. The application uses a simple HTML passthrough template approach where HTML content is generated in code and passed through the template.

## Setup Steps

### 1. Sign Up for EmailJS

- Go to https://www.emailjs.com/
- Create a free account

### 2. Create an Email Service

- Go to "Email Services" in the dashboard
- Click "Add New Service"
- Choose "Gmail" as your service provider
- Connect your Gmail account: `alexndegwa49@gmail.com`
- Note down the **Service ID** (e.g., `service_xxxxx`)

### 3. Create an Email Template

Go to "Email Templates" in the dashboard and click "Create New Template".

#### Template Settings

- **Template Name**: `order_notification` (or any name)
- **Service**: Select your service (e.g., `SupleeHub_test_alex`)
- **To Email**: `wands.express@gmail.com,jwandera35@gmail.com` (comma-separated for multiple recipients)
- **From Name**: `SupleeHub`
- **Reply To**: (optional, leave empty or set to your email)

#### Template Content

**Subject Field:**
```
{{subject}}
```

**Content/Body Field:**
```
{{{html_message}}}
```

**Important:** Use **triple curly brackets** `{{{html_message}}}` (not double) to render HTML directly without escaping.

#### How It Works

- Your code generates all the HTML content in the `html_message` parameter
- The template uses `{{{html_message}}}` to render it directly
- The template acts as a simple passthrough wrapper
- All formatting and content comes from your code

### 4. Get Your Public Key

- Go to "Account" → "General"
- Find your **Public Key** (e.g., `dEVhIHa6zuxqH7nKk`)

### 5. Configure Environment Variables

Create a `.env` file in the `client` directory and add:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual IDs and key from steps 2, 3, and 4.

### 6. Restart the Development Server

- Stop your current dev server (Ctrl+C)
- Run `npm run dev` again to load the new environment variables

## Email Configuration

The emails will be sent:
- **From:** alexndegwa49@gmail.com (configured in EmailJS service)
- **To:** wands.express@gmail.com, jwandera35@gmail.com (configured in the template)
- **From Name:** SupleeHub

## Available Template Variables

The code sends these variables that can be used in templates:

### For Simple Order Form:
- `{{from_name}}` - Sender name (SupleeHub)
- `{{customer_name}}` - Customer's name
- `{{customer_phone}}` - Customer's phone number
- `{{delivery_address}}` - Delivery address
- `{{source}}` - Source of order (e.g., 'order-form')
- `{{subject}}` - Email subject
- `{{html_message}}` - HTML formatted message (use `{{{html_message}}}` with triple brackets)

### For Product Order:
- All above variables, plus:
- `{{customer_email}}` - Customer's email
- `{{product_id}}` - Product ID
- `{{product_name}}` - Product name
- `{{product_price}}` - Product price (formatted)
- `{{original_price}}` - Original price (formatted)
- `{{discount}}` - Discount percentage

## Testing

After setup, test the email functionality by:
1. Filling out the order form on the website
2. Submitting the form
3. Checking the recipient email inboxes for the order notification

## Troubleshooting

- **"Recipients address is empty" error**: Make sure the "To Email" field in your EmailJS template is set correctly
- **Emails aren't sending**: Check the browser console for error messages
- **Template variables not working**: Verify you're using triple brackets `{{{html_message}}}` for HTML content
- **Environment variables not loading**: Restart the dev server after creating/updating `.env` file
- **Service connection issues**: Ensure the EmailJS service is connected to your Gmail account

## Template Variable Syntax

- **Double brackets** `{{variable}}` = HTML escaped (plain text)
- **Triple brackets** `{{{variable}}}` = HTML rendered directly (use for HTML content)

## References

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Creating Email Templates](https://www.emailjs.com/docs/user-guide/creating-email-templates/)
- [Dynamic Variables](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/)
- [React Examples](https://www.emailjs.com/docs/examples/reactjs/)
