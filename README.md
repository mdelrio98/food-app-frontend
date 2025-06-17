# Food Delivery App - Frontend

This is the frontend for a modern and responsive Food Delivery application, built with React, Vite, and TypeScript. It's designed to be a showcase project for a portfolio, demonstrating best practices in frontend development, state management, and API integration.

## ✨ Key Features

- **Browse Meals:** View a list of available meals fetched from the backend.
- **Shopping Cart:** Add and remove items from the cart.
- **User Authentication:** (Planned/In-Progress) User registration and login.
- **Order Placement:** (Planned/In-Progress) Place food orders.
- **Responsive Design:** A mobile-first approach ensuring the app looks great on all devices.
- **Global State Management:** Centralized state management with Redux Toolkit.
- **API Mocking:** Uses `axios-mock-adapter` for development and testing without a live backend.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Styling:** [Material-UI (MUI)](https://mui.com/) (Assumed as per best practices)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [Notistack](https://iamhosseindhv.com/notistack) (Assumed as per best practices)
- **Linting/Formatting:** ESLint & Prettier

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [Yarn](https://yarnpkg.com/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd food-app-frontend
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Run the development server:**
   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

## 📂 Project Structure

The project follows a feature-driven and domain-separated structure to ensure scalability and maintainability.

```
src/
├── api/           # API service definitions (e.g., apiService.ts)
├── assets/        # Static assets like images, fonts
├── components/    # Reusable UI components (e.g., Button, Input, Layout)
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks (e.g., useNotifier)
├── mocks/         # API mocks for development (axiosMock.ts)
├── pages/         # Page components (e.g., HomePage, LoginPage)
├── services/      # Core services (e.g., axiosInstance.ts)
├── store/         # Redux Toolkit store, slices, and actions
│   ├── slices/    # Feature-based slices (e.g., authSlice.ts)
│   └── index.ts   # Store configuration
├── styles/        # Global styles and theme configuration
├── types/         # TypeScript type definitions (api.ts, auth.ts)
└── utils/         # Utility functions
```

---

This is a food app created in the Udemy Course of React. Using hooks.
Http requests. Connected to Firebase. Handling errors and Custom Forms.
