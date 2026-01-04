# SupleeHub - Flekosteel Landing Page

A full-stack application with React + Vite frontend and Node.js/Express backend, converted from the reference HTML landing page.

## Project Structure

```
SupleeHub/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/          # Node.js/Express backend
│   ├── server.js
│   └── package.json
├── package.json     # Root package.json with scripts
└── README.md
```

## Features

- ⚡️ Built with Vite for fast development
- ⚛️ React 19
- 🎨 Chakra UI v3 for modern, accessible components
- 📱 Responsive design
- 🎯 Interactive survey section
- 📝 Order form with validation
- 🔧 Express.js backend ready for API endpoints

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
cd ..
```

3. Install server dependencies:
```bash
cd server
npm install
cd ..
```

4. Set up environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your configuration
cd ..
```

### Development

Run both client and server concurrently:
```bash
npm run dev
```

Or run them separately:

**Client only:**
```bash
npm run client
# or
cd client && npm run dev
```

**Server only:**
```bash
npm run server
# or
cd server && npm run dev
```

### Build

Build the client for production:
```bash
npm run build
```

### Production

1. Build the client:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The server will serve the built React app in production mode.

## Technologies Used

### Frontend
- **Vite** - Next generation frontend tooling
- **React 19** - UI library
- **Chakra UI v3** - Component library
- **Framer Motion** - Animation library (via Chakra UI)

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime environment

## Client Components

- `SafetyBanner` - COVID-19 safety message banner
- `Header` - Logo and main title
- `ProductSection` - Product info with discount badge
- `DescriptionSection` - Product description
- `SurveySection` - Interactive 3-question survey
- `AdvantagesSection` - Product benefits grid
- `OrderSection` - Order form
- `Footer` - Footer with links

## API Development

The server is set up in `server/server.js`. Add your routes, controllers, and models following standard Express.js patterns.

Example API structure:
```
server/
├── routes/
│   └── orderRoutes.js
├── controllers/
│   └── orderController.js
├── models/
│   └── orderModel.js
└── server.js
```

## Notes

- Place your logo image at `/client/public/logo.png`
- The form submission handler in `OrderSection.jsx` needs to be connected to your backend API
- Customize colors and styling in `client/src/main.jsx` theme configuration
- Client runs on port 3000, server runs on port 5000 by default
