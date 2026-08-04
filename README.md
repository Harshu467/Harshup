# Harshup Portfolio

A lightweight portfolio website built with HTML, CSS, and vanilla JavaScript, plus a small Express backend for contact form delivery.

## Local development

1. Install dependencies:
   npm install
2. Create a local environment file based on `.env.example`:
   cp .env.example .env
3. Update the SMTP values in `.env` for your email provider.
4. Start the server:
   npm start
5. Open http://localhost:3000

## Production deployment

This app is deployment-ready as a Node.js service and is configured for Render.

### Render setup

1. Push this repository to GitHub.
2. In Render, create a new Web Service and connect the repository.
3. Use the included `render.yaml` configuration or set:
   - Build command: `npm install`
   - Start command: `npm start`
   - Health check path: `/health`
4. Add these environment variables in the Render dashboard:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `EMAIL_HOST=smtp.gmail.com`
   - `EMAIL_PORT=587`
   - `EMAIL_USER=your-email@gmail.com`
   - `EMAIL_PASS=your-app-password`
   - `EMAIL_TO=harshupadhye39@gmail.com`

For Docker-based hosting, the repo also includes a `Dockerfile`.

## Contact backend

The backend exposes:

- `POST /api/contact` for sending portfolio messages
- `GET /health` for health checks

## Notes

If the SMTP configuration is not set, the app will return a friendly message and keep the direct mailto fallback available in the browser.
