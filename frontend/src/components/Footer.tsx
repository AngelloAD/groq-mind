const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto w-full">
      {/* Grid principal centrado y equidistante */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:justify-items-center">
        
        {/* Columna 1: Identidad (mx-auto centra el bloque entero en móvil; md:mx-0 lo libera en escritorio) */}
        <div className="w-full max-w-xs text-center md:text-left mx-auto md:mx-0">
          <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-1">
            <span className="text-indigo-600">⚡</span> GroqMind
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Potenciando la comunicación inteligente con modelos de lenguaje de última generación.
          </p>
        </div>

        {/* Columna 2: Plataforma (Completamente centrado en todo momento usando mx-auto) */}
        <div className="w-full max-w-xs text-center mx-auto">
          <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-3">Plataforma</h4>
          <p className="text-slate-500 text-sm mb-1.5">Procesamiento ultra rápido</p>
          <p className="text-slate-500 text-sm">Integración con Groq API</p>
        </div>

        {/* Columna 3: Soporte (mx-auto centra en móvil; md:mx-0 lo libera para md:text-right) */}
        <div className="w-full max-w-xs text-center md:text-right mx-auto md:mx-0">
          <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-3">Contacto</h4>
          <p className="text-slate-500 text-sm mb-1.5">soporte@groqmind.com</p>
          <p className="text-slate-500 text-sm">Soporte global 24/7</p>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className="border-t border-slate-200 text-center py-4 text-slate-400 text-xs font-medium w-full">
        © {new Date().getFullYear()} GroqMind. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

