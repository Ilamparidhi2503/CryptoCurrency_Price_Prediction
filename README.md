# CryptoPredict AI

A full-stack web application that uses machine learning to predict cryptocurrency price trends.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-predict-ai.git
cd crypto-predict-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Development in VS Code

1. Open the project folder in VS Code:
```bash
code .
```

2. Install recommended VS Code extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)

3. Use the integrated terminal in VS Code to run commands:
   - Press `Ctrl+`` (backtick) to open the terminal
   - Run `npm run dev` to start the development server

4. The development server features:
   - Hot Module Replacement (HMR) for instant updates
   - Error overlay for debugging
   - Source maps for debugging

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Application pages
  - `/layouts` - Layout components
  - `/contexts` - React context providers
  - `/hooks` - Custom React hooks
  - `/data` - Mock data and API utilities

## Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder.

## License

MIT
