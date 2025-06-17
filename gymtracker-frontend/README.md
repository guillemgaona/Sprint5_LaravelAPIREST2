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
git clone https://github.com/guillemgaona/Sprint5_LaravelAPIREST2.git

**Navigate to the project directory**
cd gymtracker-frontend

**Install dependencies**
npm install

**Start the development server (usually on http://localhost:5173)**
npm run dev
```

## 🏗️ Project Structure
```
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

- Create a file named .env in the root of the gymtracker-frontend directory.
- Add the following variable, pointing to the URL of your running Laravel API server:

VITE_API_BASE_URL=http://127.0.0.1:8000

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
 Configuración Inicial del Proyecto (Setup)
Paso 1.1: Requisitos
Node.js (versión 18 o superior) y npm. Puedes descargarlo desde nodejs.org.
Paso 1.2: Crear el Proyecto con Vite
Abre tu terminal (fuera de la carpeta de tu proyecto de Laravel) y ejecuta:

Bash

npm create vite@latest gymtracker-frontend -- --template react
Esto creará una nueva carpeta gymtracker-frontend con un proyecto de React básico.

Paso 1.3: Instalar Dependencias
Navega a la nueva carpeta e instala las dependencias necesarias:

Bash

cd gymtracker-frontend
npm install
npm install react-router-dom axios @chakra-ui/react @emotion/react @emotion/styled framer-motion
react-router-dom: Para las rutas.
axios: Para las peticiones a la API.
@chakra-ui/react y sus dependencias: Nuestra librería de componentes UI.
Paso 1.4: Configurar Variables de Entorno
Crea un archivo llamado .env en la raíz de tu proyecto gymtracker-frontend. Dentro, añade la URL de tu API de Laravel:

Fragmento de código

# .env
VITE_API_BASE_URL=http://127.0.0.1:8000
Importante: Vite requiere que las variables de entorno expuestas al cliente empiecen con el prefijo VITE_.

#### Segunda Interacción: Diseño de la Página Principal

##### 🗨️ Prompt:
> Necesito la estructura de carpetas del proyecto

##### 🤖 Respuesta de Gemini:
Estructura del Proyecto
Una buena organización de carpetas es clave. Te recomiendo la siguiente estructura dentro de la carpeta src/:

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


### Fase 3: Comprensión de React

#### Tercera Interacción: Explicación de Conceptos

##### 🗨️ Prompt:
> para que sirve la carpeta api con los archivos Service y AxiosInstance?


##### 🤖 Respuesta de Gemini:

¡Excelente pregunta! Esa carpeta api y los archivos que contiene son una parte fundamental para que tu proyecto de frontend esté limpio, organizado y sea fácil de mantener a largo plazo.

Su propósito es centralizar y gestionar toda la comunicación con tu API de Laravel. En lugar de hacer llamadas a la API directamente desde tus componentes de React, creamos una capa de abstracción.

Vamos a ver para qué sirve cada parte.

1. El Archivo axiosInstance.js (El "Mensajero" Configurado)
Piensa en este archivo como tu "mensajero" personal y pre-configurado. En lugar de darle las mismas instrucciones básicas cada vez que lo envías a hacer un recado, ya las tiene memorizadas.

Sus dos tareas principales son:

Conocer la Dirección Base:

JavaScript

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ej: http://127.0.0.1:8000
});
Gracias a esto, en el resto de tu código no necesitas escribir la URL completa. En lugar de axios.get('http://127.0.0.1:8000/api/exercises'), simplemente escribes axiosInstance.get('/api/exercises'). Si en el futuro tu API cambia de dirección, solo tienes que cambiarla en un único sitio: el archivo .env.

Añadir el Token de Autenticación Automáticamente (La Magia):

JavaScript

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
Esto es un "interceptor". Actúa como un punto de control por el que pasa toda petición saliente. Antes de que la petición se envíe, este código se ejecuta, busca el token en el localStorage y, si lo encuentra, lo añade automáticamente al header Authorization. Esto significa que nunca más tendrás que preocuparte por añadir el token manualmente en cada llamada a una ruta protegida.

2. Los Archivos ...Service.js (Los "Departamentos" Especializados)
Si axiosInstance es tu mensajero, los archivos como exerciseService.js, sessionService.js, etc., son como los departamentos de tu empresa. Cada uno se especializa en un tipo de tarea.

