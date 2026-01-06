# Professional CV Website

Modern, fully-featured portfolio and CV website built with React, TypeScript, and Vite.

## 🚀 Features

- ✅ **Full TypeScript** - Type-safe development with comprehensive type definitions
- ✅ **React 18** - Modern React with hooks and functional components
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Dark/Light Theme** - Persistent theme switcher with localStorage
- ✅ **GitHub Integration** - Automatic project fetching from GitHub API
- ✅ **Contact Form** - Built-in contact form (ready for EmailJS integration)
- ✅ **SEO Optimized** - Structured data, meta tags, sitemap.xml, robots.txt
- ✅ **Analytics Ready** - Google Analytics & Plausible support
- ✅ **PDF Export** - Download resume functionality
- ✅ **Code Quality** - ESLint, Prettier, pre-configured
- ✅ **Testing Setup** - Vitest + React Testing Library
- ✅ **LinkedIn Import** - Python script to import LinkedIn profile data
- ✅ **Performance** - Lazy loading, code splitting, optimized builds
- ✅ **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

## 📦 Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS + Custom CSS
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint + Prettier
- **Deployment:** GitHub Pages

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CV.git
   cd CV
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your details:
   - `VITE_EMAIL` - Your email address
   - `VITE_PHONE` - Your phone number
   - `VITE_WHATSAPP` - WhatsApp number (without +)
   - `VITE_GITHUB_USERNAME` - Your GitHub username
   - `VITE_LINKEDIN_URL` - Your LinkedIn profile URL
   - Analytics keys (optional)
   - EmailJS keys (optional, for contact form)

4. **Update personal data**
   
   Edit `src/data/resume.ts` with your:
   - Experience
   - Education
   - Certifications
   - Skills

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:5173

## 🧪 Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

## 📁 Project Structure

```
CV/
├── public/              # Static assets
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/      # React components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/            # Data files
│   │   └── resume.ts    # Your CV data
│   ├── hooks/           # Custom React hooks
│   │   └── useEffects.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   ├── analytics.ts
│   │   └── pdfExport.ts
│   ├── test/            # Test files
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── scripts/             # Utility scripts
│   └── import_linkedin.py
├── .env.example         # Environment template
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
├── vitest.config.ts     # Vitest config
├── .eslintrc.json       # ESLint config
├── .prettierrc.json     # Prettier config
└── package.json
```

## 🔧 Configuration

### Environment Variables

All environment variables are prefixed with `VITE_` to be accessible in the browser:

- **Contact Info**: `VITE_EMAIL`, `VITE_PHONE`, `VITE_WHATSAPP`
- **Social Links**: `VITE_GITHUB_USERNAME`, `VITE_LINKEDIN_URL`
- **Analytics**: `VITE_GA_TRACKING_ID`, `VITE_PLAUSIBLE_DOMAIN`
- **Email Service**: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

### LinkedIn Import

Import your LinkedIn profile data:

1. Export your LinkedIn data from Settings
2. Run the import script:
   ```bash
   cd scripts
   pip install -r requirements.txt
   python import_linkedin.py --input linkedin_profile.html --output ../src/data/linkedin.json
   ```

## 🚀 Deployment

### GitHub Pages

The site is configured to build to `docs/` folder for GitHub Pages:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Commit and push**
   ```bash
   git add docs/
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /docs
   - Save

4. **Custom domain** (optional)
   - Add your domain to `CNAME` file
   - Configure DNS with GitHub Pages IP addresses

## 🎨 Customization

### Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --bg: #071228;
  --text: #e6eef9;
  --primary: #38bdf8;
  --accent: #ff7a59;
  /* ... more colors */
}
```

### Components

All components are in `src/components/` and fully customizable.

### Data

Edit `src/data/resume.ts` to update your:
- Personal information
- Work experience
- Projects
- Skills
- Education
- Certifications

## 📝 Testing

Run tests with:

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Open Vitest UI
npm run test:coverage # Generate coverage report
```

Tests are located in `src/test/` directory.

## 🤝 Contributing

Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 👤 Author

**Elius Niwamanya**
- GitHub: [@s6ft256](https://github.com/s6ft256)
- LinkedIn: [Elius Niwamanya](https://linkedin.com/in/elius-niwamanya)
- Website: [elius.pro](https://elius.pro)

---

Built with ❤️ using React, TypeScript, and Vite
