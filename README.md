# Vikash Kumar - Portfolio

A high-performance, accessible, and visually stunning personal portfolio SPA built with React, Vite, and modern web technologies.

## 🎯 Mission

This portfolio is designed to showcase creative work while maintaining excellent performance, accessibility, and user experience. It targets Lighthouse scores of ≥90 for Performance and Accessibility, with best-effort SEO optimization.

## ✨ Features

- **Modern Tech Stack**: React 18, Vite, TailwindCSS, Framer Motion
- **3D Graphics**: Three.js via React Three Fiber with optional Spline integration
- **Smooth Animations**: GSAP ScrollTrigger + Lenis smooth scrolling
- **Custom Cursor**: Interactive cursor with magnetic effects
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Mobile-first approach with touch optimizations
- **Accessibility**: WCAG AA compliant with reduced motion support
- **Performance**: Code-splitting, lazy loading, optimized assets
- **Testing**: Jest + React Testing Library + Storybook
- **CI/CD**: GitHub Actions with lint, tests, and Lighthouse CI
- **Back to Top Button**: Smooth scroll to top functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   └── _headers           # CDN cache headers
├── src/
│   ├── assets/            # Images, models, etc.
│   ├── components/        # React components
│   │   ├── BackToTop/     # Back to top button
│   │   ├── CustomCursor/  # Custom cursor component
│   │   ├── Navbar/        # Navigation bar
│   │   ├── ThreeScene/    # 3D scene components
│   │   └── ...
│   ├── contexts/          # React contexts
│   ├── lib/               # Utilities and helpers
│   ├── pages/             # Page components
│   ├── styles/            # Global styles and tokens
│   └── tests/             # Test utilities
├── .github/workflows/     # CI/CD workflows
└── ...
```

## 🎨 Customization

### Personal Information

1. **SEO & Meta Data**: Update `src/components/SEOHead/SEOHead.jsx`
2. **About Page**: Edit `src/pages/About.jsx`
3. **Projects**: Replace sample projects in `src/pages/Projects.jsx`
4. **Contact Info**: Update `src/pages/Contact.jsx`
5. **Social Links**: Update Footer component and contact page

### 3D Scene

- **Custom Three.js Scene**: Modify `src/components/ThreeScene/SceneContent.jsx`
- **Spline Integration**: Add your Spline scene ID to `.env` and use `SplineLoader` component
- **GLTF Models**: Place models in `public/` and load via `loadGLTF` utility

### Styling

- **Design Tokens**: Edit `src/styles/tokens.css` for colors, spacing, motion
- **Theme**: Customize dark/light mode in `src/contexts/ThemeContext.jsx`
- **Tailwind**: Extend theme in `tailwind.config.js`

### Forms

Choose a form handler:

1. **EmailJS** (Recommended): See `EMAIL_SETUP.md` for detailed setup instructions
   - Add `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` to `.env`
   - Optionally set `VITE_EMAILJS_RECIPIENT_EMAIL` (defaults to vikashkumarsudhi8527@gmail.com)
2. **Formspree**: Add `VITE_FORMSPREE_ID` to `.env`
3. **Netlify Forms**: Add `netlify` attribute to form (no env var needed)
4. **Custom Endpoint**: Add `VITE_CONTACT_ENDPOINT` to `.env`

### Analytics

- **Plausible**: Add `VITE_PLAUSIBLE_DOMAIN` to `.env`
- **Google Analytics 4**: Add `VITE_GA4_MEASUREMENT_ID` to `.env`

## 🚢 Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite configuration
4. Deploy!

### Netlify

1. Push code to GitHub
2. In Netlify, create new site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Cloudflare Pages

1. Push code to GitHub
2. In Cloudflare Pages, create new project
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy!

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## 📊 Performance Targets

- **Lighthouse Performance**: ≥90
- **Lighthouse Accessibility**: ≥90
- **Lighthouse SEO**: ≥80 (best effort for SPA)
- **First Load JS**: <300KB gzipped
- **Time to Interactive**: <3.5s on 3G

### Performance Checklist

- [ ] Optimize images (use AVIF/WebP with fallbacks)
- [ ] Enable code splitting (already configured)
- [ ] Lazy load heavy components (Three.js, Spline)
- [ ] Preload critical fonts
- [ ] Minimize initial bundle size
- [ ] Use CDN for static assets
- [ ] Enable compression (gzip/brotli)
- [ ] Set cache headers (see `public/_headers`)

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

Tests are located alongside components with `.test.jsx` extension.

### Storybook

```bash
npm run storybook
```

View component stories at [http://localhost:6006](http://localhost:6006).

### Accessibility

- Run `npm run test` to execute accessibility tests
- Use browser DevTools Lighthouse for manual audits
- CI includes Lighthouse CI checks

## 🔧 Configuration

### Code Splitting

Vite automatically code-splits based on dynamic imports. Manual chunks are configured in `vite.config.js`:

- `react-vendor`: React, React DOM, React Router
- `animation-vendor`: Framer Motion, GSAP
- `three-vendor`: Three.js and React Three Fiber

### Linting & Formatting

- **ESLint**: Configured in `.eslintrc.cjs`
- **Prettier**: Configured in `.prettierrc`
- **Import Order**: Enforced via `eslint-plugin-import`

## 🐛 Troubleshooting

### Three.js not loading

- Ensure Three.js dependencies are installed: `npm install`
- Check browser console for errors
- Verify lazy loading is working (check Network tab)

### Cursor not appearing

- Custom cursor is disabled on touch devices (by design)
- Check `prefers-reduced-motion` setting
- Verify `useCursor` hook is working

### Build errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version: `node --version` (should be 18+)

## 📝 TODO Markers

Search for `TODO:` comments throughout the codebase to find places where you need to:

- Add personal information
- Replace sample content
- Add Spline scene IDs
- Configure form endpoints
- Add social media links
- Replace placeholder images

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this for your portfolio.

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Three.js](https://threejs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [TailwindCSS](https://tailwindcss.com/)

---

Built with ❤️ using modern web technologies
