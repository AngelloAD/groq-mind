# GroqMind Chat IA
Proyecto unificado de chat con NestJS, React y Neon DB.


# 🧠 GroqMind Chat IA

GroqMind es una aplicación web fullstack de Chat con Inteligencia Artificial que integra un sistema de autenticación seguro para los usuarios. Construida completamente con TypeScript, la plataforma permite a los usuarios registrarse, iniciar sesión y acceder a un entorno de chat interactivo potenciado por IA.

🌐 **Sitio en vivo:** [https://groq-mind.vercel.app/](https://groq-mind.vercel.app/)

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **React** (TypeScript) - Librería para la interfaz de usuario.
- **Tailwind CSS v4.0** - Framework de estilos e interfaz moderna.
- **Vercel** - Plataforma de despliegue para la interfaz.

### Backend
- **NestJS** (TypeScript) - Framework modular de Node.js para el servidor de la API.
- **Prisma ORM** - Modelado y consultas eficientes a la base de datos.
- **PostgreSQL (Neon DB)** - Base de datos relacional serverless en la nube.
- **Motor de IA (`openai/gpt-oss-20b`):** Integrado a través de la API para proporcionar capacidades avanzadas de razonamiento con baja latencia y procesamiento en cadena de pensamiento (*chain-of-thought*).

---

## ⚙️ Características Principales
1. **Autenticación Segura:** Sistema de registro e inicio de sesión con Rutas Protegidas (`ProtectedRoute`) en el cliente.
2. **Chat de IA Dinámico:** Interfaz de comunicación fluida con modelos de lenguaje de última generación a través de Groq.
3. **Gestión de Sesiones:** Estado de usuario global manejado mediante React Context API (`AuthContext`).
4. **Panel Administrativo:** Módulo dedicado para la gestión o visualización de usuarios (`UsuariosAdmin`).
5. **Razonamiento Avanzado Integrado:** Gracias al modelo `gpt-oss-20b`, el chat cuenta con capacidades nativas de ejecución de pasos lógicos estructurados antes de responder, emulando dinámicas avanzadas de resolución de problemas.


---

## 📁 Estructura del Proyecto

El repositorio está organizado como un monorepo dividido en dos secciones principales (`frontend` y `backend`):

```text
groq-mind/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Modelos de la base de datos
│   ├── src/
│   │   ├── auth/                 # Lógica de login y generación de tokens
│   │   ├── ia/                   # Integración con la API de Groq
│   │   ├── prisma/               # Servicio de conexión ORM
│   │   ├── usuarios/             # Módulo de base para datos de usuarios
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts               # Punto de entrada de NestJS
│   └── .env                      # Variables de entorno del servidor
│
├── frontend/
│   ├── src/
│   │   ├── assets/               # Recursos estáticos
│   │   ├── components/
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoute.tsx # Guardian de rutas autenticadas
│   │   ├── context/
│   │   │   └── AuthContext.tsx    # Proveedor de estado global de usuario
│   │   ├── pages/
│   │   │   ├── Chat.tsx           # Pantalla principal del chat IA
│   │   │   ├── Home.tsx           # Página de bienvenida
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── UsuariosAdmin.tsx  # Panel de administración
│   │   ├── services/
│   │   │   └── api.ts             # Configuración de Axios/Fetch para peticiones
│   │   ├── App.tsx
│   │   ├── index.css              # Estilos globales y configuración @theme
│   │   └── main.tsx
│   ├── .env.development           # Configuración de entorno local
│   └── index.html
│
├── .gitignore
├── README.md
└── vercel.json                    # Configuración para despliegue
```

---

## 🛠️ Configuración Local

Si deseas clonar y correr este proyecto localmente, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/AngelloAD/groq-mind
cd groq-mind
```

### 2. Configurar el Backend
1. Entra a la carpeta de backend e instala las dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Crea tu archivo `.env` basándote en tus credenciales de Neon DB y Groq:
   ```env
   DATABASE_URL="tu_url_de_conexion_neon_postgres"
   GROQ_API_KEY="tu_api_key_de_groq"
   JWT_SECRET="tu_clave_secreta_para_tokens"
   ```
3. Ejecuta las migraciones de Prisma y levanta el servidor:
   ```bash
   npx prisma migrate dev
   npm run start:dev
   ```

### 3. Configurar el Frontend
1. En otra terminal, entra a la carpeta de frontend e instala las dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Define la URL de tu backend local en tu `.env.development`:
   ```env
   VITE_API_BASE_URL="http://localhost:3000"
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
