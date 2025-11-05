import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  success?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', error: 'Only POST requests are accepted' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email', error: 'Please provide a valid email address' });
  }

  try {
    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email to VibeMap team
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'vibemapp@gmail.com',
      subject: 'New VibeMap Waitlist Signup',
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to VibeMap! 🗺️',
      html: `
        <h2>Thanks for joining the VibeMap waitlist!</h2>
        <p>We're excited to have you on board. You'll be among the first to experience VibeMap when we launch.</p>
        <p>In the meantime, stay tuned for updates about exclusive features and early access perks.</p>
        <br />
        <p>Best regards,<br />The VibeMap Team</p>
      `,
    });

    res.status(200).json({ message: 'Signup successful!', success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      message: 'Failed to process signup', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    });
  }
}
