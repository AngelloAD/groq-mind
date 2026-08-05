import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. IMPORTA EL ROUTER
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import UsuariosAdmin from './pages/UsuariosAdmin';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter> {/* 2. ENVOLVER AQUÍ */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;