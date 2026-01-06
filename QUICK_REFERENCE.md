# Quick Reference Card

## 🚀 Essential Commands

```powershell
npm install          # Install dependencies (first time only)
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm test             # Run tests
```

## 📁 Important Files to Edit

1. **`.env`** - Your contact info and API keys
2. **`src/data/resume.ts`** - Your CV content (experience, skills, etc.)
3. **`styles.css`** - Theme colors and styling

## 🔗 Quick Links

- **Dev Server:** http://localhost:5173
- **Build Output:** `/docs` folder
- **Node.js Download:** https://nodejs.org/

## 📚 Documentation

- **Setup Guide:** Read `SETUP.md`
- **Full README:** Read `README.md`
- **Implementation Details:** Read `IMPLEMENTATION_SUMMARY.md`

## 🎨 Customization Checklist

- [ ] Install Node.js
- [ ] Run `npm install`
- [ ] Update `.env` file
- [ ] Update `src/data/resume.ts`
- [ ] Customize colors in `styles.css`
- [ ] Add your profile photo as `public/Profile.jpeg`
- [ ] Add your logo as `public/Logo.png`
- [ ] Test locally with `npm run dev`
- [ ] Build with `npm run build`
- [ ] Deploy to GitHub Pages

## 🐛 Common Issues

**Port in use:**
```powershell
# Change port in vite.config.ts or kill the process
```

**TypeScript errors:**
```powershell
npm run type-check
```

**Build fails:**
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

## 💡 Pro Tips

- Use `npm run format` before committing
- Run `npm run lint:fix` to auto-fix issues
- Check `npm run test:coverage` for test coverage
- Use VS Code with recommended extensions
- Commit `docs/` folder after each build

## 🎉 Your site is ready!

After setup, your portfolio will be a modern, TypeScript-powered React application with all professional features included.
