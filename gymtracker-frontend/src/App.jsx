import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Importa todos tus componentes de página y layout
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import SessionsPage from './pages/SessionsPage';
import CreateSessionPage from './pages/CreateSessionPage';
import EditSessionPage from './pages/EditSessionPage';
import SessionDetailPage from './pages/SessionDetailPage';
import StatsPage from './pages/StatsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';
import CreateExercisePage from './pages/admin/CreateExercisePage';
import EditExercisePage from './pages/admin/EditExercisePage';
import ExerciseDetailPage from './pages/ExerciseDetailPage'; 


// Definimos la estructura de las rutas
const router = createBrowserRouter([
  // --- Rutas Públicas ---
    {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // --- Rutas Protegidas y con Layout ---
  {
    path: '/app', // La ruta raíz
    element: (
      <ProtectedRoute>
        <Layout /> 
      </ProtectedRoute>
    ),
    // Todas las rutas aquí dentro son "hijas" del Layout
    children: [
      { 
        index: true, 
        element: <Navigate to="/dashboard" replace /> 
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'exercises',
        element: <ExercisesPage />,
      },
      {
        path: 'exercises/:exerciseId',
        element: <ExerciseDetailPage />,
      },
      {
        path: 'sessions',
        element: <SessionsPage />,
      },
      {
        path: 'sessions/new',
        element: <CreateSessionPage />,
      },
      {
        path: 'sessions/:sessionId',
        element: <SessionDetailPage />,
      },
      {
        path: 'sessions/:sessionId/edit',
        element: <EditSessionPage />,
      },
      {
        path: 'stats',
        element: <StatsPage />,
      },
            {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          { path: 'exercises/new', element: <CreateExercisePage /> },
          { path: 'exercises/:exerciseId/edit', element: <EditExercisePage /> },
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;