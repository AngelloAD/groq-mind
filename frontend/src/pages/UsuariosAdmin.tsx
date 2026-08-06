import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api'; // Importamos tu instancia unificada con interceptores

interface User {
  id: string | number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'CLIENTE';
  createdAt?: string;
}

const UsuariosAdmin = () => {
  const { user: currentUser } = useAuth() as { user: User | null };
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | number | null>(null);

  // CONSTANTE DE SEGURIDAD: Definimos el ID del administrador por defecto (raíz)
  const ADMIN_RAIZ_ID = 1;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError('');
    try {
      // Simplificado: 'API' ya sabe que va a '/api/usuarios' y pone el Bearer Token solo
      const response = await API.get('/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('No se pudieron cargar los usuarios. Asegúrate de tener permisos de administrador.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRol = async (id: string | number, currentRol: 'ADMIN' | 'CLIENTE') => {
    // BLINDAJE EXTRA: Bloqueo total si es uno mismo o si es el ADMIN por defecto
    if (id === currentUser?.id || Number(id) === ADMIN_RAIZ_ID) {
      alert('Operación denegada: Este rol está protegido por el sistema y no puede ser modificado.');
      return;
    }

    const nuevoRol: 'ADMIN' | 'CLIENTE' = currentRol === 'ADMIN' ? 'CLIENTE' : 'ADMIN';
    if (!window.confirm(`¿Estás seguro de cambiar el rol de este usuario a ${nuevoRol}?`)) return;

    setActionLoading(id);
    try {
      // Modificado a ruta relativa unificada
      await API.patch(`/usuarios/${id}/rol`, { rol: nuevoRol });
      setUsuarios((prev) =>
        prev.map((user) => (user.id === id ? { ...user, rol: nuevoRol } : user))
      );
    } catch (err) {
      alert('Error al actualizar el rol del usuario.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEliminarUsuario = async (id: string | number, nombre: string) => {
    // BLINDAJE EXTRA: Bloqueo total si es uno mismo o si es el ADMIN por defecto
    if (id === currentUser?.id || Number(id) === ADMIN_RAIZ_ID) {
      alert('Operación denegada: Esta cuenta es una cuenta raíz protegida y no puede ser eliminada.');
      return;
    }

    if (!window.confirm(`⚠️ ¿Estás completamente seguro de eliminar permanentemente al usuario "${nombre}"? Esta acción no se puede deshacer.`)) return;

    setActionLoading(id);
    try {
      // Modificado a ruta relativa unificada
      await API.delete(`/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert('Error al intentar eliminar el usuario.');
    } finally {
      setActionLoading(null);
    }
  };

  const totalUsuarios = usuarios.length;
  const totalAdmins = usuarios.filter(u => u.rol === 'ADMIN').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
          Panel de Administración
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona las cuentas de usuario, asigna roles de sistema y audita accesos a GroqMind.
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-6 flex items-center justify-between bg-white border-slate-200/60 shadow-soft">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Usuarios</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{loading ? '...' : totalUsuarios}</h3>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl">👥</div>
        </div>

        <div className="card p-6 flex items-center justify-between bg-white border-slate-200/60 shadow-soft">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Administradores</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{loading ? '...' : totalAdmins}</h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">🛡️</div>
        </div>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}

      {/* Tabla */}
      <div className="card shadow-soft overflow-hidden border border-slate-200/60 bg-white">
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <span className="inline-block w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2"></span>
            <p className="text-sm font-medium">Cargando base de datos de usuarios...</p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm font-medium">
            No se encontraron usuarios registrados en el sistema.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Correo Electrónico</th>
                  <th className="px-6 py-4">Rol de Sistema</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {user.nombre.charAt(0).toUpperCase()}
                      </div>
                      {user.nombre}{' '}
                      {user.id === currentUser?.id && <span className="text-xs text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md font-medium">(Tú)</span>}
                      {Number(user.id) === ADMIN_RAIZ_ID && <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md font-medium">Sistema</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${user.rol === 'ADMIN' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600' }`}>
                        {user.rol === 'ADMIN' ? '🛡️ Administrador' : '👤 Cliente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.id === currentUser?.id || Number(user.id) === ADMIN_RAIZ_ID ? (
                          <>
                            <button disabled title="Cuenta raíz o activa protegida. Los roles jerárquicos de administración no pueden alterarse." className="text-xs bg-slate-50 text-slate-400 font-medium px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1 cursor-not-allowed select-none" > 🔒 Bloqueado </button>
                            <button disabled title="Cuenta raíz o activa protegida. No está permitido eliminar administradores base." className="text-xs bg-slate-50 text-slate-400 font-medium px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1 cursor-not-allowed select-none" > 🔒 Protegido </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleToggleRol(user.id, user.rol)} disabled={actionLoading !== null} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50" > Cambiar Rol </button>
                            <button onClick={() => handleEliminarUsuario(user.id, user.nombre)} disabled={actionLoading !== null} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50" > Eliminar </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuariosAdmin;


















// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// interface User {
//     id: string | number;
//     nombre: string;
//     email: string;
//     rol: 'ADMIN' | 'CLIENTE';
//     createdAt?: string;
// }

// const UsuariosAdmin = () => {
//     const { user: currentUser } = useAuth() as { user: User | null };
//     const [usuarios, setUsuarios] = useState<User[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [actionLoading, setActionLoading] = useState<string | number | null>(null);

//     // CONSTANTE DE SEGURIDAD: Definimos el ID del administrador por defecto (raíz)
//     const ADMIN_RAIZ_ID = 1;

//     useEffect(() => {
//         fetchUsuarios();
//     }, []);

//     const fetchUsuarios = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:3000/usuarios', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUsuarios(response.data);
//         } catch (err) {
//             console.error('Error al cargar usuarios:', err);
//             setError('No se pudieron cargar los usuarios. Asegúrate de tener permisos de administrador.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleRol = async (id: string | number, currentRol: 'ADMIN' | 'CLIENTE') => {
//         // BLINDAJE EXTRA: Bloqueo total si es uno mismo o si es el ADMIN por defecto
//         if (id === currentUser?.id || Number(id) === ADMIN_RAIZ_ID) {
//             alert('Operación denegada: Este rol está protegido por el sistema y no puede ser modificado.');
//             return;
//         }

//         const nuevoRol: 'ADMIN' | 'CLIENTE' = currentRol === 'ADMIN' ? 'CLIENTE' : 'ADMIN';

//         if (!window.confirm(`¿Estás seguro de cambiar el rol de este usuario a ${nuevoRol}?`)) return;

//         setActionLoading(id);
//         try {
//             const token = localStorage.getItem('token');
//             await axios.patch(`http://localhost:3000/usuarios/${id}/rol`, { rol: nuevoRol }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setUsuarios((prev) =>
//                 prev.map((user) => (user.id === id ? { ...user, rol: nuevoRol } : user))
//             );
//         } catch (err) {
//             alert('Error al actualizar el rol del usuario.');
//         } finally {
//             setActionLoading(null);
//         }
//     };

//     const handleEliminarUsuario = async (id: string | number, nombre: string) => {
//         // BLINDAJE EXTRA: Bloqueo total si es uno mismo o si es el ADMIN por defecto
//         if (id === currentUser?.id || Number(id) === ADMIN_RAIZ_ID) {
//             alert('Operación denegada: Esta cuenta es una cuenta raíz protegida y no puede ser eliminada.');
//             return;
//         }

//         if (!window.confirm(`⚠️ ¿Estás completamente seguro de eliminar permanentemente al usuario "${nombre}"? Esta acción no se puede deshacer.`)) return;

//         setActionLoading(id);
//         try {
//             const token = localStorage.getItem('token');
//             await axios.delete(`http://localhost:3000/usuarios/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setUsuarios((prev) => prev.filter((user) => user.id !== id));
//         } catch (err) {
//             alert('Error al intentar eliminar el usuario.');
//         } finally {
//             setActionLoading(null);
//         }
//     };

//     const totalUsuarios = usuarios.length;
//     const totalAdmins = usuarios.filter(u => u.rol === 'ADMIN').length;
//     return (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//             {/* Encabezado */}
//             <div className="mb-8">
//                 <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
//                     Panel de Administración
//                 </h1>
//                 <p className="text-slate-500 text-sm mt-1">
//                     Gestiona las cuentas de usuario, asigna roles de sistema y audita accesos a GroqMind.
//                 </p>
//             </div>

//             {/* Métricas */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                 <div className="card p-6 flex items-center justify-between bg-white border-slate-200/60 shadow-soft">
//                     <div>
//                         <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Usuarios</p>
//                         <h3 className="text-3xl font-bold text-slate-900 mt-1">{loading ? '...' : totalUsuarios}</h3>
//                     </div>
//                     <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl">👥</div>
//                 </div>
//                 <div className="card p-6 flex items-center justify-between bg-white border-slate-200/60 shadow-soft">
//                     <div>
//                         <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Administradores</p>
//                         <h3 className="text-3xl font-bold text-slate-900 mt-1">{loading ? '...' : totalAdmins}</h3>
//                     </div>
//                     <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">🛡️</div>
//                 </div>
//             </div>

//             {/* Alerta de Error */}
//             {error && (
//                 <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
//                     ⚠️ {error}
//                 </div>
//             )}

//             {/* Tabla */}
//             <div className="card shadow-soft overflow-hidden border border-slate-200/60 bg-white">
//                 {loading ? (
//                     <div className="py-20 text-center text-slate-500">
//                         <span className="inline-block w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2"></span>
//                         <p className="text-sm font-medium">Cargando base de datos de usuarios...</p>
//                     </div>
//                 ) : usuarios.length === 0 ? (
//                     <div className="py-20 text-center text-slate-400 text-sm font-medium">
//                         No se encontraron usuarios registrados en el sistema.
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left border-collapse">
//                             <thead>
//                                 <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
//                                     <th className="px-6 py-4">Usuario</th>
//                                     <th className="px-6 py-4">Correo Electrónico</th>
//                                     <th className="px-6 py-4">Rol de Sistema</th>
//                                     <th className="px-6 py-4 text-right">Acciones</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
//                                 {usuarios.map((user) => (
//                                     <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
//                                         <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-2.5">
//                                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
//                                                 {user.nombre.charAt(0).toUpperCase()}
//                                             </div>
//                                             {user.nombre}{' '}
//                                             {user.id === currentUser?.id && <span className="text-xs text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md font-medium">(Tú)</span>}
//                                             {Number(user.id) === ADMIN_RAIZ_ID && <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md font-medium">Sistema</span>}
//                                         </td>

//                                         <td className="px-6 py-4 text-slate-500">{user.email}</td>

//                                         <td className="px-6 py-4">
//                                             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${user.rol === 'ADMIN'
//                                                     ? 'bg-indigo-50 text-indigo-700'
//                                                     : 'bg-slate-100 text-slate-600'
//                                                 }`}>
//                                                 {user.rol === 'ADMIN' ? '🛡️ Administrador' : '👤 Cliente'}
//                                             </span>
//                                         </td>

//                                         <td className="px-6 py-4 text-right">
//                                             <div className="flex justify-end gap-2">
//                                                 {/* CONDICIÓN DE BLOQUEO: Se congela si eres TÚ MISMO o si es la cuenta raíz del SISTEMA */}
//                                                 {user.id === currentUser?.id || Number(user.id) === ADMIN_RAIZ_ID ? (
//                                                     <>
//                                                         <button
//                                                             disabled
//                                                             title="Cuenta raíz o activa protegida. Los roles jerárquicos de administración no pueden alterarse."
//                                                             className="text-xs bg-slate-50 text-slate-400 font-medium px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1 cursor-not-allowed select-none"
//                                                         >
//                                                             🔒 Bloqueado
//                                                         </button>
//                                                         <button
//                                                             disabled
//                                                             title="Cuenta raíz o activa protegida. No está permitido eliminar administradores base."
//                                                             className="text-xs bg-slate-50 text-slate-400 font-medium px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1 cursor-not-allowed select-none"
//                                                         >
//                                                             🔒 Protegido
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <button
//                                                             onClick={() => handleToggleRol(user.id, user.rol)}
//                                                             disabled={actionLoading !== null}
//                                                             className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
//                                                         >
//                                                             Cambiar Rol
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleEliminarUsuario(user.id, user.nombre)}
//                                                             disabled={actionLoading !== null}
//                                                             className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
//                                                         >
//                                                             Eliminar
//                                                         </button>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UsuariosAdmin;
