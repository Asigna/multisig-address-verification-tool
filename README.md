# Asigna Multisig Address Verification Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)

The Verification Tool is an open-source utility designed to ensure that a multisig address is solely composed of designated owners and is free from any unauthorized internal or external keys that might permit access without the consent of the owners.

## 🌐 Live Demo

Visit the live application: [multisig-address-verification-tool.vercel.app](https://multisig-address-verification-tool.vercel.app/)

## ✨ Features

- **Bitcoin Multisig Verification**: Supports both Taproot (P2TR) and Native SegWit (P2WSH) address types
- **Stacks Multisig Verification**: Native support for Stacks blockchain multisig addresses
- **Network Support**: Works with both Mainnet and Testnet
- **Open Source**: Fully transparent address generation logic for security auditing

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Asigna/multisig-address-verification-tool.git
   cd multisig-address-verification-tool
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
yarn build
```

The built files will be in the `dist` directory.

## 🔧 How It Works

The tool regenerates a multisig address from the provided public keys and threshold, then compares it against the address you want to verify. This ensures:

1. The address is derived only from the specified owner public keys
2. No hidden or unauthorized keys are included
3. The threshold (M-of-N) configuration matches your expectations

### Supported Address Types

| Blockchain | Address Type | Description |
|------------|--------------|-------------|
| Bitcoin | P2TR (Taproot) | Uses MuSig public key aggregation |
| Bitcoin | P2WSH (Native SegWit) | Standard sorted multisig script |
| Stacks | Native | Built-in Stacks multisig feature |

## 🔒 Security

This tool uses audited multisig scripts. View the [Audit Reports](https://asigna.gitbook.io/asigna/appendix/asigna-audits) for more details.

## 📖 Documentation

For comprehensive documentation, visit:
- [Asigna Documentation](https://asigna.gitbook.io/asigna/bitcoin-multisig/quickstart)
- [Audit Reports](https://asigna.gitbook.io/asigna/appendix/asigna-audits)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Asigna Website](https://asigna.io/)
- [Documentation](https://asigna.gitbook.io/asigna/bitcoin-multisig/quickstart)
- [Report Issues](https://github.com/Asigna/multisig-address-verification-tool/issues)
