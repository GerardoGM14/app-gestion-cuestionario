import React, { useState } from 'react';
import { 
  BriefcaseBusiness, 
  Home, 
  ShoppingCart, 
  ShieldBan, 
  ShoppingBag, 
  ChevronLeft, 
  Settings, 
  Users, 
  ShieldCheck, 
  List, 
  Wrench, 
  Database, 
  MapPin, 
  Cloud, 
  HelpCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('security');
  const [openSubmenus, setOpenSubmenus] = useState({
    procesos: true,
    maestros: false
  });
  const location = useLocation();

  const primaryItems = [
    { id: 'security', icon: BriefcaseBusiness },
    { id: 'home', icon: Home },
    { id: 'cart', icon: ShoppingCart },
    { id: 'shield', icon: ShieldBan },
    { id: 'bag', icon: ShoppingBag },
  ];

  const toggleSubmenu = (menu) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className={`flex flex-col h-screen bg-[#191A1A] text-gray-300 flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20 delay-150' : 'w-72'} relative`}>
      
      {/* Header (Full Width) */}
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} border-b border-gray-800 flex-shrink-0 relative`}>
        <div className={`flex items-center gap-2 transition-all duration-300 ${isCollapsed ? 'w-7 h-8 overflow-hidden relative justify-center' : ''}`}>
           <img 
             src="src/assets/logo-fastcloud-dark.png" 
             alt="FastCloud" 
             className={`transition-all duration-300 ${
               isCollapsed 
                 ? 'h-8 w-auto max-w-none absolute left-0' 
                 : 'h-10 w-auto object-contain'
             }`} 
           />
           {!isCollapsed && <span className="text-gray-500 text-xs mt-1 ml-2 transition-opacity duration-300 whitespace-nowrap">V 1.0.0</span>}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-gray-400 hover:text-white transition-all duration-300 z-50 ${isCollapsed ? 'absolute -right-3 top-6 bg-[#2D3748] rounded-full p-1 border border-gray-700 shadow-lg' : ''}`}
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Primary Sidebar (Icons Left) */}
        <div className={`w-16 flex flex-col items-center py-4 bg-[#191A1A] border-r border-gray-800 z-20 overflow-y-auto ${isCollapsed ? 'w-full border-none' : ''}`}>
          
          {/* Main Navigation Icons */}
          <div className="flex flex-col gap-2 w-full px-2">
            {primaryItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveMainTab(item.id)}
                className={`relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all group mx-auto ${activeMainTab === item.id ? 'bg-[#2D3748] text-[#F2911C]' : 'text-gray-400 hover:text-white'}`}
              >
                 {activeMainTab === item.id && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#F2911C] rounded-r-full"></div>
                 )}
                <item.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
      </div>

      {/* Secondary Sidebar (Menu Content) - Only visible when NOT collapsed */}
      <div className={`flex-1 flex flex-col bg-[#191A1A] overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
        {!isCollapsed && (
        <>
        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar pb-24">
          
          <h3 className="text-gray-500 font-semibold text-sm mb-4 px-2 tracking-wider">SEGURIDAD</h3>

          {/* Procesos Group */}
          <div className="mb-1">
            <button 
              onClick={() => toggleSubmenu('procesos')}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#2D3748] text-gray-200 hover:bg-[#374151] transition-colors mb-0.5"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-sm">Procesos</span>
              </div>
              {openSubmenus.procesos ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {openSubmenus.procesos && (
              <div className="pl-3 mt-0.5 space-y-0.5">
                <Link to="/dashboard/usuarios" className="flex items-center gap-2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm">
                  <Users className="w-3.5 h-3.5" />
                  <span>Usuarios</span>
                </Link>
                <Link to="/dashboard/permisos" className="flex items-center gap-2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Permisos Usuarios</span>
                </Link>
                <Link to="/dashboard/menu-rol" className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F2911C] text-white transition-colors text-sm">
                  <List className="w-3.5 h-3.5" />
                  <span>Menú por Rol</span>
                </Link>
                <Link to="/dashboard/configuracion" className="flex items-center gap-2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Configuracion</span>
                </Link>
              </div>
            )}
          </div>

          {/* Maestros Group */}
          <div className="mb-1">
            <button 
              onClick={() => toggleSubmenu('maestros')}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#2D3748] text-gray-400 hover:text-gray-200 transition-colors mb-0.5"
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="font-medium text-sm">Maestros</span>
              </div>
              {openSubmenus.maestros ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            
             {openSubmenus.maestros && (
              <div className="pl-3 mt-0.5 space-y-0.5">
                <Link to="/dashboard/sucursal" className="flex items-center gap-2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sucursal</span>
                </Link>
                 <Link to="/dashboard/roles" className="flex items-center gap-2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Roles</span>
                </Link>
              </div>
             )}
          </div>

        </div>
        </>
        )}
      </div>

        {/* Footer Storage Widget */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-800 bg-[#191A1A] z-30 transition-all duration-300">
            {/* Expanded Content */}
            <div className={`transition-all duration-200 ${isCollapsed ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100 relative'}`}>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Cloud className="w-5 h-5" />
                    <span className="font-medium text-sm">Almacenamiento</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-700 rounded-full mb-1 overflow-hidden">
                    <div className="h-full bg-[#E17100] rounded-full" style={{ width: '65%' }}></div>
                </div>
                
                <p className="text-gray-500 text-xs mb-3">476 GB disponibles de 938 GB</p>
                
                <button className="w-full py-1.5 px-3 bg-[#2D3748] hover:bg-[#374151] text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-700 text-sm font-medium">
                    <HelpCircle className="w-4 h-4" />
                    Más almacenamiento
                </button>
            </div>
            
            {/* Collapsed Storage Widget (Mini) */}
            <div className={`flex flex-col items-center gap-3 transition-all duration-200 ${isCollapsed ? 'opacity-100 relative delay-200' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                 <Cloud className="w-5 h-5 text-gray-400" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
