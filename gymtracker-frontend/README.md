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

## 🤖 AI Model Description

### Why Gemini 2.5 Pro?
Gemini 2.5 Pro offers several advantages for coding, including enhanced reasoning, advanced coding capabilities, and a large context window. It's designed as a "thinking model," enabling more accurate debugging, better architectural recommendations, and higher-quality code generation. Its ability to handle long contexts makes it suitable for working with vast datasets and complex projects. Additionally, Gemini 2.5 Pro excels at web development tasks, allowing for easier feature implementation and visually appealing application development.

Here is an example of a benchmark compared with others AIs:

https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/#advanced-coding

## 🤖 Registro de Interacciones con la IA

### Fase 1: Configuración Inicial del Proyecto Frontend

#### Primera Interacción: Creación del Proyecto React

##### 🗨️ Prompt:
> ¿Cómo puedo crear un nuevo proyecto React desde cero para empezar a desarrollar el frontend de mi aplicación de Gym Tracker?

##### 🤖 Respuesta de Gemini:
**Configuración Inicial del Proyecto (Setup)**

**Paso 1.1: Requisitos**  
Node.js (versión 18 o superior) y npm. Puedes descargarlo desde [nodejs.org](https://nodejs.org).

**Paso 1.2: Crear el Proyecto con Vite**
```bash
npm create vite@latest gymtracker-frontend -- --template react
```

**Paso 1.3: Instalar Dependencias**
```bash
cd gymtracker-frontend
npm install
npm install react-router-dom axios @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

**Paso 1.4: Configurar Variables de Entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
# .env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

> Importante: Vite requiere que las variables de entorno expuestas al cliente empiecen con el prefijo `VITE_`.

#### Segunda Interacción: Diseño de la Página Principal

##### 🗨️ Prompt:
> Necesito la estructura de carpetas del proyecto

##### 🤖 Respuesta de Gemini:
**Estructura del Proyecto**
```bash
gymtracker-frontend/
└── src/
    ├── api/                 # Peticiones a la API (instancia de Axios, servicios)
    │   ├── axiosInstance.js
    │   └── authService.js
    ├── components/          # Componentes reutilizables (Navbar, Layout, etc.)
    │   ├── Layout.jsx
    │   └── ProtectedRoute.jsx
    ├── context/             # React Context para estado global
    │   └── AuthContext.jsx
    ├── hooks/               # Hooks personalizados
    │   └── useAuth.js
    ├── pages/               # Componentes que representan páginas completas
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   └── DashboardPage.jsx
    ├── App.jsx              # Configuración principal de rutas
    └── main.jsx             # Archivo de entrada de la aplicación
```

### Fase 3: Comprensión de React

#### Tercera Interacción: Explicación de Conceptos

##### 🗨️ Prompt:
> para que sirve la carpeta api con los archivos Service y AxiosInstance?

##### 🤖 Respuesta de Gemini:
**La carpeta `api` y sus archivos son clave para separar responsabilidades y mantener el código limpio.**

**1. `axiosInstance.js`**  
Tu "mensajero" personalizado:

```js
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**2. Servicios como `authService.js`**  
Cada servicio se encarga de comunicarse con un endpoint específico:

```js
// authService.js
import axiosInstance from './axiosInstance';

export const loginUser = (data) => axiosInstance.post('/api/login', data);
```

**Ventajas:**
- Código limpio y mantenible.
- Abstracción: los componentes no se preocupan de URLs ni tokens.
- Reutilización: múltiples páginas pueden usar el mismo servicio.

---

### 🧠 Análisis del Código Generado por IA

#### ✅ Puntos Fuertes

- **React moderno con Hooks**  
  - Componentes funcionales y uso correcto de hooks (`useState`, `useContext`, `useEffect`).
  
- **UI profesional y responsiva con Chakra UI**  
  - Estilo coherente y adaptable.
  - Navegación moderna con sidebar colapsable.

- **Arquitectura escalable y limpia**  
  - Separación clara entre lógica de datos (`/api`) y presentación (`/components`, `/pages`).
  - `axiosInstance` maneja tokens automáticamente.
  - Contexto global en `/context`.

#### 🔁 Iteraciones y Mejoras

- **Sincronización de roles desde el backend**  
  - Se actualizó el `UserResource` y `AuthController` en Laravel para incluir roles.

- **Control de estado asincrónico**  
  - Se mejoraron los `useEffect` en páginas como "Stats" para evitar llamadas con `undefined`.

---



