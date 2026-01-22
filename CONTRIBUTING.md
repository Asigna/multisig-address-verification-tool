# Contributing to Asigna Multisig Address Verification Tool

First off, thank you for considering contributing to this project! 🎉

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Enhancements

We welcome feature suggestions! Please open an issue with:

- A clear description of the enhancement
- Why this would be useful
- Any implementation ideas you might have

### Pull Requests

1. **Fork the repository** and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Make your changes** and ensure:
   - Code follows the existing style
   - You've tested your changes locally
   - ESLint passes: `yarn lint`

4. **Commit your changes** with a clear commit message:
   ```bash
   git commit -m "Add: description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** with:
   - A clear title and description
   - Reference to any related issues

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/multisig-address-verification-tool.git
cd multisig-address-verification-tool

# Install dependencies
yarn install

# Start development server
yarn dev

# Run linting
yarn lint

# Build for production
yarn build
```

## Code Style

- We use TypeScript for type safety
- Follow existing code patterns and naming conventions
- Use meaningful variable and function names
- Add comments for complex logic

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── utils/          # Utility functions (address generation, etc.)
├── assets/         # Images and icons
└── types/          # TypeScript type definitions
```

## Questions?

Feel free to open an issue for any questions or concerns.

Thank you for contributing! 🙏
