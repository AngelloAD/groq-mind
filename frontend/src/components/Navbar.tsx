import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface UserPayload {
  nombre: string;
  rol: 'ADMIN' | 'CLIENTE';
}

const Navbar = () => {
  const { user, logout } = useAuth() as { user: UserPayload | null; logout: () => Promise<void> };
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setIsOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Fila Superior: Logo y Botón de Hamburguesa */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
            <span className="text-2xl font-display font-bold text-slate-900 flex items-center gap-1.5 tracking-tight">
              <span className="text-indigo-600 transition-transform duration-300 group-hover:rotate-12">⚡</span> 
              Groq<span className="text-indigo-600">Mind</span>
            </span>
          </Link>

          {/* Botón de Hamburguesa (Móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-indigo-600 focus:outline-none cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
          </button>

          {/* Menú Horizontal (Escritorio) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              Inicio
            </Link>

            {user ? (
              <>
                {/* SOLUCIÓN: Enlace al Chat visible en escritorio si está logueado */}
                <Link to="/chat" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg">
                  💬 Ir al Chat
                </Link>

                {/* Enlace de administración */}
                {user.rol === 'ADMIN' && (
                  <Link to="/admin/usuarios" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm flex items-center gap-1">
                    👥 Usuarios
                  </Link>
                )}
                
                <div className="flex items-center gap-4 ml-2 border-l border-slate-200 pl-4">
                  <span className="text-sm text-slate-500 font-medium">Hola, <span className="text-slate-800 font-semibold">{user.nombre}</span></span>
                  <button onClick={handleLogout} className="btn-secondary text-xs px-3.5 py-2 cursor-pointer shadow-xs">
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="btn-primary text-xs px-4 py-2 cursor-pointer shadow-md shadow-indigo-100">
                  Registrarse
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Menú Desplegable Vertical (Móvil) */}
        {isOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors py-1">
              Inicio
            </Link>

            {user ? (
              <>
                {/* SOLUCIÓN: Enlace al Chat visible en móvil si está logueado */}
                <Link to="/chat" onClick={() => setIsOpen(false)} className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors py-1 flex items-center gap-1 bg-indigo-50 px-3 py-2 rounded-xl">
                  💬 Ir al Chat
                </Link>

                {user.rol === 'ADMIN' && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-50 pl-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Panel Admin</p>
                    <Link to="/admin/usuarios" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors py-1">
                      👥 Gestionar Usuarios
                    </Link>
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500 font-medium">Hola, <span className="text-slate-800 font-bold">{user.nombre}</span></span>
                  <button onClick={handleLogout} className="w-full btn-secondary text-sm py-2.5 cursor-pointer text-center">
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-center py-2.5 border border-slate-200 rounded-xl bg-slate-50">
                  Iniciar sesión
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-sm py-2.5 cursor-pointer text-center shadow-xs">
                  Registrarse
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;













// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface UserPayload {
//   nombre: string;
//   rol: 'ADMIN' | 'CLIENTE';
// }

// const Navbar = () => {
//   const { user, logout } = useAuth() as { user: UserPayload | null; logout: () => Promise<void> };
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const handleLogout = async (): Promise<void> => {
//     setIsOpen(false);
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 py-4">
//         {/* Fila Superior: Logo y Botón de Hamburguesa */}
//         <div className="flex items-center justify-between">
//           {/* Nuevo nombre tecnológico de IA: GroqMind */}
//           <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
//             <span className="text-2xl font-display font-bold text-slate-900 flex items-center gap-1.5 tracking-tight">
//               <span className="text-indigo-600 transition-transform duration-300 group-hover:rotate-12">⚡</span> 
//               Groq<span className="text-indigo-600">Mind</span>
//             </span>
//           </Link>

//           {/* Botón de Hamburguesa (Móvil) */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-slate-600 hover:text-indigo-600 focus:outline-none cursor-pointer transition-colors"
//             aria-label="Toggle menu"
//           >
//             <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
//           </button>

//           {/* Menú Horizontal (Escritorio) */}
//           <nav className="hidden md:flex items-center gap-6">
//             <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">
//               Inicio
//             </Link>

//             {user ? (
//               <>
//                 {/* Enlace de administración integrado al diseño */}
//                 {user.rol === 'ADMIN' && (
//                   <Link to="/admin/usuarios" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors text-sm flex items-center gap-1">
//                     👥 Usuarios
//                   </Link>
//                 )}
                
//                 <div className="flex items-center gap-4 ml-2 border-l border-slate-200 pl-4">
//                   <span className="text-sm text-slate-500 font-medium">Hola, <span className="text-slate-800 font-semibold">{user.nombre}</span></span>
//                   <button onClick={handleLogout} className="btn-secondary text-xs px-3.5 py-2 cursor-pointer shadow-xs">
//                     Salir
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">
//                   Iniciar sesión
//                 </Link>
//                 <Link to="/register" className="btn-primary text-xs px-4 py-2 cursor-pointer shadow-md shadow-indigo-100">
//                   Registrarse
//                 </Link>
//               </div>
//             )}
//           </nav>
//         </div>

//         {/* Menú Desplegable Vertical (Móvil) */}
//         {isOpen && (
//           <nav className="md:hidden mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
//             <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors py-1">
//               Inicio
//             </Link>

//             {user ? (
//               <>
//                 {user.rol === 'ADMIN' && (
//                   <div className="flex flex-col gap-2 pt-2 border-t border-slate-50 pl-2">
//                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Panel Admin</p>
//                     <Link to="/admin/usuarios" onClick={() => setIsOpen(false)} className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors py-1">
//                       👥 Gestionar Usuarios
//                     </Link>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
//                   <span className="text-sm text-slate-500 font-medium">Hola, <span className="text-slate-800 font-bold">{user.nombre}</span></span>
//                   <button onClick={handleLogout} className="w-full btn-secondary text-sm py-2.5 cursor-pointer text-center">
//                     Salir
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
//                 <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-center py-2.5 border border-slate-200 rounded-xl bg-slate-50">
//                   Iniciar sesión
//                 </Link>
//                 <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-sm py-2.5 cursor-pointer text-center shadow-xs">
//                   Registrarse
//                 </Link>
//               </div>
//             )}
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;


















// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     // ESTADO CLAVE: Controla si el menú desplegable móvil está abierto o cerrado
//     const [isOpen, setIsOpen] = useState<boolean>(false);

//     const handleLogout = async (): Promise<void> => {
//         setIsOpen(false);
//         await logout();
//         navigate('/login');
//     };

//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-50">
//             <div className="max-w-6xl mx-auto px-4 py-4">
//                 {/* Fila Superior: Logo y Botón de Hamburguesa */}
//                 <div className="flex items-center justify-between">
//                     {/* Logo del restaurante */}
//                     <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
//                         <span className="text-2xl font-display font-semibold text-lemon-green">
//                             🍋 Little Lemon
//                         </span>
//                     </Link>

//                     {/* 🍔 BOTÓN DE HAMBURGUESA: Solo visible en móviles (hidden en pantallas md o superiores) */}
//                     <button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className="md:hidden text-lemon-dark hover:text-lemon-green focus:outline-none cursor-pointer text-2xl"
//                         aria-label="Toggle menu"
//                     >
//                         {isOpen ? '✕' : '☰'}
//                     </button>

//                     {/* 💻 MENÚ HORIZONTAL (Escritorio): Se oculta en móviles (hidden) y se activa en md:flex */}
//                     <nav className="hidden md:flex items-center gap-6">
//                         <Link to="/" className="text-lemon-dark hover:text-lemon-green font-medium transition-colors">
//                             Inicio
//                         </Link>

//                         {user ? (
//                             <>


//                                 <div className="flex items-center gap-3 ml-2">
//                                     <span className="text-sm text-gray-500">Hola, {user.nombre}</span>
//                                     <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2 cursor-pointer">
//                                         Salir
//                                     </button>
//                                 </div>
//                             </>
//                         ) : (
//                             <div className="flex items-center gap-3">
//                                 <Link to="/login" className="text-lemon-dark hover:text-lemon-green font-medium transition-colors">
//                                     Iniciar sesión
//                                 </Link>
//                                 <Link to="/register" className="btn-primary text-sm px-4 py-2 cursor-pointer">
//                                     Registrarse
//                                 </Link>
//                             </div>
//                         )}
//                     </nav>
//                 </div>

//                 {/* 📱 MENÚ DESPLEGABLE VERTICAL (Móvil): Solo se muestra si isOpen es true y la pantalla es pequeña */}
//                 {isOpen && (
//                     <nav className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4">
//                         <Link to="/" onClick={() => setIsOpen(false)} className="text-lemon-dark hover:text-lemon-green font-medium transition-colors py-1">
//                             Inicio
//                         </Link>

//                         {user ? (
//                             <>

//                                 {/* Enlaces exclusivos de Administrador en Móvil */}
//                                 {user.rol === 'ADMIN' || (user as any).rol === 'ADMIN' ? (
//                                     <div className="flex flex-col gap-3 pt-2 border-t border-gray-50 pl-2">
//                                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Panel Admin</p>

//                                         <Link to="/admin/usuarios" onClick={() => setIsOpen(false)} className="text-teal-600 hover:text-teal-700 font-bold transition-colors">
//                                             👥 Usuarios
//                                         </Link>
//                                     </div>
//                                 ) : null}

//                                 <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
//                                     <span className="text-sm text-gray-500 font-medium">Hola, {user.nombre}</span>
//                                     <button onClick={handleLogout} className="w-full btn-secondary text-sm py-2 cursor-pointer text-center">
//                                         Salir
//                                     </button>
//                                 </div>
//                             </>
//                         ) : (
//                             <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
//                                 <Link to="/login" onClick={() => setIsOpen(false)} className="text-lemon-dark hover:text-lemon-green font-medium transition-colors text-center py-2 border border-gray-200 rounded-lg">
//                                     Iniciar sesión
//                                 </Link>
//                                 <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-sm py-2 cursor-pointer text-center">
//                                     Registrarse
//                                 </Link>
//                             </div>
//                         )}
//                     </nav>
//                 )}
//             </div>
//         </header>
//     );
// };

// export default Navbar;