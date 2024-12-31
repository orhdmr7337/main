import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
        <a className="nav-link me-3" href="#contact">İletişim</a>
        <a 
          className="nav-link btn custom-btn-outline px-3" 
          href="/admin/login"
          style={{
            border: '1px solid #08fdd8',
            color: '#08fdd8',
            transition: 'all 0.3s ease-in-out'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#08fdd8';
            e.target.style.color = '#1d1d1d';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#08fdd8';
          }}
        >
          <i className="fas fa-user me-1"></i>
          Giriş
        </a>
      </div>
    </nav>
  );
};

export default Navbar; 