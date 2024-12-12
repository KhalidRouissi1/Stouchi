# Stouchi

A modern expense tracking application that helps you manage your finances with ease, featuring 3D visualization, AI-powered insights, and a unique game-based rewards system.

## 🚀 **Project Overview**

Stouchi is a comprehensive financial management platform where users can:

- **Track Expenses**: Monitor daily, weekly, and monthly spending patterns
- **3D Visualization**: Interactive 3D wallet model for a unique financial visualization experience
- **AI-Powered Insights**: Get smart suggestions and analysis of your spending habits
- **Gamification**: Enjoy a Pacman-inspired mini-game as a reward system

## 🛠️ **Features**

- **Smart Expense Tracking**: Easily log and categorize your expenses with AI-assisted categorization
- **Interactive Dashboard**: View your financial data through intuitive charts and graphs
- **3D Wallet Visualization**: Unique Three.js-powered 3D wallet interface
- **Mini-Game**: Built-in Pacman-inspired game for an engaging user experience
- **Comprehensive Analytics**: Deep insights into spending patterns and financial habits

## 💻 **Technologies Used**

- **Frontend**: React.js with Vite for blazing-fast development
- **State Management & Routing**: 
  - TanStack Query for efficient data fetching
  - TanStack Router for type-safe routing
  - TanStack Form for form management
- **3D Rendering**: Three.js for 3D wallet visualization
- **Styling**: 
  - Tailwind CSS for responsive design
  - ShadCN UI for polished component library
- **Backend**: 
  - Hono for efficient API handling
  - RPC implementation for seamless client-server communication
- **Database**: 
  - Neon PostgreSQL for cloud-native storage
  - Drizzle ORM for type-safe database operations
- **AI Integration**: OpenAI for smart expense categorization and insights
- **Testing**: Comprehensive unit tests for reliability
- **Deployment**: Fly.io for cloud hosting

## 📚 **Getting Started**

### **Prerequisites**

Ensure you have installed:
- Node.js (v16 or higher)
- npm or pnpm
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/khalidrouissi/stouchi.git
   cd stouchi
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables.

## 📁 **Project Structure**

```
stouchi/
├── src/
│   ├── components/     # React components
│   ├── game/          # Pacman-inspired game files
│   ├── models/        # 3D models and Three.js components
│   ├── queries/       # TanStack Query definitions
│   ├── routes/        # TanStack Router configuration
│   └── utils/         # Utility functions
├── server/            # Hono backend
├── tests/             # Unit tests
└── README.md
```

## 🚦 **Development**

### **Available Scripts**

- **`pnpm dev`**: Start development server
- **`pnpm test`**: Run unit tests
- **`pnpm build`**: Build for production
- **`pnpm preview`**: Preview production build

### **Development Ports**
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

## 👤 **Contact**

For support or inquiries, contact:
- **Email**: [khalidrouissi7@gmail.com](mailto:khalidrouissi7@gmail.com)

## 🙏 **Acknowledgments**

Special thanks to:
- Aymen for the React training and mentorship
- The Hono Discord community for RPC implementation guidance
- Issa and Youssef for testing and feedback

---

If you find Stouchi helpful, please give it a ⭐ on GitHub!
