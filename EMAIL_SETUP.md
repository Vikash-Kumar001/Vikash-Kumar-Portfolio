# Email Setup Guide - Contact Form

This guide will help you set up the contact form to receive messages via email using EmailJS.

## Quick Setup Steps

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

### 2. Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. Note down your **Service ID**

### 3. Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

**Template Variables to use:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_email}}` - Your email (recipient)

4. Save the template and note down the **Template ID**

### 4. Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** and copy it

### 5. Create Environment File

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_RECIPIENT_EMAIL=vikashkumarsudhi8527@gmail.com
```

Replace the placeholder values with your actual EmailJS credentials.

### 6. Restart Your Development Server

After adding the environment variables, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Testing

1. Navigate to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit the form
4. Check your email inbox for the message

## Troubleshooting

### Form not sending emails?

1. **Check browser console** for error messages
2. **Verify environment variables** are set correctly in `.env`
3. **Check EmailJS dashboard** for delivery status
4. **Verify template variables** match exactly (case-sensitive)

### Common Issues

- **"Email service not configured"**: Make sure all environment variables are set
- **"Invalid template"**: Check that template variables match your template
- **Email not received**: Check spam folder, verify email service is connected in EmailJS

## Alternative Options

### Using Formspree (Alternative)

If you prefer Formspree instead of EmailJS:

1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Get your Form ID
3. Add to `.env`:
   ```
   VITE_FORMSPREE_ID=your_formspree_id_here
   ```

The form will automatically use Formspree if `VITE_FORMSPREE_ID` is set.

### Using Custom Backend API

If you have your own backend API:

1. Create an endpoint that accepts POST requests
2. Add to `.env`:
   ```
   VITE_CONTACT_ENDPOINT=https://your-api.com/api/contact
   ```

The form will use this endpoint if available.

## Production Deployment

Make sure to add these environment variables to your hosting platform:

- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Build & Deploy → Environment
- **Cloudflare Pages**: Add in Settings → Environment Variables

## Support

For more help:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

