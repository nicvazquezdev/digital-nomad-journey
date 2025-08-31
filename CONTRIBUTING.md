# Contributing to Digital Nomad Journey 🌍

Thank you for your interest in contributing to this project! Whether you're fixing bugs, adding features, or improving documentation, your contributions are welcome.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/nicvazquezdev/digital-nomad-journey
   cd digital-nomad-journey
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Running the Development Server

```bash
npm run dev
```

This will:

- Generate image mappings
- Start the Next.js development server with Turbopack
- Open the app at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📝 How to Contribute

### 🐛 Bug Reports

Found a bug? Please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node.js version)

### ✨ Feature Requests

Have an idea? Open an issue with:

- Clear description of the feature
- Use case and benefits
- Any implementation ideas

### 🔧 Code Contributions

1. **Check existing issues** before starting work
2. **Comment on the issue** you'd like to work on
3. **Follow the coding standards** (see below)
4. **Write clear commit messages**
5. **Test your changes** thoroughly
6. **Submit a pull request**

## 🎯 Types of Contributions We're Looking For

### 💻 Technical Improvements

- Performance optimizations
- New UI components
- Enhanced animations
- Mobile experience improvements
- Accessibility enhancements

### 📚 Documentation

- README improvements
- Code comments
- API documentation
- Setup guides

### 🎨 Design

- UI/UX improvements
- New animations
- Better responsive design
- Accessibility features

## 📋 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Add proper type definitions
- Avoid `any` types when possible

### Code Style

- Follow the existing ESLint configuration
- Use Prettier for formatting
- Write self-documenting code
- Add comments for complex logic

### Components

- Use functional components with hooks
- Follow the existing component structure
- Keep components focused and reusable
- Use proper prop types

### File Organization

```
app/
├── components/         # Reusable UI components
├── data/              # Static data and types
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── api/               # API routes
```

## 🔍 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run linting**: `npm run lint`
4. **Build successfully**: `npm run build`
5. **Write a clear PR description**:
   - What changes were made
   - Why they were made
   - How to test them

### PR Title Format

- `feat: add new country data for Iceland`
- `fix: resolve image loading issue on mobile`
- `docs: update installation instructions`
- `style: improve responsive design for tablets`

## 🌟 Recognition

Contributors will be:

- Added to the acknowledgments section
- Credited in release notes for significant contributions
- Given priority for feature requests and bug reports

## 🚫 What We Don't Accept

- Changes that break existing functionality without good reason
- Code that doesn't follow the established patterns
- Large changes without prior discussion
- Content that violates our code of conduct

## 📞 Getting Help

- **Questions?** Open a discussion on GitHub
- **Stuck?** Comment on your issue or PR
- **Ideas?** Start a discussion in the Ideas category

## 🎉 Thank You!

Every contribution, no matter how small, makes this project better. Thank you for being part of the digital nomad community!

---

_Happy coding and safe travels! ✈️_
