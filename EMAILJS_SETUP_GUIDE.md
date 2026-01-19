# EmailJS Setup Guide for Feedback Form

## Overview
This guide will help you configure EmailJS to receive feedback form submissions via email.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Set up your template with these variables:

```
Subject: New Negative Feedback Received - InstaReviewUs

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Date: {{date}}

Comments:
{{comments}}

---
This is an automated message from InstaReviewUs Feedback System.
```

4. Save the template and copy the **Template ID**

### Recommended Template Settings:
- **Template Name**: Negative Feedback Form
- **Subject**: New Negative Feedback - {{from_name}}
- **From Email**: Use your verified email
- **To Email**: Your business email where you want to receive feedback

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (or API Key)
3. Copy this key

## Step 5: Update Your Code

Open `js/main.js` and replace the following placeholders:

### Line 1: Initialize EmailJS
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```
Replace `YOUR_PUBLIC_KEY` with your actual public key from Step 4.

### Line 2: Send Email Configuration
```javascript
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
```
Replace:
- `YOUR_SERVICE_ID` with your Service ID from Step 2
- `YOUR_TEMPLATE_ID` with your Template ID from Step 3

## Example Configuration

Here's what it should look like after you update:

```javascript
// Initialize EmailJS
emailjs.init("user_aBcDeFgHiJkLmN123");

// In the form submit handler
emailjs.send("service_xyz123", "template_abc789", formData)
```

## Step 6: Test the Form

1. Open your website in a browser
2. Trigger the feedback form (by clicking negative rating)
3. Fill out all fields:
   - Comments
   - Name
   - Phone
   - Email
4. Click "Submit Feedback"
5. Check your email for the feedback message

## Troubleshooting

### Form not sending?
- Check browser console for errors (F12)
- Verify all three credentials are correct (Public Key, Service ID, Template ID)
- Make sure your email service is connected and verified
- Check EmailJS dashboard for usage limits (free tier: 200 emails/month)

### Email not received?
- Check spam folder
- Verify the "To Email" in your template settings
- Check EmailJS dashboard logs for delivery status

### Error: "Failed to send feedback"
- Verify your Public Key is correct
- Ensure email service is properly connected
- Check if you've exceeded your monthly limit

## EmailJS Free Tier Limits
- 200 emails per month
- 2 email services
- 2 email templates
- Community support

## How to Open the Feedback Form

To trigger the feedback form in your code, call:
```javascript
openFeedbackModal();
```

You can add this to any button or link. For example:
```html
<button onclick="openFeedbackModal()">Leave Feedback</button>
```

## Security Note

The Public Key is safe to expose in client-side code. However, keep your:
- Private Key secret
- Email service credentials secure
- Template settings restricted

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Contact through their dashboard

---

**Your credentials to replace:**
1. ✅ `YOUR_PUBLIC_KEY` in `emailjs.init()`
2. ✅ `YOUR_SERVICE_ID` in `emailjs.send()`
3. ✅ `YOUR_TEMPLATE_ID` in `emailjs.send()`

**Location:** `js/main.js` (Lines ~90-120)
