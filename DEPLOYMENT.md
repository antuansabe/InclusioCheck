# Deployment Guide - SinOdio

## Deploying to Vercel

### Prerequisites
- GitHub account with this repository
- Vercel account (free tier works)

### Steps

1. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import from your GitHub repository: `antuansabe/InclusioCheck`

2. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Environment Variables**
   - **No environment variables required!** ✅
   - The app uses Gradio Client API which connects directly to the HuggingFace Space
   - No API tokens needed

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at: `https://your-project.vercel.app`

### Important Notes

#### API Route Configuration
- The `/api/analyze` route uses **Node.js runtime** (not Edge)
- Function timeout is set to **60 seconds** in `vercel.json`
- This is necessary for Gradio Space cold starts (can take up to 90s)

#### Gradio Space Cold Starts
- First request after inactivity may take **60-90 seconds**
- Subsequent requests are fast (**< 2 seconds**)
- The app handles this with:
  - 90-second timeouts
  - Automatic retry mechanism (up to 2 attempts)
  - User-friendly error messages

#### Performance Optimization
- Static pages are pre-rendered at build time
- Client-side JavaScript is optimized and code-split
- Total First Load JS: ~102 KB (excellent performance)

### Monitoring

After deployment, monitor:
- **Build logs**: Check for any errors during deployment
- **Function logs**: Monitor API route performance
- **Analytics**: Track user behavior and errors

### Troubleshooting

**Problem**: API requests timing out
**Solution**: Gradio Space is likely in cold start. Wait 30 seconds and try again.

**Problem**: Build fails
**Solution**: Check build logs. Most common issues:
- Missing dependencies → Run `npm install` locally first
- TypeScript errors → Run `npm run build` locally to check
- ESLint errors → Run `npm run lint` locally to check

**Problem**: Module not found errors
**Solution**: Ensure `@gradio/client` is in `dependencies` (not `devDependencies`)

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

### Continuous Deployment

Vercel automatically:
- Deploys `main` branch to production
- Creates preview deployments for pull requests
- Runs builds on every push

To disable auto-deployment for a branch:
1. Go to Project Settings → Git
2. Configure deployment branches

## Deployment Checklist

Before deploying, ensure:

- ✅ Build passes locally: `npm run build`
- ✅ No TypeScript errors: `npx tsc --noEmit`
- ✅ No ESLint errors: `npm run lint`
- ✅ API works locally: Test at http://localhost:3000
- ✅ All changes committed and pushed to GitHub
- ✅ `@gradio/client` in `dependencies` (not `devDependencies`)
- ✅ `vercel.json` configured with 60s function timeout

## Post-Deployment

1. **Test the live app**
   - Visit your Vercel URL
   - Test hate speech detection with examples
   - Verify both positive and negative cases work

2. **Monitor first day**
   - Check function logs for errors
   - Monitor response times
   - Watch for timeout issues

3. **Share**
   - Add Vercel URL to README.md
   - Share with team/users
   - Collect feedback

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Gradio Spaces**: https://huggingface.co/docs/hub/spaces

---

**Author**: Antonio Dromundo (antuansabe@gmail.com)
**License**: Apache 2.0