exerciseService.js: Sabe todo sobre cómo hablar con los endpoints de /api/exercises.
sessionService.js: Sabe todo sobre los endpoints de /api/sessions.
authService.js: Se especializa en /api/login y /api/register.
Las ventajas de esta organización son enormes:

Código Limpio y Organizado: Si necesitas cambiar algo sobre cómo se obtienen los ejercicios, sabes exactamente que tienes que ir a exerciseService.js. No tienes que buscar en 10 componentes diferentes.

Abstracción (Ocultar Detalles): Tus componentes de React no necesitan saber que estás usando axios, ni cuál es la URL exacta, ni cómo se adjuntan los headers. Un componente simplemente "pide" los datos de una forma muy legible.

Sin un servicio (dentro de un componente):

JavaScript

// Esto es más difícil de leer y mantener
const token = localStorage.getItem('authToken');
axios.get('http://127.0.0.1:8000/api/exercises?page=1', {
    headers: { Authorization: `Bearer ${token}` }
}).then(...)
Con un servicio (dentro de un componente):

JavaScript

// Mucho más limpio y descriptivo
import { fetchExercises } from '../api/exerciseService';

fetchExercises(1).then(...)
Reutilización: Si varias páginas diferentes necesitaran mostrar la lista de ejercicios, todas importarían y usarían la misma función fetchExercises del servicio, asegurando que la lógica sea consistente en toda la aplicación.

En Resumen
La carpeta api separa las responsabilidades de tu aplicación:

Componentes React (/pages, /components): Se encargan de la vista (qué mostrar y cómo se ve).
Servicios API (/api): Se encargan de la comunicación y la lógica de datos (cómo y dónde obtener la información).
Esta separación hace tu código más profesional, menos repetitivo y mucho más fácil de escalar y depurar en el futuro.

##### 🗨️ Prompt:
> para que sirve la carpeta api con los archivos Service y AxiosInstance?

##### 🤖 Respuesta de Gemini:
Los Hooks son la forma moderna de escribir componentes en React. Te permiten:

Añadir estado y lógica compleja a componentes simples (funciones).
Separar la lógica del renderizado, haciendo el código más limpio y fácil de leer.
Reutilizar lógica de estado entre diferentes componentes creando tus propios Hooks personalizados.
Son la herramienta que transforma simples funciones de JavaScript que devuelven HTML en componentes de UI potentes y dinámicos.

###Analysis of the AI-Generated Code

### Strengths

- **Modern React with Functional Components and Hooks:** 
  - The entire application was built using modern functional components, avoiding legacy class components.
  - Clean and effective use of React Hooks to manage state, side effects, and context:
  
- **Responsive and Professional UI with Chakra UI:** 
  - The user interface was built entirely with Chakra UI, a comprehensive component library that ensures a consistent, professional, and accessible design.
  - The layout is fully responsive, utilizing responsive style props (display={{ base: 'none', md: 'flex' }}) to adapt the navigation from a full navbar on desktop to a hamburger-menu-controlled       sidebar on mobile.
  - Advanced UI patterns, like the hover-activated Drawer component for the sidebar, provide a modern and fluid user experience.
  
- **Clean and Scalable Architecture:** 
  - The project follows a strong Separation of Concerns principle.
  - API Layer (src/api): All HTTP request logic is centralized in service files (authService.js, exerciseService.js, etc.). Components are decoupled from axios, making them cleaner and easier to       test. The axiosInstance automatically handles the base URL and authentication tokens.
  - Global State (src/context): Authentication logic is fully encapsulated within the AuthContext, providing a single source of truth for the user's status.
  - Component Structure: A clear distinction between reusable components (like Sidebar, Layout) and route-level pages makes the project easy to navigate and maintain.

### Iterative Process and Refinements

- **Backend & Frontend Data Synchronization:** 
  - Problem: The frontend initially couldn't identify admin users because the Laravel API wasn't sending role information.
  - Refinement: We modified the UserResource on the backend to include the user's roles in the JSON response and updated the AuthController to eager-load this relationship. This ensured the            frontend and backend were perfectly synchronized regarding user permissions.
  
- **Handling Asynchronous State (Data Flow Optimization):** 
  - Problem: Pages like "Stats" were trying to fetch data before the user's ID was available from the AuthContext, causing API calls to /api/users/undefined/....
  - Refinement: We refined the useEffect hook on these pages to be dependent on the user object (useEffect(..., [user])) and added a guard clause (if (!user) return;). This solved the race             condition and ensured API calls are only made when the necessary data is ready, preventing unnecessary errors and re-renders.


