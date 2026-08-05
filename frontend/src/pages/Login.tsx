
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

interface LoginFormInputs {
  nombre: string;
  password: string;
}

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/chat';
  const [error, setError] = useState<string>('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError('');
    const result = await login(data.nombre, data.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Error al iniciar sesión.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-transparent to-slate-50/50">
      <div className="w-full max-w-md">
        <div className="card p-8 sm:p-10 border border-slate-200/60 shadow-soft">
          {/* Encabezado del Formulario */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-slate-900 font-bold tracking-tight mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-sm text-slate-500 font-body">
              Ingresa tus credenciales para acceder a GroqMind
            </p>
          </div>

          {/* Mensaje de Error General */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 animate-fadeIn">
              ⚠️ {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                placeholder="Tu nombre de usuario"
                className={`input-field ${errors.nombre ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/10' : ''}`}
                {...register('nombre', { required: 'El nombre de usuario es obligatorio' })}
              />
              {errors.nombre && (
                <span className="text-red-600 text-xs mt-1.5 block font-medium">{errors.nombre.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/10' : ''}`}
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password && (
                <span className="text-red-600 text-xs mt-1.5 block font-medium">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-100 mt-2 py-3.5 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Autenticando...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Enlace de Registro */}
          <p className="text-center text-slate-500 text-sm mt-8 border-t border-slate-100 pt-6">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Regístrate ahora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
