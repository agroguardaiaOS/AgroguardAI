# GitHub Pages Automated Deployment Setup

## ✅ What Has Been Configured

### 1. GitHub Actions Workflow
A fully automated CI/CD pipeline has been created at `.github/workflows/deploy.yml` that:
- **Triggers on every push to `main` branch**
- Installs dependencies using pnpm
- Builds the React project with Vite
- Automatically creates a CNAME file with `agroguardai.com`
- Deploys the `dist/public` folder to GitHub Pages

### 2. CNAME File
The `public/CNAME` file has been created with the content:
```
agroguardai.com
```
This file is automatically copied to the build output during every build, ensuring your custom domain persists.

## 🔧 Required GitHub Repository Settings

To complete the setup, you **MUST** configure your GitHub repository settings:

### Step-by-Step Instructions:

1. **Go to your GitHub repository**: https://github.com/agroguardaiaOS/AgroguardAI

2. **Navigate to Settings**
   - Click the "Settings" tab at the top of the repository

3. **Go to Pages** (in the left sidebar under "Code and automation")
   - Click "Pages"

4. **Configure Build and Deployment**
   - **Source**: Select "GitHub Actions" (NOT "Deploy from a branch")
   - This tells GitHub to use the automated workflow we created

5. **Verify Custom Domain** (optional but recommended)
   - Under "Custom domain", you should see `agroguardai.com`
   - If it's not there, enter it manually
   - Click "Save"

6. **Wait for DNS Check**
   - GitHub will verify your DNS records
   - This may take a few minutes

## 🚀 Deployment Flow

Once you've completed the GitHub settings above:

1. **Push code to main branch**
   ```bash
   git add .
   git commit -m "Your message"
   git push github main
   ```

2. **GitHub Actions automatically:**
   - Builds the project
   - Creates the CNAME file
   - Deploys to GitHub Pages

3. **Your site will be live at:**
   - `https://agroguardai.com` (custom domain)
   - `https://agroguardaiaOS.github.io/AgroguardAI/` (GitHub Pages default)

## 📋 What the Workflow Does

The `.github/workflows/deploy.yml` file:

```yaml
1. Checks out your code
2. Sets up Node.js 22 with pnpm
3. Installs all dependencies
4. Runs: pnpm run build
5. Creates: dist/public/CNAME with "agroguardai.com"
6. Uploads the dist/public folder as a GitHub Pages artifact
7. Deploys to GitHub Pages
```

## ✨ Key Features

- ✅ **Fully Automated** - No manual builds or uploads needed
- ✅ **Custom Domain Preserved** - CNAME file is regenerated on every build
- ✅ **Fast Deployments** - Builds complete in ~30-60 seconds
- ✅ **Rollback Friendly** - Every commit creates a deployable version
- ✅ **Environment Isolation** - Uses GitHub's official Pages deployment action

## 🔍 Monitoring Deployments

To see the deployment status:

1. Go to your GitHub repository
2. Click the "Actions" tab
3. You'll see a list of workflow runs
4. Click on any run to see detailed logs
5. Look for the "Deploy to GitHub Pages" step for deployment status

## ⚠️ Troubleshooting

If the site doesn't appear after 5 minutes:

1. **Check GitHub Actions**
   - Go to Actions tab
   - Verify the workflow ran successfully (green checkmark)
   - Look for any error messages in the logs

2. **Check GitHub Pages Settings**
   - Verify "Source" is set to "GitHub Actions"
   - Verify custom domain is set to "agroguardai.com"

3. **Check DNS**
   - Ensure your domain DNS records point to GitHub Pages
   - GitHub will provide the correct DNS targets in the Pages settings

4. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📝 Next Steps

1. ✅ Complete the GitHub Repository Settings (see instructions above)
2. ✅ Push this code to main branch
3. ✅ Monitor the Actions tab for the deployment
4. ✅ Visit https://agroguardai.com to verify

---

**Questions?** Check the GitHub Actions logs for detailed error messages.
