import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Token kontrolü
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-tertiary rounded-lg p-6 shadow-lg">
          <h1 className="text-[#08fdd8] text-3xl font-bold mb-6">Admin Paneli</h1>
          
          <div className="grid gap-6">
            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <h3 className="text-[#b3286c] font-bold mb-2">Toplam Ziyaret</h3>
                <p className="text-white text-2xl">1,234</p>
              </div>
              <div className="bg-primary p-4 rounded-lg">
                <h3 className="text-[#b3286c] font-bold mb-2">Mesajlar</h3>
                <p className="text-white text-2xl">56</p>
              </div>
              <div className="bg-primary p-4 rounded-lg">
                <h3 className="text-[#b3286c] font-bold mb-2">Projeler</h3>
                <p className="text-white text-2xl">12</p>
              </div>
            </div>

            {/* Çıkış Butonu */}
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/admin/login');
              }}
              className="bg-[#b3286c] text-white px-6 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 