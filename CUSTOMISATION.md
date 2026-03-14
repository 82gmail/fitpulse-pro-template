# Customisation Guide

FitPulse Pro is designed to be easily brandable. Most content can be changed via the Admin Panel, but for look-and-feel changes, follow this guide.

## 🎨 Changing Colors & Branding

The design system is built using Tailwind CSS 4 and standard CSS variables in `src/index.css`.

### Theme Colors
To change the primary accent color (the orange glow), update the following variables in `src/index.css`:
```css
:root {
  --primary: #f97316; /* Change this to your brand color */
  --primary-glow: rgba(249, 115, 22, 0.4);
}
```

### Fonts
The site uses **Bebas Neue** for headings and **Inter** for body text. To change them:
1. Update the Google Fonts link in `index.html`.
2. Update the `font-family` references in `src/index.css`.

## 🖼️ Images & Assets

### Trainer Portrait
Replace `public/images/hero-trainer-placeholder.jpg` with your own professional photo. For best results, use a transparent PNG or a moody, dark-lit portrait.

### Hero Background
Replace `public/images/gym-hero-bg-placeholder.jpg` with a high-resolution gym environment photo.

### Transformations
Upload your client transformation images via the **Admin Panel** under the **Results** section. These are stored via JSONBin or kept in your browser local storage.

## 📝 Editing Content

You don't need to touch the code to change text. Simply use the in-built **Admin Panel**:

1. Navigate to `/admin` on your local or live site.
2. Log in with your password.
3. Edit any section: **Hero**, **About**, **Services**, **Packages**, etc.
4. Click **Save Changes** to persist your updates.

## 💬 WhatsApp & Social Links

To update where the buttons lead:
1. Go to the **Contact** section in the Admin Panel.
2. Update the WhatsApp number, Email, and Social Media handles.
3. The site will automatically generate the correct links for you.
