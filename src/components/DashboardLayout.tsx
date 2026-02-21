import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const menuItems = [
    { icon: '📊', label: 'Dashboard', link: '/dashboard' },
    { icon: '⚡', label: 'Estações', link: '/dashboard/estacoes' },
    { icon: '💳', label: 'Transações', link: '/dashboard/transacoes' },
    { icon: '📈', label: 'Cobranças', link: '/dashboard/cobranca' },
    { icon: '👥', label: 'Proprietários', link: '/cadastro/proprietarios' },
    { icon: '⚙️', label: 'Notificações', link: '/dashboard/notificacoes' }
  ];

  const Sidebar = () => (
    <div style={{
      width: sidebarOpen ? '250px' : '70px',
      background: 'linear-gradient(180deg, #2d5a5a 0%, #1a3d3d 100%)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      transition: 'width 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarOpen ? 'space-between' : 'center'
      }}>
        {sidebarOpen && (
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            2BCharge
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '5px'
          }}
        >
          <FiMenu />
        </button>
      </div>

      <nav style={{ flex: 1, padding: '20px 0' }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.link;
          return (
            <div
              key={index}
              style={{
                padding: '15px 20px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                background: isActive ? 'rgba(76, 175, 80, 0.2)' : 'transparent',
                borderLeft: isActive ? '3px solid #4CAF50' : '3px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate(item.link)}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {sidebarOpen && <span style={{ color: 'white' }}>{item.label}</span>}
            </div>
          );
        })}
      </nav>

      <div style={{
        padding: '20px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          color: 'white',
          cursor: 'pointer'
        }}>
          <FiLogOut size={20} />
          {sidebarOpen && <span style={{ color: 'white'}} onClick={handleSignOut}>Sair</span>}
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <div style={{
      background: 'white',
      padding: '20px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '30px'
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#1a1a1a' }}>Dashboard</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
          Bem-vindo de volta! Aqui está o resumo de hoje.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <FiBell size={20} color="#666" />
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          fontWeight: 'bold'
        }}>
          U
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', background: '#f8f9fa', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      
      <div style={{
        marginLeft: sidebarOpen ? '250px' : '70px',
        flex: 1,
        minWidth: 0,
        width: '100%',
        transition: 'margin-left 0.3s ease',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
