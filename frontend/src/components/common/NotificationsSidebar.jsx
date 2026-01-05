import React, { useState } from 'react';
import { X, FileText, User, CheckCheck, File } from 'lucide-react';

const NotificationsSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('unread'); // 'all' or 'unread'

  // Mock Data basada en la imagen
  const notifications = [
    {
      id: 1,
      type: 'DOCUMENTOS',
      date: '29/10/2025',
      content: 'SOAT del carro pequeño',
      highlight: 'Vence en 16 días',
      highlightColor: 'text-[#D84315]', // Tono naranja rojizo
      suffix: '. Recuerde renovar el documento antes de la fecha.',
      isUnread: true,
      icon: FileText,
      iconBg: 'bg-[#FFF3E0]', // Naranja muy claro
      iconColor: 'text-[#E65100]' // Naranja fuerte
    },
    {
      id: 2,
      type: 'DOCUMENTOS',
      date: '29/10/2025',
      content: 'SOAT del carro pequeño',
      highlight: 'Vence en 16 días',
      highlightColor: 'text-[#D84315]',
      suffix: '. Recuerde renovar el documento antes de la fecha.',
      isUnread: false,
      icon: File,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      id: 3,
      type: 'EMPLEADO',
      date: '29/10/2025',
      content: 'El documento "LICENCIA CON GOSE" del empleado JUAN ROBERTO GONZALES:',
      highlight: 'Está por vencer.',
      highlightColor: 'text-[#D84315]',
      suffix: '',
      isUnread: false,
      icon: User,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      id: 4,
      type: 'DOCUMENTOS',
      date: '29/10/2025',
      content: 'SOAT del carro pequeño',
      highlight: 'Vence en 16 días',
      highlightColor: 'text-[#D84315]',
      suffix: '. Recuerde renovar el documento antes de la fecha.',
      isUnread: false,
      icon: File,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      id: 5,
      type: 'EMPLEADO',
      date: '29/10/2025',
      content: 'El documento "LICENCIA CON GOSE" del empleado JUAN ROBERTO GONZALES:',
      highlight: 'Está por vencer.',
      highlightColor: 'text-[#D84315]',
      suffix: '',
      isUnread: true,
      icon: User,
      iconBg: 'bg-[#FFF3E0]',
      iconColor: 'text-[#E65100]'
    }
  ];

  // Logic to filter notifications
  const displayedNotifications = activeTab === 'unread' 
    ? notifications.filter(n => n.isUnread) 
    : notifications;

  // Mock count to match image "34" (aunque solo mostramos 2 reales no leídas en el mock)
  const unreadCountMock = 34; 

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Actions */}
        <div className="px-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
             <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`pb-3 text-sm font-medium transition-colors relative pt-2 cursor-pointer ${activeTab === 'all' ? 'text-[#E17100]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Todas
                  {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E17100] rounded-t-full"></span>}
                </button>
                <button 
                  onClick={() => setActiveTab('unread')}
                  className={`pb-3 text-sm font-medium transition-colors relative flex items-center gap-2 pt-2 cursor-pointer ${activeTab === 'unread' ? 'text-[#E17100]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  No leídas
                  <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center flex items-center justify-center h-5">
                    {unreadCountMock}
                  </span>
                  {activeTab === 'unread' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E17100] rounded-t-full"></span>}
                </button>
             </div>
             
             <button className="text-[#E17100] text-xs font-semibold hover:underline flex items-center gap-1 pb-2 transition-colors hover:text-[#c56200] cursor-pointer">
                <CheckCheck className="w-4 h-4" />
                Marcar todas como leídas
             </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-130px)] p-4 space-y-2 bg-white custom-scrollbar">
           {displayedNotifications.map((notification) => (
             <div 
               key={notification.id} 
               className={`p-4 rounded-xl transition-all border cursor-pointer hover:shadow-md ${notification.isUnread ? 'bg-[#F8F9FA] border-transparent' : 'bg-white border-transparent'}`}
             >
                <div className="flex gap-4">
                   {/* Icon */}
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.iconBg} relative mt-1`}>
                      <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                      {notification.isUnread && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-[#E17100] rounded-full border-2 border-[#F8F9FA]"></span>
                      )}
                   </div>
                   
                   {/* Content */}
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">{notification.type}</span>
                         <span className="text-xs text-gray-400 font-medium">{notification.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {notification.content} <span className={`${notification.highlightColor} font-semibold`}>{notification.highlight}</span>{notification.suffix}
                      </p>
                   </div>
                </div>
             </div>
           ))}

           {displayedNotifications.length === 0 && (
             <div className="flex flex-col items-center justify-center h-40 text-gray-400">
               <p className="text-sm">No tienes notificaciones pendientes</p>
             </div>
           )}
        </div>

      </div>
    </>
  );
};

export default NotificationsSidebar;
