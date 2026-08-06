import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API from '../services/api'; // Importamos la instancia de Axios con interceptores

// 1. Definimos la estructura de un mensaje del chat
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const Chat = () => {
  const { user } = useAuth(); // Obtenemos el usuario autenticado (opcional por si necesitas su token o nombre)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `¡Hola ${user?.nombre || ''}! Soy GroqMind. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 2. Auto-scroll: Mantiene el chat siempre abajo al recibir nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 3. Envío de la consulta al Backend de NestJS
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userPrompt = input.trim();
    setInput(''); // Limpiamos la caja de inmediato para dar sensación de velocidad

    // Añadimos el mensaje del usuario a la pantalla
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: userPrompt,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Activamos la animación de "Pensando..."
    setIsTyping(true);

    try {
      // Usamos la instancia 'API' que ya tiene configurada la ruta relativa '/api' y pone el token solo
      const response = await API.post('/ia/preguntar', {
        prompt: userPrompt
      });


      // El servicio de NestJS retorna directamente el string con la respuesta
      const aiReply: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: response.data,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error('Error al conectar con el módulo de IA:', error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: '⚠️ Lo siento, hubo un problema al procesar tu solicitud. Por favor, asegúrate de estar autenticado e intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Permite enviar con Enter, pero hacer saltos de línea usando Shift + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-140px)] flex flex-col">
      {/* Contenedor Principal del Chat */}
      <div className="flex-1 card border border-slate-200/70 shadow-soft overflow-hidden flex flex-col bg-white">

        {/* Encabezado del panel de Chat */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 font-bold text-xl">⚡</span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Modelo: openai/gpt-oss-20b</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Interfaz Activa (Groq API)
              </p>
            </div>
          </div>
        </div>

        {/* Zona de Mensajes Scrolleable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 select-none ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 border border-slate-200 text-slate-700'
                }`}>
                {msg.sender === 'user' ? '👤' : '🧠'}
              </div>

              {/* Burbuja de Texto */}
              <div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                    : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                  {msg.text}
                </div>
                {/* Timestamp sutil */}
                <span className={`text-[10px] text-slate-400 mt-1 block px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Indicador de que la IA está escribiendo */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] mr-auto animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-700">
                🧠
              </div>
              <div className="bg-slate-50 text-slate-500 rounded-2xl rounded-tl-none p-4 text-sm border border-slate-100 flex items-center gap-1">
                <span>GroqMind está procesando</span>
                <span className="flex gap-0.5 ml-1">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                </span>
              </div>
            </div>
          )}

          {/* Referencia invisible para el auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Barra de Entrada de Texto inferior */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-end max-w-3xl mx-auto">
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pregúntale algo a GroqMind..."
                rows={1}
                className="input-field pr-12 resize-none max-h-32 min-h-[46px] py-3 flex items-center scrollbar-none"
                style={{ height: 'auto' }}
                disabled={isTyping}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="btn-primary h-[46px] w-[46px] p-0 rounded-xl shadow-md cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Enviar mensaje"
            >
              <span className="text-lg">➔</span>
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            GroqMind puede cometer errores. Considera verificar la información importante.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Chat;
