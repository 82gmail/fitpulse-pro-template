# Deploying FitPulse Pro

FitPulse Pro is a static React application built with Vite, making it extremely easy and affordable (often free) to host.

## 🚀 Recommended Platforms

### 1. Netlify (Easiest)
1. **Push** your code to GitHub.
2. **Login** to Netlify and click "Add new site" > "Import an existing project".
3. **Connect** your GitHub repo.
4. **Build Settings**:
   - Build Command: `npm run build`
   - Publish directory: `dist`
5. **Environment Variables**: Add `VITE_JSONBIN_KEY` and `VITE_JSONBIN_BIN_ID` in the Netlify UI if you are using cloud sync.
6. **Deploy**: Your site will be live in seconds.

### 2. Vercel
1. Install Vercel CLI or connect via the dashboard.
2. Vercel will automatically detect Vite settings.
3. Set your environment variables and deploy.

### 3. GitHub Pages
1. Follow the [Vite guide for GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages).
2. Note: You will need to set a `base` path in `vite.config.js` if you aren't using a custom domain.

## 🔑 Handling Environment Variables
When deploying, make sure to add your secrets in the host's settings:
- `VITE_JSONBIN_KEY`: Your Master Key from JSONBin.io
- `VITE_JSONBIN_BIN_ID`: The ID of your private bin

## 🌍 Custom Domains
Once deployed, we highly recommend connecting a custom domain (e.g., `www.yourname.com`) to increase your brand's authority. Most hosts offer free SSL certificates automatically.
