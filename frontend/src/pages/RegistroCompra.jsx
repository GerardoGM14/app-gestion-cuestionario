import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  ChevronDown, 
  FileText,
  CheckCircle2
} from 'lucide-react';

const RegistroCompra = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [includeDetails, setIncludeDetails] = useState(false);
  const [noteIngreso, setNoteIngreso] = useState(true);

  return (
    <div className="w-full p-4">
      {/* Header & Breadcrumbs */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Registro de Compra</h1>
        </div>
        <div className="text-sm text-gray-500 ml-8">
          <span>Ventas</span>
          <span className="mx-2">/</span>
          <span>Proceso</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Registro de Compra</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        
        {/* Top Controls: Tabs & Search Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'info' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <FileText size={16} />
              Información General
            </button>
            
            <button 
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'details' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="w-4 h-4 border border-current rounded sm:w-4 sm:h-4 flex items-center justify-center text-[10px]">
                📦
              </div>
              Detalles de las Compras
            </button>

            <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-600">
              <CheckCircle2 size={16} />
              Item 1
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 text-orange-600 rounded-md text-sm font-medium hover:bg-orange-100 transition-colors">
            <Search size={16} />
            Buscar Operación
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          
          {/* Left Column: Detalles del Documento */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Detalles del Documento</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Mes Sunat</label>
                <div className="relative">
                  <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                    <option>OCTUBRE</option>
                    <option>NOVIEMBRE</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Año Sunat</label>
                <input 
                  type="text" 
                  defaultValue="2025" 
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Fecha de Emisión</label>
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="2025-10-15" 
                    className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Fecha de Vencimiento</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Tipo de Operación</label>
                <div className="relative">
                  <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                    <option>GRAVADO DEST. OPER. GRAV.</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Tipo de Documento</label>
                <div className="relative">
                  <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                    <option>03 - BOLETA</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Serie</label>
                <div className="relative">
                  <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                    <option>B001</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Número</label>
                <div className="relative">
                  <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                    <option>00000035</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Moneda</label>
                <div className="flex gap-2">
                  <div className="relative w-1/2">
                    <select className="w-full h-10 px-2 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                      <option>PEN</option>
                      <option>USD</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    className="w-1/2 h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 text-right"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">IGV</label>
                <input 
                  type="text" 
                  defaultValue="18%" 
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Toggles Section */}
            <div className="p-4 bg-orange-50/50 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">¿Incluir detalles de compra?</span>
                <button 
                  onClick={() => setIncludeDetails(!includeDetails)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${includeDetails ? 'bg-orange-500' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${includeDetails ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-gray-700">¿Nota de Ingreso?</span>
                <button 
                  onClick={() => setNoteIngreso(!noteIngreso)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${noteIngreso ? 'bg-orange-500' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${noteIngreso ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {noteIngreso && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="relative">
                    <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                      <option>Almacén</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  <div className="relative">
                    <div className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 flex items-center justify-between">
                      <span>Fecha de Ingreso</span>
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Datos del Proveedor */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800">Datos del Proveedor</h2>
              <div className="flex gap-4">
                <div className="w-1/3 space-y-1">
                  <label className="text-xs font-medium text-gray-500">Documento</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="20559659437"
                      className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <Search className="absolute right-3 top-3 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="w-2/3 space-y-1">
                  <label className="text-xs font-medium text-gray-500">Nombre Proveedor</label>
                  <input 
                    type="text" 
                    defaultValue="JS CONSULTING S.A.C. SDVFDFS"
                    readOnly
                    className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Detalles de Pago */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800">Detalles de Pago</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">Modo de Pago</label>
                  <div className="relative">
                    <select className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none">
                      <option>CONTADO</option>
                      <option>CRÉDITO</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Operación</label>
                  <input 
                    type="text" 
                    placeholder="Operación"
                    disabled
                    className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">Detracción</label>
                <div className="relative">
                  <select disabled className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400 appearance-none">
                    <option>Detracción</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-300 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Import. %</label>
                  <input 
                    type="text" 
                    placeholder="Import. %"
                    disabled
                    className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Import. S/</label>
                  <input 
                    type="text" 
                    placeholder="Import. S/ ."
                    disabled
                    className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Detracción Fecha</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Detracción Fecha"
                      disabled
                      className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400"
                    />
                    <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400"># Constancia</label>
                  <input 
                    type="text" 
                    placeholder="# Constancia"
                    disabled
                    className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Detalles Adicionales */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800">Detalles Adicionales</h2>
              <textarea 
                placeholder="Ingrese observaciones adicionales"
                className="w-full h-24 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
              ></textarea>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistroCompra;
