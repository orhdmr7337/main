import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-tertiary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#08fdd8] mb-6 text-center">Admin Girişi</h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Kullanıcı Adı</label>
            <input 
              type="text" 
              className="w-full bg-primary border border-[#08fdd8] text-white p-2 rounded focus:outline-none focus:border-[#08fdd8]"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm mb-2">Şifre</label>
            <input 
              type="password" 
              className="w-full bg-primary border border-[#08fdd8] text-white p-2 rounded focus:outline-none focus:border-[#08fdd8]"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#08fdd8] text-primary py-2 rounded hover:opacity-90 transition-opacity font-bold"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 