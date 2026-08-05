import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface RegisterFormInputs {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState<string>('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>({
    mode: "onChange" // Valida en tiempo real mientras el usuario escribe
  });

  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setGeneralError('');
    const result = await authRegister(data.nombre, data.email, 'CLIENTE', data.password);
    
    if (result.success) {
      navigate('/chat', { replace: true });
    } else {
      setGeneralError(typeof result.error === 'string' ? result.error : 'Error al registrar.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-transparent to-slate-50/50">
      <div className="w-full max-w-md">
        <div className="card p-8 sm:p-10 border border-slate-200/60 shadow-soft">
          
          {/* Encabezado del Formulario */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-slate-900 font-bold tracking-tight mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-sm text-slate-500 font-body">
              Únete a GroqMind y experimenta el chat del futuro
            </p>
          </div>

          {/* Mensaje de Error General */}
          {generalError && (
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 animate-fadeIn justify-center">
              ⚠️ {generalError}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Campo: Nombre de usuario */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Nombre de usuario
              </label>
              <input
                type="text"
                placeholder="ej. maria_garcia"
                className={`input-field ${errors.nombre ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/10' : ''}`}
                {...register('nombre', {
                  required: 'Este campo es obligatorio.',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres.' }
                })}
              />
              {errors.nombre && <p className="text-red-600 text-xs mt-1.5 font-medium">⚠️ {errors.nombre.message}</p>}
            </div>

            {/* Campo: Correo electrónico */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className={`input-field ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/10' : ''}`}
                {...register('email', {
                  required: 'Este campo es obligatorio.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido.'
                  }
                })}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1.5 font-medium">⚠️ {errors.email.message}</p>}
            </div>

            {/* Campo: Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                className={`input-field ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/10' : ''}`}
                {...register('password', {
                  required: 'La contraseña es obligatoria.',
                  minLength: { value: 8, message: 'Debe tener al menos 8 caracteres.' },
                  validate: {
                    hasUppercase: (value) => /[A-Z]/.test(value) || 'Debe incluir una mayúscula.',
                    hasLowercase: (value) => /[a-z]/.test(value) || 'Debe incluir una minúscula.',
                    hasNumber: (value) => /[0-9]/.test(value) || 'Debe incluir un número.',
                    // hasSpecial: (value) => /[@$!%*?&#]/.test(value) || 'Debe incluir un símbolo (ej. @, $, !).'
                  }
                })}
              />
              {errors.password && <p className="text-red-600 text-xs mt-1.5 font-medium">⚠️ {errors.password.message}</p>}
            </div>

            {/* Campo: Confirmar contraseña */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirmar contraseña
              </label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                className={`input-field ${errors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/10' : ''}`}
                {...register('confirmPassword', {
                  required: 'Este campo es obligatorio.',
                  validate: (value) => value === passwordValue || 'Las contraseñas no coinciden.'
                })}
              />
              {errors.confirmPassword && <p className="text-red-600 text-xs mt-1.5 font-medium">⚠️ {errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-100 mt-2 py-3.5 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Creando cuenta...
                </span>
              ) : (
                'Registrarse'
              )}
            </button>
          </form>

          {/* Enlace de Inicio de Sesión */}
          <p className="text-center text-slate-500 text-sm mt-8 border-t border-slate-100 pt-6">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
