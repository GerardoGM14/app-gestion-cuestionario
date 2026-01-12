import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { User, Lock, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { signInWithPopup } from "firebase/auth";
import { auth, microsoftProvider, googleProvider } from '../config/firebase';
import logoBackground from '../assets/logo-background.svg';
import tiktokLogo from '../assets/social/tiktok-logo.svg';
import facebookLogo from '../assets/social/facebook-logo.svg';
import instagramLogo from '../assets/social/instagram-logo.svg';
import playstoreLogo from '../assets/social/playstore-logo.svg';
import PlayStoreModal from './PlayStoreModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Estado para el slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoading();
  
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      alt: "Colaboración en equipo"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      alt: "Reunión de negocios"
    },
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      alt: "Oficina moderna"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMicrosoftLogin = async () => {
    try {
      showLoader();
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;
      
      // Guardar usuario en localStorage (similar al login normal)
      const userData = {
        id: user.uid,
        name: user.displayName || 'Usuario Microsoft',
        email: user.email,
        role: 'user', // Default role
        photoURL: user.photoURL
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard/home');
    } catch (error) {
      console.error('Error Microsoft Login:', error);
      setError('Error al iniciar sesión con Microsoft');
      toast.error('Error de autenticación');
    } finally {
      hideLoader();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      showLoader();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userData = {
        id: user.uid,
        name: user.displayName || 'Usuario Google',
        email: user.email,
        role: 'user',
        photoURL: user.photoURL
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard/home');
    } catch (error) {
      console.error('Error Google Login:', error);
      toast.error('Error al iniciar sesión con Google');
    } finally {
      hideLoader();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    showLoader();

    try {
      // Simular delay de red
      setTimeout(() => {
        // Login Simulado (Local Storage)
        if (email === 'admin@fastcloud.com' && password === 'admin123') {
            // Guardar usuario en localStorage
            const user = {
              id: 1,
              name: 'Administrador',
              email: 'admin@fastcloud.com',
              role: 'admin'
            };
            localStorage.setItem('user', JSON.stringify(user));
            
            navigate('/dashboard');
        } else {
          setError('Credenciales inválidas (Prueba: admin@fastcloud.com / admin123)');
          hideLoader();
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado');
      hideLoader();
    }
  };

  // Cambio automático de slides cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans overflow-hidden">
      <div className="w-full h-screen lg:h-screen p-4 lg:p-8 flex" style={{ zoom: 0.9 }}>
        {/* Sección Izquierda - Slider de Imágenes */}
      <div className="hidden lg:flex w-1/2 h-full relative bg-gray-900 overflow-hidden rounded-3xl">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url("${slide.url}")`
            }}
          >
            {/* Overlay oscuro suave */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
        
        {/* Controles del Slider */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-2 hover:bg-white/10 rounded-full"
        >
          <ChevronLeft size={40} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-2 hover:bg-white/10 rounded-full"
        >
          <ChevronRight size={40} />
        </button>

        {/* Indicadores (Dots) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Sección Derecha - Formulario */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 relative overflow-y-auto scrollbar-hide">
        
        <div className="w-full max-w-md relative z-10">
          {/* Logo Placeholder */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="flex flex-col items-center">
              <img 
                src="/logo_fastcloud.png" 
                alt="FastCloud Logo" 
                className="h-24 md:h-28 w-auto object-contain mb-[-20px] md:mb-[-25px]" 
              />
              <div className="text-[#383A3D] qtext-base md:text-lg mt-0 ml-16 font-medium tracking-wide relative -top-2">Gestión de Alta de Clientes</div>
            </div>
          </div>

          <h1 className="text-[#F2911C] text-2xl md:text-3xl font-bold mb-2 md:mb-3">Bienvenido</h1>
          <p className="text-[#383A3D] text-sm md:text-base mb-6 md:mb-8">
            Inicie sesión para gestionar su cuenta y disfrutar de todos los beneficios que tenemos para usted.
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Usuario */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="USUARIO"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-[#383A3D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-colors"
                required
              />
            </div>

            {/* Input Contraseña */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="CONTRASEÑA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg text-[#383A3D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Opciones Extra */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-[#383A3D] cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#EA580C] focus:ring-[#EA580C] mr-2 accent-[#EA580C]" />
                Recordar mis datos.
              </label>
              <a href="#" className="text-[#EA580C] hover:underline font-medium">
                ¿Olvidó su contraseña?
              </a>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              className="w-full bg-[#EC6317] hover:bg-[#d55814] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-none focus:outline-none focus:ring-0"
            >
              Iniciar Sesión
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-3 text-sm text-gray-500 font-medium">O</span>
              <div className="border-t border-gray-200 w-full"></div>
            </div>

            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className="w-full bg-[#2F2F2F] hover:bg-black text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-none focus:outline-none focus:ring-0 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 0H0V10.5H10.5V0Z" fill="#F25022"/>
                <path d="M21 0H10.5V10.5H21V0Z" fill="#7FBA00"/>
                <path d="M10.5 10.5H0V21H10.5V10.5Z" fill="#00A4EF"/>
                <path d="M21 10.5H10.5V21H21V10.5Z" fill="#FFB900"/>
              </svg>
              Iniciar con Microsoft
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full mt-3 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm border border-gray-200 focus:outline-none focus:ring-0 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Iniciar con Google
            </button>

          </form>

          {/* Footer Social */}
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex gap-6 items-center">
              <a href="#" className="transition transform hover:scale-110">
                <img src={tiktokLogo} alt="TikTok" className="w-6 h-6" />
              </a>
              <a href="#" className="transition transform hover:scale-110">
                <img src={facebookLogo} alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="transition transform hover:scale-110">
                <img src={instagramLogo} alt="Instagram" className="w-9 h-9" />
              </a>
              <button 
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} 
                className="transition transform hover:scale-110 focus:outline-none"
              >
                <img src={playstoreLogo} alt="Play Store" className="w-9 h-9" />
              </button>
            </div>
            
            <div className="text-sm text-[#383A3D] font-medium tracking-wide">
              Copyright © 2025 - Sertech Perú E.I.R.L
            </div>
          </div>
        </div>
      </div>

      {/* Detalle decorativo esquina inferior derecha - Fixed para ignorar padding */}
      <div className="fixed bottom-0 right-0 pointer-events-none translate-x-12 translate-y-4 z-50">
          <img src={logoBackground} alt="Fondo decorativo" className="w-32 h-32 md:w-64 md:h-64 opacity-30" />
      </div>

      {/* PlayStore Modal */}
      <PlayStoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
