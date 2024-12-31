import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına maksimum istek
});
app.use(limiter);

// Basit kullanıcı veritabanı (gerçek uygulamada MongoDB kullanılmalı)
const admin = {
  username: process.env.ADMIN_USERNAME,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && bcrypt.compareSync(password, admin.password)) {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Yetkilendirme gerekli' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Geçersiz token' });
    }
    req.user = user;
    next();
  });
};

// Protected route örneği
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  // Burada veritabanından istatistikleri çekebilirsiniz
  res.json({
    visits: 1234,
    messages: 56,
    projects: 12
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 