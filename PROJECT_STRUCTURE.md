# ScreenSips Project Structure

## Overview

ScreenSips is organized as a monorepo with a React frontend and Vercel serverless backend. The project follows modern development practices with clear separation of concerns and maintainable code structure.

## Directory Structure

```
ScreenSips/
├── 📁 Front End/                    # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable React components
│   │   │   ├── Layout.tsx         # Main layout wrapper
│   │   │   ├── SEO.tsx            # SEO management component
│   │   │   ├── ErrorBoundary.tsx  # Error handling
│   │   │   └── TypewriterAnimation.tsx
│   │   ├── 📁 pages/              # Page components
│   │   │   ├── Home.tsx           # Main landing page
│   │   │   ├── About.tsx          # About page
│   │   │   ├── TipJar.tsx         # Support page
│   │   │   ├── DrinkResponsibly.tsx
│   │   │   ├── Terms.tsx          # Terms of service
│   │   │   └── Privacy.tsx        # Privacy policy
│   │   ├── 📁 types/              # TypeScript type definitions
│   │   │   └── index.ts           # Centralized types
│   │   ├── 📁 utils/              # Utility functions
│   │   │   ├── api.ts             # API utilities
│   │   │   └── constants.ts       # Application constants
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── 📁 public/                 # Static assets
│   │   ├── robots.txt             # SEO robots file
│   │   ├── sitemap.xml           # SEO sitemap
│   │   └── screensipslogo.png    # Logo
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   └── tsconfig.json              # TypeScript config
├── 📁 api/                        # Vercel serverless functions
│   ├── generate-game.js           # Main game generation API
│   └── health-check.js            # Health check endpoint
├── 📁 lib/                        # Shared utilities
│   ├── gemini.js                  # AI integration
│   ├── supabase.js                # Database connection
│   └── validation.js              # Input validation
├── 📁 tools/                      # Development tools
│   ├── browser-automation.js      # Browser automation
│   ├── screenshot-logo.cjs        # Logo generation
│   └── README.md                  # Tools documentation
├── 📄 README.md                   # Project documentation
├── 📄 PROJECT_STRUCTURE.md        # This file
├── 📄 SEO_OPTIONS.md              # SEO documentation
├── 📄 package.json                # Root package.json
├── 📄 vercel.json                 # Vercel deployment config
└── 📄 .gitignore                  # Git ignore rules
```

## Code Organization Principles

### 1. Separation of Concerns
- **Frontend**: React components and UI logic
- **Backend**: API endpoints and business logic
- **Shared**: Utilities and types used across the application

### 2. Type Safety
- All TypeScript interfaces are centralized in `src/types/index.ts`
- Strict typing throughout the application
- Proper error handling with typed responses

### 3. Component Architecture
- **Layout Components**: Handle page structure and navigation
- **Page Components**: Individual page implementations
- **Utility Components**: Reusable UI components
- **SEO Components**: Handle meta tags and structured data

### 4. API Organization
- **Centralized API calls**: All API functions in `utils/api.ts`
- **Error handling**: Consistent error formatting and display
- **Validation**: Input validation before API calls

### 5. Configuration Management
- **Constants**: All configuration values in `utils/constants.ts`
- **Environment variables**: Proper .env management
- **Build configuration**: Vite and Vercel configs

## File Naming Conventions

### Components
- **PascalCase**: `Layout.tsx`, `Home.tsx`
- **Descriptive names**: Clear purpose indication
- **Consistent structure**: Props interface, component, export

### Utilities
- **camelCase**: `api.ts`, `constants.ts`
- **Functional names**: Clear purpose indication
- **Single responsibility**: One purpose per file

### Types
- **Interface naming**: `ComponentProps`, `ApiResponse`
- **Descriptive names**: Clear type indication
- **Grouped by domain**: Related types together

## Development Workflow

### 1. Adding New Features
1. Define types in `src/types/index.ts`
2. Add constants in `src/utils/constants.ts`
3. Create API functions in `src/utils/api.ts`
4. Build components in `src/components/`
5. Create pages in `src/pages/`

### 2. Code Quality
- **ESLint**: Consistent code style
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Consistent formatting
- **Error boundaries**: Graceful error handling

### 3. Testing Strategy
- **Component testing**: React Testing Library
- **API testing**: Vercel function testing
- **E2E testing**: Playwright or Cypress
- **Performance**: Lighthouse CI

## Build and Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Deployment
- **Vercel**: Automatic deployment from Git
- **Environment variables**: Proper .env management
- **Build optimization**: Vite production builds
- **CDN**: Static asset optimization

## Performance Considerations

### 1. Code Splitting
- **Route-based**: Each page loads independently
- **Component-based**: Heavy components lazy loaded
- **Bundle analysis**: Regular bundle size monitoring

### 2. Caching Strategy
- **Static assets**: Long-term caching
- **API responses**: Appropriate cache headers
- **Service worker**: Offline functionality

### 3. SEO Optimization
- **Meta tags**: Dynamic per page
- **Structured data**: JSON-LD implementation
- **Sitemap**: Automatic generation
- **Robots.txt**: Proper crawl instructions

## Security Considerations

### 1. Input Validation
- **Client-side**: Immediate feedback
- **Server-side**: API validation
- **Sanitization**: XSS prevention

### 2. API Security
- **Rate limiting**: Prevent abuse
- **CORS**: Proper cross-origin handling
- **Authentication**: Future implementation

### 3. Data Protection
- **Environment variables**: Sensitive data protection
- **HTTPS**: Secure communication
- **Privacy**: GDPR compliance

## Maintenance

### 1. Dependencies
- **Regular updates**: Security patches
- **Version locking**: Reproducible builds
- **Audit**: Security vulnerability scanning

### 2. Monitoring
- **Error tracking**: Sentry integration
- **Performance**: Core Web Vitals
- **Analytics**: User behavior tracking

### 3. Documentation
- **Code comments**: Complex logic explanation
- **API documentation**: Endpoint descriptions
- **Deployment guides**: Setup instructions

---

*This structure ensures maintainable, scalable, and performant code while following modern development best practices.* 