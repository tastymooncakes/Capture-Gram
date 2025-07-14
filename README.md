# CaptureGram 📸

A modern social media platform built with Next.js, featuring blockchain-powered photo sharing through the Numbers Protocol Capture SDK.

## ✨ Features

- **🔐 JWT Authentication** - Secure login with automatic token refresh
- **📷 Photo Feed** - Instagram-style infinite scroll feed with NFT products
- **👤 User Profiles** - Complete profile management with photo grids
- **🖼️ Image Modal** - Full-screen image viewer with metadata
- **📱 Responsive Design** - Mobile-first design with desktop sidebar navigation
- **⚡ Real-time Caching** - Powered by TanStack Query for optimal performance
- **🔗 Blockchain Integration** - View assets on blockchain explorers
- **🎨 Modern UI** - Built with Tailwind CSS and Lucide icons

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **API Integration:** Numbers Protocol Capture SDK
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Numbers Protocol Capture SDK account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/capturegram.git
   cd capturegram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Capture SDK credentials to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

1. **Login** - Enter your Capture SDK credentials
2. **Explore Feed** - Browse NFT products from the community  
3. **View Profile** - See your uploaded assets in grid or card view
4. **Click Photos** - Open full-screen modal with metadata
5. **Share Links** - Copy IPFS links to share photos

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── feed/              # Main feed page
│   ├── profile/           # User profile page
│   └── p/[id]/           # Individual photo pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   └── layout/           # Navigation & layout
├── lib/                  # Utilities & API clients
│   ├── api/             # API integration layer
│   └── hooks/           # Custom React hooks
└── providers/           # React context providers
```

## 🔧 Key Features Implementation

### Authentication
- JWT-based authentication with automatic refresh
- Secure session management with sessionStorage
- Protected routes with automatic redirects

### API Integration
- Centralized API client with automatic 401 handling
- Public and authenticated endpoint support
- Infinite scroll pagination with TanStack Query

### Responsive Design
- Desktop sidebar navigation
- Mobile bottom bar navigation  
- Responsive image modals and grids

### Performance
- Image thumbnail optimization
- Smart caching with TanStack Query
- Infinite scroll with intersection observer

## 🚧 Roadmap

- [ ] Image upload functionality
- [ ] Like and comment system  
- [ ] Search and explore features
- [ ] Real-time notifications
- [ ] Blockchain explorer integration
- [ ] Advanced image filters

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Numbers Protocol](https://numbersprotocol.io/) for the Capture SDK
- [Vercel](https://vercel.com/) for hosting and deployment
- [TanStack Query](https://tanstack.com/query) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

Your Name - [@Ethan35954202](https://twitter.com/Ethan35954202) - et.wuzz@gmail.com

Project Link: [https://github.com/yourusername/capturegram](https://github.com/tastymooncakes/Capture-Gram)

---

⭐ **Star this repo if you found it helpful!**
