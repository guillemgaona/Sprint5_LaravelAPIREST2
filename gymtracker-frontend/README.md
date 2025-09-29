# Event Frontend Client

## 📝 Description
A frontend client developed in React to consume the GymTracker API. It allows users to register, log in, track their workout sessions, log exercises and sets, and visualize their performance statistics. The application provides an intuitive and professional interface for managing fitness progress, built with modern tools and a focus on user experience.

## 🚀 Features
- User Authentication: Secure registration and login flow using JWT with Laravel Passport.
- Dashboard: A central control panel for navigating the application.
- Exercise Browser: A paginated list of all available exercises.
- Admin CRUD for Exercises: Admins can create, update, and delete exercises.
- Session Tracking: Users can log, view, update, and delete their training sessions.
- Set Tracking: Full CRUD functionality for sets (reps, weight) within each training session detail page.
- Performance Statistics: A dedicated page to visualize user stats like training volume, frequency, and personal records.
- Responsive UI: A modern layout with a top navigation bar and a hover-activated sidebar.
- Dark Mode: A user-toggleable light/dark theme for a comfortable viewing experience.

## 🛠️ Technologies Used
- Vite: A next-generation frontend tooling for fast development and optimized builds.
- React 18.2.0: The core library for building the user interface.
- React Router DOM 6: For client-side routing and navigation.
- Chakra UI: A comprehensive component library for building an accessible and visually appealing UI.
- Context API: For global state management, specifically for user authentication.
- Axios: For making clean and efficient HTTP requests to the Laravel backend.
- React Icons: For a rich set of icons used throughout the application.

## 📦 Installation

**Clone the repository**
```bash
git clone https://github.com/guillemgaona/Sprint5_LaravelAPIREST2.git
```

**Navigate to the project directory**
```bash
cd gymtracker-frontend
```

**Install dependencies**
```bash
npm install
```

**Start the development server (usually on http://localhost:5173)**
```bash
npm run dev
```

## 🏗️ Project Structure
```bash
src/
├── api/          # Services for API calls (axiosInstance, authService, etc.)
├── components/   # Reusable components (Layout, Navbar, Sidebar, etc.)
├── context/      # React Context for global state (AuthContext)
├── hooks/        # Custom hooks (useAuth, useDebounce)
├── pages/        # Main page components (LoginPage, DashboardPage, etc.)
├── App.jsx       # Main application component with router configuration
└── main.jsx      # The entry point of the React application
```

## 🔧 Configuration
The project requires an environment file to connect with the backend API.

- Create a file named `.env` in the root of the `gymtracker-frontend` directory.
- Add the following variable, pointing to the URL of your running Laravel API server:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

This ensures that all API requests made with Axios are directed to the correct backend server.

## 🎨 UI Features
- Fully responsive design built with Chakra UI, adapting to desktop and mobile screens.
- A modern layout featuring a persistent top Navbar and a hover-activated Sidebar for navigation.
- A user-toggleable Dark Mode that persists across sessions.
- "Skeleton" loading states on data-heavy pages for an improved user experience.
- Interactive and intuitive forms for creating and editing user data.

