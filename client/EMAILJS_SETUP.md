# EmailJS Setup Instructions

The application now uses EmailJS to send emails directly from the frontend without requiring a backend server.

## Setup Steps

1. **Sign up for EmailJS**
   - Go to https://www.emailjs.com/
   - Create a free account

2. **Create an Email Service**
   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose "Gmail" as your service provider
   - Connect your Gmail account: `alexndegwa49@gmail.com`
   - Note down the **Service ID** (e.g., `service_xxxxx`)

3. **Create an Email Template**
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use the following template variables:
     - `{{from_name}}` - Sender name
     - `{{to_email}}` - Recipient emails
     - `{{customer_name}}` - Customer's name
     - `{{customer_phone}}` - Customer's phone number
     - `{{delivery_address}}` - Delivery address
     - `{{product_name}}` - Product name (for product orders)
     - `{{product_price}}` - Product price (for product orders)
     - `{{message}}` - Full message content
     - `{{subject}}` - Email subject
   
   Example template:
   ```
   Subject: {{subject}}
   
   {{message}}
   ```
   - Set "To Email" to: `wands.express@gmail.com,jwandera35@gmail.com`
   - Set "From Name" to: `alexndegwa49@gmail.com`
   - Note down the **Template ID** (e.g., `template_xxxxx`)

4. **Get your Public Key**
   - Go to "Account" → "General"
   - Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)

5. **Configure Environment Variables**
   - Create a `.env` file in the `client` directory
   - Add the following:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   - Replace the placeholder values with your actual IDs and key

6. **Restart the Development Server**
   - Stop your current dev server (Ctrl+C)
   - Run `npm run dev` again to load the new environment variables

## Email Configuration

The emails will be sent:
- **From:** alexndegwa49@gmail.com (configured in EmailJS service)
- **To:** wands.express@gmail.com, jwandera35@gmail.com (configured in the template)

## Testing

After setup, test the email functionality by:
1. Filling out the order form on the website
2. Submitting the form
3. Checking the recipient email inboxes for the order notification

## Troubleshooting

- If emails aren't sending, check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure the EmailJS service is connected to your Gmail account
- Check that the template variables match the ones used in the code
