// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Importar
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage'; // Importar
import SessionsPage from './pages/SessionsPage';   // Importar
import CreateSessionPage from './pages/CreateSessionPage'; // Importar
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // Importar

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> }, // Redirigir de / a /dashboard
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'exercises', element: <ExercisesPage /> },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/new', element: <CreateSessionPage /> },
      // { path: 'sessions/:id', element: <SessionDetailPage /> }, // Añadiremos esta después
      // { path: 'stats', element: <StatsPage /> }, // Añadiremos esta después
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;