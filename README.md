# AlterCode — Official Website & Showcase

<div align="center">
  <img src="/client/src/assets/images/altercodelogo.png" alt="AlterCode Logo" width="96" height="96" style="border-radius: 20px; margin-bottom: 16px;" />
  <br />
  <strong>Code that moves at your speed.</strong>
  <p>The interactive product website and landing page for AlterCode — the AI-powered developer tool and code assistant built for mobile devices.</p>
</div>

---

## 🌟 Overview

**AlterCode** is an AI-powered code converter and developer assistant designed specifically for mobile workflows. It allows developers to refactor, translate, debug, and understand code across 12+ programming languages on the devices they carry every day.

This repository powers the official web presence for AlterCode, offering a sleek, performant product presentation with interactive 3D WebGL typography, product walkthroughs, architecture diagrams, and official download links.

---

## ✨ Website Features

- **Interactive 3D FlatText Typography**: Built using Three.js and custom vertex/fragment shaders, headers dynamically tilt, drift, and elevate in response to pointer interactions.
- **Atmospheric Midnight Theme**: A cohesive dark aesthetic featuring midnight ink (`#050b1a`), navy surfaces (`#0d1a34`), and glowing electric blue/cyan radial gradients.
- **Store Download Badges**: Direct access to the Android Google Play Store release alongside Apple App Store availability indicators.
- **Embedded Product Video**: macOS-style chrome window with embedded product video demonstrating the mobile application in action.
- **Comprehensive Feature Grid**: Highlights idiomatic code translation, dual-engine routing (Groq for ultra-low latency + Gemini for deep reasoning), and edge-routed response times (~140ms).
- **Privacy & Security Showcase**: Outlines the app's zero-cloud-retention philosophy, AES-256 SQLite local vaults, and Android Keystore encryption.
- **Built-in Legal & Sitemap Pages**: Dedicated in-app routes for Privacy Policy (`/privacy-policy`), Terms & Conditions (`/terms`), and an XML/HTML-accessible Sitemap (`/sitemap`).
- **Fully Responsive & Accessible**: Optimized for desktop monitors, tablets, and smartphones, with smooth scroll navigation and accessible ARIA attributes.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom CSS custom properties and utility classes
- **3D Graphics & Canvas**: [Three.js](https://threejs.org/) for interactive WebGL text distortion effects
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Server**: [Express](https://expressjs.com/) for production static serving and API routing proxy
- **Fonts**: DM Sans, DM Serif Display, and Space Mono

---

## 📁 Project Structure

```text
├── client/
│   ├── index.html              # HTML entry point with metadata & JSON-LD schema
│   ├── src/
│   │   ├── assets/             # Logos, badges, and media assets
│   │   ├── components/
│   │   │   └── FlatText.tsx    # Interactive Three.js WebGL 3D text renderer
│   │   ├── App.tsx             # Main application layout, sections & routing
│   │   ├── index.css           # Global Tailwind & design system theme styles
│   │   └── main.tsx            # React application entry point
├── server/
│   ├── index.ts                # Express server entry point
│   └── routes.ts               # Server-side API & routing helpers
├── metadata.json               # AI Studio project configuration & capabilities
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **bun**

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/AlterCode-AI/altercode-app.git
   cd altercode-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   The site will be live at `http://localhost:3000`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port 3000 |
| `npm run build` | Compiles client assets and bundles the server for production |
| `npm run start` | Runs the compiled production server (`dist/index.js`) |
| `npm run preview` | Previews the production build locally |
| `npm run lint` / `npm run check` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run format` | Formats all source files with Prettier |

---

## 🔒 Privacy & Architecture

AlterCode is designed around local privacy:
- **Local Vault**: Code history is stored in an encrypted SQLite database on-device using SQLCipher.
- **Keystore Backed**: Encryption keys are hardware-backed via the Android Keystore system.
- **Zero Cloud History**: Requests are routed statelessly to the best-fit inference engine and are never stored or used for model training.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Made by **Ramzes** · © 2026 AlterCode
