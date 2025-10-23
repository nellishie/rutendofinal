# Deploying to Vercel

This guide will help you deploy your portfolio to Vercel without errors.

## What I've Set Up For You

✅ Created `vercel.json` configuration file
✅ Created `api/index.ts` serverless function for your backend
✅ Configured proper routing for API endpoints

## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Framework Preset: **Vite**
   - Click "Deploy"

3. **Add Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables, add:
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASSWORD` = your Gmail App Password
   - `SESSION_SECRET` = any random string
   - `DATABASE_URL` = your database connection string (if using database)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? (press enter for default)
# - In which directory is your code located? ./
# - Want to modify settings? No

# Add environment variables
vercel env add EMAIL_USER
vercel env add EMAIL_PASSWORD
vercel env add SESSION_SECRET

# Deploy to production
vercel --prod
```

## Important Notes

### Database Considerations
- If you're using a database, make sure to use a hosted database service like:
  - **Neon** (PostgreSQL - Free tier available)
  - **PlanetScale** (MySQL - Free tier available)
  - **Supabase** (PostgreSQL - Free tier available)

### Email Configuration
- Make sure you're using a Gmail App Password (not your regular password)
- Generate one at: https://myaccount.google.com/apppasswords

### API Routes
- All your API routes are already prefixed with `/api`
- Contact form: `/api/contact` ✅
- CV download: `/api/download-cv` ✅

## Troubleshooting

### Build Fails
```bash
# Make sure all dependencies are in package.json
npm install
```

### API Not Working
- Check that environment variables are set in Vercel dashboard
- Check Vercel logs: Dashboard → Deployments → Click deployment → Logs

### 404 Errors
- The `vercel.json` should handle routing correctly
- Make sure you deployed the latest code

## Testing Your Deployment

After deployment, test:
1. ✅ Website loads
2. ✅ Navigation works
3. ✅ Theme toggle works
4. ✅ Contact form submits successfully
5. ✅ CV downloads correctly

## Support

If you encounter issues:
- Check Vercel deployment logs
- Verify environment variables are set
- Ensure your database is accessible from Vercel

Your portfolio should now be live at: `https://your-project.vercel.app`
