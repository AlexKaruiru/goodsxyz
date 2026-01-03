# Server Setup

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on port 5000 by default (or the port specified in your `.env` file).

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

**Note**: For Gmail, you'll need to use an App Password instead of your regular password. See the email setup documentation for more details.

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/orders` - Submit product order

## Email Recipients

Emails are sent to:
- wands.express@gmail.com
- alexndegwa49@gmail.com
- jwandera35@gmail.com

These are configured in `server/utils/config.js`.
