const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const siteRoot = __dirname;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

const sanitizeText = (value) => typeof value === 'string' ? value.trim() : '';

const validatePayload = (payload) => {
  const name = sanitizeText(payload.name);
  const email = sanitizeText(payload.email).toLowerCase();
  const message = sanitizeText(payload.message);

  if (!name) {
    return { ok: false, message: 'Please enter your full name.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Please provide a valid email address.' };
  }

  if (!message) {
    return { ok: false, message: 'Please enter a message before submitting.' };
  }

  return { ok: true, data: { name, email, phone: sanitizeText(payload.phone), message } };
};

const createTransporter = () => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    return null;
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

app.post('/api/contact', async (req, res) => {
  const payload = validatePayload(req.body || {});

  if (!payload.ok) {
    return res.status(400).json({ ok: false, message: payload.message });
  }

  const transporter = createTransporter();

  if (!transporter) {
    return res.status(503).json({
      ok: false,
      message: 'The email delivery service is not configured yet. Please use the direct email link until the SMTP settings are added.',
    });
  }

  try {
    const mailOptions = {
      from: `${payload.data.name} <${payload.data.email}>`,
      to: process.env.EMAIL_TO,
      replyTo: payload.data.email,
      subject: `Portfolio inquiry from ${payload.data.name}`,
      text: [
        `Name: ${payload.data.name}`,
        `Email: ${payload.data.email}`,
        `Phone: ${payload.data.phone || 'Not provided'}`,
        '',
        'Message:',
        payload.data.message,
      ].join('\n'),
      html: `
        <h3>Portfolio inquiry</h3>
        <p><strong>Name:</strong> ${payload.data.name}</p>
        <p><strong>Email:</strong> ${payload.data.email}</p>
        <p><strong>Phone:</strong> ${payload.data.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      ok: true,
      message: 'Your message was sent successfully. Thanks for reaching out!',
    });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong while sending your message. Please try again or use the direct email link.',
    });
  }
});

app.use(express.static(siteRoot));

app.get('*', (req, res) => {
  res.sendFile(path.join(siteRoot, 'index.html'));
});

app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`);
});
