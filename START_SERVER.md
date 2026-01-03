# How to Start the Backend Server

## The Problem
You're getting `ERR_CONNECTION_REFUSED` because the backend server is not running. The frontend is trying to connect to `http://localhost:5000/api/contact`, but nothing is listening on that port.

## Solution: Start the Server

### Option 1: Using npm (Recommended)

1. **Open a new terminal window** (keep your frontend running in the other terminal)

2. **Navigate to the server directory:**
   ```bash
   cd server
   ```

3. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **You should see:**
   ```
   Server running in development mode on port 5000
   ```

### Option 2: Using Node directly

```bash
cd server
node server.js
```

## Verify It's Working

Once the server is running, you should be able to:
- Submit the contact form successfully
- See no more `ERR_CONNECTION_REFUSED` errors
- Receive toast notifications when forms are submitted

## Important Notes

- **Keep both terminals open**: One for the frontend (Vite dev server) and one for the backend (Express server)
- **The server must be running** for the contact form and order form to work
- **Port 5000** is the default port - make sure nothing else is using it

## Troubleshooting

If you get an error about missing dependencies:
```bash
cd server
npm install
```

If port 5000 is already in use, you can change it by setting the PORT environment variable:
```bash
PORT=5001 npm start
```
(Then update `client/src/utils/config.js` to use port 5001)

