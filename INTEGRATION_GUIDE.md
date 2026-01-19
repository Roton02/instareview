# How to Integrate Feedback Form in Your Flow

## Quick Reference

### Open the Feedback Modal
To open the feedback form from anywhere in your code:

```javascript
openFeedbackModal();
```

### Close the Feedback Modal
```javascript
closeFeedbackModal();
```

## Integration Examples

### Example 1: Button Click
```html
<button onclick="openFeedbackModal()">Report Issue</button>
```

### Example 2: Low Rating Detection
If you have a rating system (1-5 stars), open feedback for ratings ≤ 2:

```javascript
function handleRating(stars) {
  if (stars <= 2) {
    // Customer gave 1 or 2 stars - open feedback form
    openFeedbackModal();
  } else {
    // Customer gave 3+ stars - redirect to Google Review
    window.open('YOUR_GOOGLE_REVIEW_LINK', '_blank');
  }
}
```

### Example 3: "Not Satisfied" Option
```html
<div class="satisfaction-check">
  <button onclick="handleSatisfied()">I'm Satisfied ✅</button>
  <button onclick="openFeedbackModal()">I Have Concerns ⚠️</button>
</div>
```

### Example 4: Auto-trigger After Delay
```javascript
// Show feedback form after 30 seconds if user is still on page
setTimeout(() => {
  if (confirm('Would you like to share your experience?')) {
    openFeedbackModal();
  }
}, 30000);
```

## Typical Flow for Review System

```
Customer Experience
        ↓
Rate Your Experience (1-5 stars)
        ↓
    ┌───┴───┐
    ↓       ↓
  1-2 ⭐   3-5 ⭐
    ↓       ↓
Feedback   Google
  Form    Review
```

### Implementation:
```javascript
function handleCustomerRating(rating) {
  if (rating >= 4) {
    // Happy customer - send to Google Review
    redirectToGoogleReview();
  } else if (rating === 3) {
    // Neutral - ask what we can improve
    showImprovementSuggestion();
  } else {
    // Unhappy customer (1-2 stars) - collect private feedback
    openFeedbackModal();
  }
}

function redirectToGoogleReview() {
  // Your Google Review link
  window.open('https://g.page/r/YOUR_PLACE_ID/review', '_blank');
}
```

## Customization Options

### Change Form Title
Edit in `index.html`, line ~55:
```html
<h2 class="feedback-title">
  Your Custom Message Here
</h2>
```

### Change Button Text
Edit in `index.html`, line ~101:
```html
<button type="submit" class="submit-feedback-btn">
  Your Custom Button Text
</button>
```

### Change Button Color
Edit in `css/styles.css`, line ~430:
```css
.submit-feedback-btn {
  background: linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%);
}
```

## Email Template Variables

When setting up your EmailJS template, you can use these variables:

- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone number
- `{{comments}}` - Customer's feedback message
- `{{date}}` - Date and time of submission

## Testing Checklist

- [ ] EmailJS Public Key is set in `main.js`
- [ ] Service ID is set in `main.js`
- [ ] Template ID is set in `main.js`
- [ ] Email template is created in EmailJS dashboard
- [ ] Email service is connected and verified
- [ ] Test form opens when calling `openFeedbackModal()`
- [ ] Form validates all required fields
- [ ] Form submits successfully
- [ ] Email is received in your inbox
- [ ] Success message displays after submission
- [ ] Modal closes automatically or manually
- [ ] Form resets after closing

## Files Modified

1. **index.html** - Added feedback form modal HTML
2. **css/styles.css** - Added feedback form styling
3. **js/main.js** - Added form handlers and EmailJS integration

## Support

If you need help:
1. Check browser console (F12) for errors
2. Review `EMAILJS_SETUP_GUIDE.md`
3. Test using `test-feedback.html`
4. Check EmailJS dashboard logs

---

**Remember:** Always test the form before going live!
