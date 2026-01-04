# EmailJS Template Setup Guide

## Simple HTML Passthrough Template

Since all HTML content is generated in your code, you can create a minimal template that just passes through your HTML.

### Template Configuration

1. Go to https://dashboard.emailjs.com/
2. Navigate to **Email Templates**
3. Click **"Create New Template"**

### Template Settings

- **Template Name**: `order_notification` (or any name)
- **Service**: Select your service (e.g., `SupleeHub_test_alex`)
- **To Email**: `wands.express@gmail.com,jwandera35@gmail.com` (comma-separated)
- **From Name**: `SupleeHub`
- **Reply To**: (optional, leave empty or set to your email)

### Template Content

**Subject Field:**
```
{{subject}}
```

**Content/Body Field:**
```
{{{html_message}}}
```

**Important:** Use **triple curly brackets** `{{{html_message}}}` (not double) to render HTML directly without escaping.

### How It Works

- Your code generates all the HTML content in the `html_message` parameter
- The template uses `{{{html_message}}}` to render it directly
- The template acts as a simple passthrough wrapper
- All formatting and content comes from your code

### Template ID

After creating the template, copy the **Template ID** (e.g., `template_xxxxx`) and update it in your code if needed.

### Reference

- [EmailJS Dynamic Variables Documentation](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/)
- Triple brackets `{{{variable}}}` = HTML rendered without escaping
- Double brackets `{{variable}}` = HTML escaped (plain text)

