import { Link } from 'react-router-dom';

// 1. Definimos la estructura del objeto de características tecnológicas
interface Feature {
    icon: string;
    title: string;
    desc: string;
}

const Home = () => {
    // 2. Características enfocadas en una plataforma de chat de IA
    const features: Feature[] = [
        {
            icon: '🚀',
            title: 'Respuestas en milisegundos',
            desc: 'Potenciado por la infraestructura ultra rápida de Groq para una fluidez total.'
        },
        {
            icon: '🧠',
            title: 'Modelos de vanguardia',
            desc: 'Accede a los modelos de lenguaje más avanzados del mercado con total capacidad lógica.'
        },
        {
            icon: '🔒',
            title: 'Privacidad garantizada',
            desc: 'Tus conversaciones y datos están completamente encriptados y protegidos.'
        },
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 via-white to-white border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">

                    {/* Texto de Introducción */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-display text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Conversación inteligente, <br />
                            <span className="text-indigo-600">velocidad instantánea</span>
                        </h1>
                        <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto md:mx-0 font-body leading-relaxed">
                            Explora una nueva dimensión de interacción con GroqMind. Conecta con modelos de IA avanzados en tiempo real mediante una interfaz ultra limpia.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                            <Link to="/register" className="btn-primary text-base px-8 py-3.5 shadow-md shadow-indigo-100">
                                Comenzar ahora gratis
                            </Link>
                            <Link to="/login" className="btn-secondary text-base px-8 py-3.5 shadow-md shadow-indigo-100">
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>

                    {/* Gráfico / Ilustración de Chat Interactiva */}
                    <div className="flex-1 flex justify-center w-full">
                        <div className="w-full max-w-sm card p-6 border border-indigo-100/80 shadow-soft bg-gradient-to-tr from-white to-indigo-50/30">
                            <div className="space-y-4">
                                <div className="flex items-start gap-2.5">
                                    <div className="bg-indigo-600 text-white rounded-full p-2 text-xs">🧠</div>
                                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 text-sm text-slate-700 max-w-[85%]">
                                        ¡Hola! ¿En qué puedo ayudarte hoy con GroqMind?
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5 justify-end">
                                    <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[85%] shadow-xs">
                                        Optimiza mi interfaz para que luzca increíble.
                                    </div>
                                    <div className="bg-slate-200 rounded-full p-2 text-xs">👤</div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <div className="bg-indigo-600 text-white rounded-full p-2 text-xs">🧠</div>
                                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 text-sm text-slate-700 max-w-[85%]">
                                        Diseño actualizado con éxito. Listo para procesar tus consultas a máxima velocidad. ⚡
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Características (Por qué elegirnos) */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="font-display text-3xl md:text-4xl text-center text-slate-900 font-bold tracking-tight mb-3">
                    Tecnología diseñada para la fluidez
                </h2>
                <p className="text-center text-slate-500 max-w-md mx-auto mb-16 text-base">
                    Disfruta de una experiencia de chat sin fricciones, optimizada tanto para escritorio como para móviles.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f: Feature) => (
                        <div key={f.title} className="card p-8 text-center md:text-left flex flex-col items-center md:items-start transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl mb-4 bg-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-950 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/50 via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        ¿Listo para experimentar el futuro del chat?
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto text-base">
                        Crea tu cuenta en pocos segundos y accede a un entorno de procesamiento cognitivo de alta velocidad.
                    </p>
                    <Link to="/register" className="btn-primary text-base px-8 py-3.5 inline-block cursor-pointer shadow-lg shadow-indigo-600/20">
                        Regístrate e inicia el chat
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;