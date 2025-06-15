// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import SessionsPage from './pages/SessionsPage';
import CreateSessionPage from './pages/CreateSessionPage';
import SessionDetailPage from './pages/SessionDetailPage'; // <-- Importar
import StatsPage from './pages/StatsPage'; // <-- Importar
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

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
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'exercises', element: <ExercisesPage /> },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/new', element: <CreateSessionPage /> },
      { path: 'sessions/:sessionId', element: <SessionDetailPage /> }, // <-- Ruta nueva
      { path: 'stats', element: <StatsPage /> }, // <-- Ruta nueva
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;