// Import jwt untuk memverifikasi token JWT
const jwt = require("jsonwebtoken");
// Memuat variabel lingkungan dari file .env
require("dotenv").config();

// Middleware untuk mengautentikasi token JWT
function authenticateToken(req, res, next) {
  // Mendapatkan token dari header Authorization dan menghapus prefix "Bearer "
  const token = req.header("Authorization").replace("Bearer ", "");

  // Jika token tidak ada, kembalikan status 401 (Unauthorized) dengan pesan "Access Denied"
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // Memverifikasi token menggunakan secret key
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // Menyimpan informasi pengguna dari token ke dalam request
    req.user = verified;
    // Melanjutkan ke middleware berikutnya
    next();
  } catch (err) {
    // Jika verifikasi token gagal, kembalikan status 400 (Bad Request) dengan pesan "Invalid Token"
    res.status(400).json({ message: "Invalid Token" });
  }
}

// Mengekspor middleware untuk digunakan di tempat lain
module.exports = authenticateToken;
