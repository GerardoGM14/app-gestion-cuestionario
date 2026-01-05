import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/layout/Layout'
import DashboardHome from './pages/DashboardHome'
import MenuRol from './pages/MenuRol'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<DashboardHome />} />
        <Route path="menu-rol" element={<MenuRol />} />
        {/* Placeholder routes for other sidebar items */}
        <Route path="*" element={<div className="p-8">Página en construcción</div>} />
      </Route>
    </Routes>
  )
}

export default App
