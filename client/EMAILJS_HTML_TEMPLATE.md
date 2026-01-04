# EmailJS HTML Email Template Setup

## Overview

EmailJS supports HTML emails! The HTML content is defined in the EmailJS dashboard template, not in your code. Your code just sends the template parameters (variables), and EmailJS renders the HTML template with those variables.

## How HTML Emails Work in EmailJS

1. **Create HTML Template in Dashboard**: The HTML structure is created in the EmailJS dashboard
2. **Use Template Variables**: Use `{{variable_name}}` to insert dynamic content
3. **Send Parameters from Code**: Your code sends the values for these variables
4. **EmailJS Renders HTML**: EmailJS combines the HTML template with your parameters

## Step-by-Step Setup

### 1. Create Email Service
- Go to [Email Services](https://dashboard.emailjs.com/admin)
- Add Gmail service
- Connect `alexndegwa49@gmail.com`
- Note your **Service ID** (e.g., `service_xxxxx`)

### 2. Create HTML Email Template

Go to [Email Templates](https://dashboard.emailjs.com/admin/templates) and create a new template.

#### For Order Form (Simple Order):
**Template Name**: Order Form Template

**Subject**: `New Order from {{customer_name}}`

**Content** (HTML):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background-color: #FF6B35; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; }
    .info-box { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #FF6B35; }
    .action-box { background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px solid #ffc107; }
    .label { font-weight: bold; color: #333; }
    .value { color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">New Order Request</h2>
  </div>
  <div class="content">
    <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
    <div class="info-box">
      <p><span class="label">Name:</span> <span class="value">{{customer_name}}</span></p>
      <p><span class="label">Phone:</span> <span class="value">{{customer_phone}}</span></p>
      <p><span class="label">Delivery Address:</span> <span class="value">{{delivery_address}}</span></p>
      <p><span class="label">Source:</span> <span class="value">{{source}}</span></p>
    </div>
    <div class="action-box">
      <p style="margin: 0; color: #856404;"><strong>ACTION REQUIRED:</strong> Please contact the customer at <strong>{{customer_phone}}</strong> to confirm the order and arrange delivery.</p>
    </div>
    <p style="color: #666; font-size: 12px; margin-top: 30px;">This email was sent from the SupleeHub website order form.</p>
  </div>
</body>
</html>
```

**To Email**: `wands.express@gmail.com,jwandera35@gmail.com`

**From Name**: `alexndegwa49@gmail.com`

**Note your Template ID** (e.g., `template_xxxxx`)

#### For Product Order (With Product Details):
**Template Name**: Product Order Template

**Subject**: `New Product Order: {{product_name}} from {{customer_name}}`

**Content** (HTML):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background-color: #FF6B35; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; }
    .info-box { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #FF6B35; }
    .product-box { background-color: #e7f3ff; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #0066cc; }
    .action-box { background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px solid #ffc107; }
    .label { font-weight: bold; color: #333; }
    .value { color: #666; }
    .price { color: #FF6B35; font-weight: bold; font-size: 24px; }
    .discount { color: #28a745; font-weight: bold; }
    .strikethrough { text-decoration: line-through; color: #999; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">New Product Order</h2>
  </div>
  <div class="content">
    <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
    <div class="info-box">
      <p><span class="label">Name:</span> <span class="value">{{customer_name}}</span></p>
      <p><span class="label">Phone:</span> <span class="value">{{customer_phone}}</span></p>
      <p><span class="label">Email:</span> <span class="value">{{customer_email}}</span></p>
      <p><span class="label">Delivery Address:</span> <span class="value">{{delivery_address}}</span></p>
    </div>
    
    <h3 style="color: #333;">Order Details</h3>
    <div class="product-box">
      <p><span class="label">Product Name:</span> <span class="value">{{product_name}}</span></p>
      <p><span class="label">Product ID:</span> <span class="value">{{product_id}}</span></p>
      <p><span class="label">Price:</span> <span class="price">{{product_price}}</span></p>
      {{#if original_price}}
      <p><span class="label">Original Price:</span> <span class="strikethrough">{{original_price}}</span></p>
      {{/if}}
      {{#if discount}}
      <p><span class="label">Discount:</span> <span class="discount">{{discount}}</span></p>
      {{/if}}
    </div>
    
    <div class="action-box">
      <p style="margin: 0; color: #856404;"><strong>ACTION REQUIRED:</strong> Please contact the customer at <strong>{{customer_phone}}</strong> to confirm the order and arrange delivery.</p>
    </div>
    <p style="color: #666; font-size: 12px; margin-top: 30px;">This email was sent from the SupleeHub website order form.</p>
  </div>
</body>
</html>
```

**To Email**: `wands.express@gmail.com,jwandera35@gmail.com`

**From Name**: `alexndexwa49@gmail.com`

**Note your Template ID** (e.g., `template_xxxxx`)

### 3. Get Your Public Key
- Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
- Find your **Public Key** (you already have: `dEVhIHa6zuxqH7nKk`)

### 4. Configure Environment Variables

Create `.env` file in `client` folder:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=dEVhIHa6zuxqH7nKk
```

### 5. Restart Dev Server
```bash
npm run dev
```

## Template Variables Available

The code sends these variables that you can use in your HTML template:

### For Simple Order Form:
- `{{from_name}}` - Sender name
- `{{customer_name}}` - Customer's name
- `{{customer_phone}}` - Customer's phone number
- `{{delivery_address}}` - Delivery address
- `{{source}}` - Source of order (e.g., 'order-form')
- `{{subject}}` - Email subject
- `{{message}}` - Plain text message (fallback)
- `{{html_message}}` - HTML formatted message

### For Product Order:
- All above variables, plus:
- `{{customer_email}}` - Customer's email
- `{{product_id}}` - Product ID
- `{{product_name}}` - Product name
- `{{product_price}}` - Product price (formatted)
- `{{original_price}}` - Original price (formatted)
- `{{discount}}` - Discount percentage

## Important Notes

1. **HTML in Template, Not Code**: The HTML structure is in the EmailJS dashboard template, not in your JavaScript code
2. **Variables are Dynamic**: Use `{{variable_name}}` syntax in your HTML template
3. **Styling**: Use inline CSS or `<style>` tags in the HTML template
4. **Testing**: Test your template by sending a test email from the EmailJS dashboard
5. **Multiple Recipients**: Set multiple recipients in the template's "To Email" field, separated by commas

## References

- [EmailJS Overview](https://www.emailjs.com/docs/tutorial/overview/)
- [Adding Email Service](https://www.emailjs.com/docs/tutorial/adding-email-service/)
- [Creating Email Templates](https://www.emailjs.com/docs/tutorial/creating-contact-form/)
- [React Example](https://www.emailjs.com/docs/examples/reactjs/)




