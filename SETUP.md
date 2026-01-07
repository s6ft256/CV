# Setup Guide

## ⚠️ Important: Node.js Required

Node.js was not found on your system. Before you can run this project, you need to install Node.js.

### Install Node.js

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Windows: Download the `.msi` installer

2. **Install Node.js**
   - Run the downloaded installer
   - Follow the installation wizard
   - **Important:** Check the box "Automatically install necessary tools"
   - Restart your terminal/PowerShell after installation

3. **Verify Installation**
   ```powershell
   node --version
   npm --version
   ```
   Both commands should display version numbers.

## 🚀 Quick Start (After Node.js is installed)

### 1. Install Dependencies

```powershell
npm install
```

This will install all required packages:

- React & React DOM
- TypeScript & type definitions
- Vite (build tool)
- ESLint & Prettier (code quality)
- Vitest & Testing Library (testing)
- Tailwind CSS (styling utilities)

### 2. Configure Environment

```powershell
# The .env file is already created, edit it with your details
```

Open `.env` and update:

```env
VITE_EMAIL=your-email@example.com
VITE_PHONE=+971563892557
VITE_WHATSAPP=971563892557
VITE_GITHUB_USERNAME=s6ft256
VITE_LINKEDIN_URL=https://linkedin.com/in/elius-niwamanya
```

### 3. Update Your Data

Edit `src/data/resume.ts` with your personal information:

- Work experience
- Education history
- Certifications
- Skills and proficiency levels

### 4. Start Development Server

```powershell
npm run dev
```

Your site will be available at: http://localhost:5173

## 🔧 Available Commands

```powershell
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for code issues
npm run lint:fix         # Auto-fix code issues
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# Testing
npm test                 # Run tests
npm run test:ui          # Open test UI
npm run test:coverage    # Generate coverage report
```

## 📝 What's Been Implemented

### ✅ Architecture & Structure

- [x] Migrated from static HTML to React components
- [x] Added full TypeScript support with strict type checking
- [x] Created organized component structure
- [x] Setup development tooling (ESLint, Prettier, Vitest)

### ✅ Features

- [x] **Hero Section** - Dynamic with personal info from data file
- [x] **Experience Section** - Timeline of work history
- [x] **Skills Section** - Visual proficiency indicators
- [x] **Projects Section** - GitHub API integration for automatic project display
- [x] **Education Section** - Academic credentials
- [x] **Certifications Section** - Professional certificates
- [x] **Contact Form** - Ready for EmailJS/Formspree integration
- [x] **Theme Toggle** - Persistent dark/light mode with localStorage
- [x] **Resume Download** - PDF export functionality
- [x] **LinkedIn Import** - Python script to import profile data

### ✅ Code Quality

- [x] ESLint configuration for React & TypeScript
- [x] Prettier for consistent code formatting
- [x] Vitest + React Testing Library setup
- [x] Sample tests for Button and Card components
- [x] TypeScript strict mode enabled

### ✅ Performance & SEO

- [x] Code splitting with manual chunks
- [x] Lazy loading hooks for images
- [x] Sitemap.xml for search engines
- [x] Robots.txt for crawler instructions
- [x] JSON-LD structured data
- [x] Open Graph & Twitter Card meta tags
- [x] Google Analytics & Plausible support

### ✅ Accessibility

- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Semantic HTML structure
- [x] Focus management
- [x] Screen reader friendly

### ✅ Deployment

- [x] Vite configured to build to root (`/`) for GitHub Pages
- [x] CNAME file for custom domain (elius.pro)
- [x] Production-ready build configuration

## 🎨 Customization

### Update Personal Information

1. Open `src/data/resume.ts`
2. Update `personalInfo` object
3. Add/edit entries in `experiences`, `education`, `certifications`, `skillCategories`

### Change Theme Colors

1. Open `styles.css`
2. Edit CSS variables in `:root` and `body.theme-light` sections

### Add New Components

1. Create component file in `src/components/`
2. Import and use in `src/App.tsx`

### Configure Analytics

1. Get your Google Analytics tracking ID
2. Add to `.env` as `VITE_GA_TRACKING_ID=GA-XXXXXXXXXX`
3. Analytics will auto-initialize on first page load

### Setup Contact Form

1. Create free EmailJS account: https://www.emailjs.com/
2. Get Service ID, Template ID, and Public Key
3. Add to `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxx
   ```
4. Contact form will automatically start working

## 🌐 Deployment to GitHub Pages

### First Time Setup

1. Build the project:

   ```powershell
   npm run build
   ```

2. Commit the changes:

   ```powershell
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: main
   - Folder: / (root)
   - Save

4. Your site will be live at: `https://yourusername.github.io/CV/`

### Custom Domain (Optional)

1. Edit `CNAME` file with your domain: `elius.pro`
2. Configure DNS:
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `yourusername.github.io`

## 🐛 Troubleshooting

### Port 5173 already in use

```powershell
# Kill the process using the port or change port in vite.config.ts
```

### TypeScript errors

```powershell
npm run type-check
```

Fix reported issues or add `// @ts-ignore` above problematic lines.

### Build fails

```powershell
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Theme not persisting

- Check browser localStorage is enabled
- Clear browser cache and try again

## 📚 Next Steps

1. **Add More Projects**: Edit `src/data/resume.ts` or let GitHub API fetch them
2. **Customize Styles**: Edit `styles.css` and `src/index.css`
3. **Add Blog**: Create a `/blog` route with articles
4. **Add Testimonials**: Create a new section component
5. **Optimize Images**: Add WebP images for better performance
6. **Add Animations**: Use Framer Motion for smooth transitions

## 📞 Support

If you run into issues:

1. Check this guide carefully
2. Review the main README.md
3. Check Vite documentation: https://vitejs.dev
4. Check React documentation: https://react.dev

## 🎉 You're All Set!

Your modern, TypeScript-powered portfolio is ready to use. Just install Node.js, run `npm install`, and you're good to go!
