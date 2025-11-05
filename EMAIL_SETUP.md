# Email Setup Guide for VibeMap

This guide will help you set up email notifications for the VibeMap landing page.

## How It Works

When users sign up with their email:
1. An email is sent to **vibemapp@gmail.com** with the signup details
2. A confirmation email is sent to the user

## Setup Instructions

### 1. Enable Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy this password

### 2. Create .env.local File

In the root of the project, create a `.env.local` file:

```
GMAIL_USER=vibemapp@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace `xxxx xxxx xxxx xxxx` with the 16-character password from step 1.

### 3. Install Dependencies

```bash
npm install
```

### 4. Test It Out

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Enter an email in the signup form
4. Check vibemapp@gmail.com for the notification email

## Important Notes

- **Never commit .env.local** - It's already in .gitignore for security
- The app password is specific to Gmail and can be revoked anytime
- For production, consider using a dedicated email service like SendGrid or Mailgun
- Make sure 2-Factor Authentication is enabled on the Gmail account

## Troubleshooting

- **"Less secure app access"**: Use App Passwords instead (recommended)
- **"Invalid login"**: Double-check the 16-character password with spaces
- **Emails not sending**: Check that GMAIL_USER and GMAIL_PASSWORD are correct in .env.local

## Production Recommendations

For production deployment, consider:
- Using SendGrid, Mailgun, or AWS SES instead of Gmail
- Setting environment variables through your hosting provider's dashboard
- Implementing rate limiting to prevent abuse
- Adding email validation before sending
