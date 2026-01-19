# EmailJS Template Setup

## Copy this template to your EmailJS dashboard

### Template Name
```
InstaReview - Negative Feedback Form
```

### Email Subject
```
⚠️ New Negative Feedback - Action Required
```

### Content (HTML Format)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #ff5722 0%, #ff6f00 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 10px 10px;
        }
        .field {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9fafb;
            border-left: 4px solid #3b82f6;
            border-radius: 5px;
        }
        .label {
            font-weight: bold;
            color: #1f2937;
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .value {
            color: #374151;
            font-size: 16px;
        }
        .comments {
            background: #fef3c7;
            border-left-color: #f59e0b;
            padding: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
        }
        .urgent {
            background: #fee2e2;
            border: 2px solid #ef4444;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        .urgent-text {
            color: #dc2626;
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">🚨 Negative Feedback Alert</h1>
            <p style="margin: 10px 0 0 0;">InstaReviewUs Feedback System</p>
        </div>
        
        <div class="content">
            <div class="urgent">
                <p class="urgent-text">⚠️ URGENT: A customer has reported a negative experience</p>
            </div>

            <div class="field">
                <div class="label">📅 Date & Time</div>
                <div class="value">{{date}}</div>
            </div>

            <div class="field">
                <div class="label">👤 Customer Name</div>
                <div class="value">{{from_name}}</div>
            </div>

            <div class="field">
                <div class="label">📧 Email Address</div>
                <div class="value">{{from_email}}</div>
            </div>

            <div class="field">
                <div class="label">📱 Phone Number</div>
                <div class="value">{{phone}}</div>
            </div>

            <div class="field comments">
                <div class="label">💬 Customer Comments</div>
                <div class="value" style="margin-top: 10px; white-space: pre-wrap;">{{comments}}</div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #dbeafe; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #1e40af;">📋 Recommended Actions:</h3>
                <ul style="color: #1e3a8a;">
                    <li>Respond within 24 hours</li>
                    <li>Contact customer directly via phone or email</li>
                    <li>Document the issue and resolution</li>
                    <li>Follow up to ensure satisfaction</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <p>This is an automated email from your InstaReviewUs system.</p>
            <p>Please respond to the customer directly using the contact information provided above.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="font-size: 12px; color: #9ca3af;">
                © 2026 InstaReviewUs - Customer Feedback Management System
            </p>
        </div>
    </div>
</body>
</html>
```

### Alternative: Plain Text Version

```
========================================
⚠️ NEGATIVE FEEDBACK ALERT
========================================

A customer has reported a negative experience through your InstaReviewUs feedback form.

CUSTOMER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Date & Time: {{date}}
👤 Name: {{from_name}}
📧 Email: {{from_email}}
📱 Phone: {{phone}}

CUSTOMER FEEDBACK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{comments}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDED ACTIONS:
✓ Respond within 24 hours
✓ Contact customer directly
✓ Document issue and resolution
✓ Follow up to ensure satisfaction

========================================

This is an automated message from InstaReviewUs.
Please respond to the customer using the contact information above.

© 2026 InstaReviewUs
```

## Setup Steps in EmailJS Dashboard

### 1. Create New Template
- Go to Email Templates
- Click "Create New Template"

### 2. Template Settings
- **Template Name**: InstaReview - Negative Feedback
- **Template ID**: (auto-generated - copy this for your code)

### 3. Email Configuration
- **From Name**: InstaReviewUs Alert System
- **From Email**: (your verified email)
- **To Email**: (your business email where you want to receive alerts)
- **CC Email**: (optional - add manager or team email)
- **Subject**: ⚠️ New Negative Feedback - Action Required

### 4. Copy Template Content
- Paste the HTML version above into the "Content" field
- Or use the plain text version if you prefer simpler emails

### 5. Test Your Template
- Use the "Test It" button in EmailJS
- Enter sample data for all variables:
  - from_name: "John Doe"
  - from_email: "john@example.com"
  - phone: "+1 (555) 123-4567"
  - comments: "The service was slow and food was cold."
  - date: "1/19/2026, 2:30 PM"
- Send test email to verify formatting

### 6. Enable Auto-Reply (Optional)
You can set up an auto-reply to customers:

**Auto-Reply Template:**
```
Subject: We've Received Your Feedback

Dear {{from_name}},

Thank you for taking the time to share your experience with us. We sincerely apologize that we didn't meet your expectations.

Your feedback has been received and forwarded to our management team. Someone will be reaching out to you within 24 hours at {{from_email}} or {{phone}}.

We value your business and are committed to making this right.

Best regards,
[Your Business Name] Team
```

## Email Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Customer's name | John Doe |
| `{{from_email}}` | Customer's email | john@example.com |
| `{{phone}}` | Customer's phone | +1 (555) 123-4567 |
| `{{comments}}` | Customer's feedback message | The service was slow... |
| `{{date}}` | Submission date/time | 1/19/2026, 2:30 PM |

## Pro Tips

1. **Test Multiple Times**: Send test emails to different email providers (Gmail, Outlook, etc.)
2. **Check Spam**: Test emails might go to spam initially
3. **Mobile Friendly**: The HTML template is responsive and works on mobile devices
4. **Customize**: Add your business logo, colors, and branding
5. **Add Actions**: Include direct links to your CRM or ticketing system
6. **Set Priorities**: Use email rules to flag these as high priority

## Troubleshooting

**Issue**: Variables not showing data
- **Solution**: Ensure variable names match exactly (case-sensitive)

**Issue**: Email goes to spam
- **Solution**: Verify your email service in EmailJS, use authenticated domain

**Issue**: HTML not rendering
- **Solution**: Make sure you selected "HTML" mode in EmailJS editor

**Issue**: Template not found
- **Solution**: Double-check Template ID in your `main.js` file

---

**Next Step**: Copy the Template ID and update it in `js/main.js`
