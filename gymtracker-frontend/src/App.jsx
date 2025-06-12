// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Aquí iría la ruta de registro
  // {
  //   path: '/register',
  //   element: <RegisterPage />,
  // },
  {
    path: '/',
    element: <ProtectedRoute />, // Este elemento protege todas las rutas anidadas
    children: [
      {
        path: 'dashboard', // Ruta relativa, será /dashboard
        element: <DashboardPage />,
      },
      // Aquí añadirás más rutas protegidas, ej: /exercises, /sessions/:id
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;