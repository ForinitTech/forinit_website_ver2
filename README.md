# Forinit | DIA - Autonomous AI Data Ops

<div align="center">
  <img width="1200" height="475" alt="Forinit Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🚀 Overview

**Forinit** is an AI company developing **DIA** (Data Intelligence Automation), a chat-first, multi-agent platform that autonomously replaces manual data engineering and operations. This repository contains the official Forinit website showcasing our flagship product and company mission.

The website features a modern, minimalist design with advanced interactive elements including:
- 3D rotating globe visualization with mouse-tracking
- Interactive video demonstrations
- Smooth scroll-reveal animations
- Terminal-style UI elements
- Glassmorphic design components

## ✨ Features

### 🎨 **Hero Section**
- Background video with overlay for text readability
- Commented-out 3D interactive globe canvas with physics-based particle system
- Mouse-tracking interactions with proximity-based highlighting
- Responsive typography with reveal animations
- System status indicators

### 🎯 **Mission Section**
- Three-column grid showcasing company ethos
- Interactive hover effects with blur transitions
- "Create, Develop, Lead" philosophy breakdown

### 🤖 **DIA Product Showcase**
- 3D tilt-effect video container with mouse tracking
- Auto-play video on scroll into view
- Browser chrome UI mockup
- Glossy reflection overlay effects
- Live status badges (AI_AGENT_ACTIVE, PROCESSING)
- Feature specifications grid

### 👥 **Team Section**
- Animated terminal window with typewriter effect
- Company principles and values display
- Minimalist "small team, massive scale" messaging

### 📱 **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-optimized interactions

## 🛠️ Technology Stack

- **Framework:** React 19.2.3 with TypeScript
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)
- **Animations:** Custom CSS transitions with Intersection Observer API
- **3D Graphics:** HTML5 Canvas with custom physics engine

## 📁 Project Structure

```
forinit_website_ver2/
├── components/
│   ├── Navbar.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with 3D globe
│   ├── Mission.tsx         # Company ethos section
│   ├── DIAProduct.tsx      # Product showcase with 3D tilt
│   ├── Team.tsx            # Team/about section
│   ├── Footer.tsx          # Footer component
│   └── Logo.tsx            # Company logo component
├── App.tsx                 # Main app component
├── index.tsx               # React entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── dia_demo.mp4            # Product demo video
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd forinit_website_ver2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create or update `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Key Components

### Hero Component
- **3D Globe Visualization:** Fibonacci sphere algorithm with 400 points
- **Flowing Particles:** 40 animated particles traveling along mesh edges
- **Mouse Interaction:** Real-time rotation and proximity-based highlighting
- **Background Video:** Looping technology-themed video with overlay

### DIAProduct Component
- **3D Tilt Effect:** CSS transform-based perspective tilt following mouse
- **Auto-play Video:** Intersection Observer triggers video playback
- **Glossy Overlay:** Radial gradient following mouse position
- **Browser Chrome:** Realistic macOS-style window decoration

### Mission Component
- **Interactive Grid:** Three-column layout with hover blur effects
- **Staggered Animations:** Delayed reveal animations for visual flow

### Team Component
- **Typewriter Effect:** Simulated terminal typing animation
- **Animated Terminal:** Realistic command-line interface mockup

## 🎯 Design Philosophy

The website embodies Forinit's core values:
- **Minimalism:** Clean, uncluttered design with purposeful whitespace
- **Technical Excellence:** Advanced interactions showcasing engineering prowess
- **Premium Feel:** High-quality animations and micro-interactions
- **Performance:** Optimized rendering and smooth 60fps animations

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Copyright © 2024 Forinit. All rights reserved.

## 🔗 Links

- **AI Studio App:** https://ai.studio/apps/drive/1NPzcInHucIW0gvBzllPNhmdjLyPdnUwm
- **Company:** Forinit - The Technical Studio
- **Product:** DIA - Autonomous AI Data Ops

---

**Built with precision. Engineered for scale.**
