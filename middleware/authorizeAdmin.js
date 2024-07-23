// Middleware untuk mengautorisasi pengguna dengan peran 'admin'
function authorizeAdmin(req, res, next) {
  // Memeriksa apakah pengguna dalam request ada dan apakah perannya bukan 'admin'
  if (req.user && req.user.role !== "admin") {
    // Jika peran pengguna bukan 'admin', kembalikan status 403 (Forbidden) dengan pesan "Access Denied"
    return res.status(403).json({ message: "Access Denied" });
  }
  // Jika pengguna adalah 'admin', lanjutkan ke middleware berikutnya
  next();
}

// Mengekspor middleware untuk digunakan di tempat lain
module.exports = authorizeAdmin;
