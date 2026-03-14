# Setup & Deployment Guide

Follow these steps to get your **FitPulse Pro** portfolio live on the web and configured for easy management.

## 1. Prerequisites
- **Node.js** (v18 or higher)
- **Git** installed on your system
- A **JSONBin.io** account (Free tier is sufficient)

## 2. Local Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd fitpulse-pro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your keys:
   - `VITE_JSONBIN_KEY`: Your JSONBin Master Key (found in your dashboard).
   - `VITE_JSONBIN_BIN_ID`: Create a new Public Bin on JSONBin and paste its ID here.

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 3. Connecting the Backend (Cloud Sync)

This template uses a "No-DB" approach via JSONBin.io to allow you to edit content without a traditional database like SQL or MongoDB.

1. Go to [jsonbin.io](https://jsonbin.io) and sign up.
2. Go to **API Keys** and copy your **Master Key**.
3. Create a **New Bin**. You can start with an empty object `{}`.
4. Copy the **Bin ID**.
5. Log in to your site's Admin Panel (usually at `/admin` or via the preview link).
6. Click the **Cloud DB** icon and paste your Master Key. Your changes will now sync across all browsers and devices.

## 4. Deployment (Netlify/Vercel)

This project is optimized for deployment on Netlify or Vercel.

### Deployment on Netlify:
1. Connect your GitHub/GitLab repository.
2. Set the **Build Command**: `npm run build`
3. Set the **Publish Directory**: `dist`
4. **Environment Variables**: Add `VITE_JSONBIN_KEY` and `VITE_JSONBIN_BIN_ID` in the Netlify site settings dashboard.
5. Deploy!

### Netlify Redirects:
The project includes a `_redirects` file in the `public` folder to ensure React Router works correctly on Page Refreshes.

## 5. Security

By default, the Admin Panel is protected by a password:
- **Default Password**: `admin@fitpulse`

**CRITICAL**: Change this password in `src/pages/AdminPage.jsx` (`const ADMIN_PASSWORD`) before deploying to production.
