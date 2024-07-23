const express = require("express");
const router = express.Router();
const Penduduk = require("../models/penduduk");
const RiwayatPerubahan = require("../models/riwayatPerubahan");
const ServiceRequest = require("../models/serviceRequest");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeAdmin = require("../middleware/authorizeAdmin");

/* 
  Menambahkan Penduduk Baru:

Route: POST /
Middleware: authenticateToken, authorizeAdmin
Proses: Data penduduk baru diambil dari body request dan digunakan untuk membuat entitas penduduk baru dalam database. Jika berhasil, respons dengan status 201 (Created) dan data penduduk dikirimkan.
Memperbarui Data Penduduk:

Route: PUT /:id
Middleware: authenticateToken, authorizeAdmin
Proses: Id penduduk diambil dari parameter request dan data yang diperbarui diambil dari body request. Jika penduduk ditemukan, data diperbarui dan dicatat dalam riwayat perubahan. Jika tidak ditemukan, respons dengan status 404 (Not Found) dikirimkan.
Menghapus Data Penduduk:

Route: DELETE /:id
Middleware: authenticateToken, authorizeAdmin
Proses: Id penduduk diambil dari parameter request. Jika penduduk ditemukan, data dihapus dari database. Jika tidak ditemukan, respons dengan status 404 (Not Found) dikirimkan.
Mencari Penduduk:

Route: GET /
Middleware: authenticateToken, authorizeAdmin
Proses: Query parameters digunakan untuk membangun kondisi pencarian (whereClause). Penduduk yang cocok dengan kondisi pencarian dikembalikan sebagai respons.
Mendapatkan Riwayat Perubahan Data Penduduk:

Route: GET /:id/riwayat
Middleware: authenticateToken, authorizeAdmin
Proses: Id penduduk diambil dari parameter request. Riwayat perubahan data penduduk dikembalikan sebagai respons.
Mendapatkan Permintaan Layanan untuk Penduduk:

Route: GET /:id/layanan
Middleware: authenticateToken, authorizeAdmin
Proses: Id penduduk diambil dari parameter request. Permintaan layanan yang terkait dengan penduduk dikembalikan sebagai respons.
*/

// Create a new resident
router.post("/", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const penduduk = await Penduduk.create(req.body);
    res.status(201).json(penduduk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update resident data
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const penduduk = await Penduduk.findByPk(req.params.id);
    if (!penduduk)
      return res.status(404).json({ message: "Resident not found" });

    await penduduk.update(req.body);
    await RiwayatPerubahan.create({
      idPenduduk: penduduk.idPenduduk,
      perubahan: JSON.stringify(req.body),
    });

    res.json(penduduk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete resident data
router.delete("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const penduduk = await Penduduk.findByPk(req.params.id);
    if (!penduduk)
      return res.status(404).json({ message: "Resident not found" });

    await penduduk.destroy();
    res.json({ message: "Resident deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search for residents
router.get("/", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { nama, alamat, nomorKTP } = req.query;
    const whereClause = {};

    if (nama) whereClause.nama = nama;
    if (alamat) whereClause.alamat = alamat;
    if (nomorKTP) whereClause.nomorKTP = nomorKTP;

    const penduduk = await Penduduk.findAll({ where: whereClause });
    res.json(penduduk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get resident change history
router.get(
  "/:id/riwayat",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const riwayat = await RiwayatPerubahan.findAll({
        where: { idPenduduk: req.params.id },
      });
      res.json(riwayat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get service requests for a resident
router.get(
  "/:id/layanan",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const serviceRequests = await ServiceRequest.findAll({
        where: { idPenduduk: req.params.id },
      });
      res.json(serviceRequests);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
