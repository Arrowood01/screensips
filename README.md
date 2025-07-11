# ScreenSips 🍹

AI-powered drinking game generator for movies and TV shows. Generate hilarious drinking games and themed cocktails for your favorite entertainment.

## 🚀 Features

- **AI-Powered Game Generation**: Create unique drinking games for any movie or TV show
- **Themed Cocktails**: Get custom cocktail recipes that match your chosen entertainment
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **SEO Optimized**: Built with modern SEO best practices for organic growth
- **Accessibility First**: WCAG compliant with proper ARIA labels and semantic HTML

## 📁 Project Structure

```
ScreenSips/
├── Front End/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   │   ├── robots.txt       # SEO robots file
│   │   ├── sitemap.xml      # SEO sitemap
│   │   └── screensipslogo.png
│   └── package.json         # Frontend dependencies
├── api/                     # Vercel serverless functions
│   ├── generate-game.js     # Game generation API
│   └── health-check.js      # Health check endpoint
├── lib/                     # Shared utilities
│   ├── gemini.js           # AI integration
│   ├── supabase.js         # Database connection
│   └── validation.js       # Input validation
├── tools/                   # Development tools
│   ├── browser-automation.js
│   └── screenshot-logo.cjs
├── vercel.json             # Vercel deployment config
└── package.json            # Root dependencies
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Helmet Async** for SEO management
- **Lucide React** for icons

### Backend
- **Vercel Serverless Functions** (Node.js)
- **Google Gemini AI** for content generation
- **Supabase** for database (if needed)

### DevOps
- **Vercel** for hosting and deployment
- **Git** for version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ScreenSips
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd "Front End"
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   
   # Add your API keys
   GEMINI_API_KEY=your_gemini_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   cd "Front End"
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Development

### Available Scripts

**Frontend (in `Front End/` directory):**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Root directory:**
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build entire project
```

### Code Organization

#### Components
- **Layout.tsx**: Main layout wrapper with navigation
- **SEO.tsx**: Reusable SEO component for meta tags
- **ErrorBoundary.tsx**: Error handling component
- **TypewriterAnimation.tsx**: Animated text component

#### Pages
- **Home.tsx**: Main landing page with game generator
- **About.tsx**: About page with company information
- **TipJar.tsx**: Support/donation page
- **DrinkResponsibly.tsx**: Safety guidelines
- **Terms.tsx**: Terms of service
- **Privacy.tsx**: Privacy policy

#### API Functions
- **generate-game.js**: Main game generation endpoint
- **health-check.js**: Health monitoring endpoint

## 🎯 SEO Implementation

The project includes comprehensive SEO optimization:

- **Meta Tags**: Dynamic meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions

See `SEO_OPTIONS.md` for detailed SEO documentation.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the build settings
3. Deploy with `git push`

### Manual Deployment
```bash
# Build the project
cd "Front End"
npm run build

# Deploy to your preferred hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🍻 Responsible Drinking

ScreenSips is designed for adults of legal drinking age. Always drink responsibly and never drink and drive. See our [Drink Responsibly](/drink-responsibly) page for safety guidelines.

## 📞 Support

- **Website**: [screensips.com](https://screensips.com)
- **Support**: Contact us through our tip jar page
- **Issues**: Report bugs via GitHub Issues

---

**Made with ❤️ for entertainment lovers everywhere** 