const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Penduduk = sequelize.define(
  "Penduduk",
  {
    idPenduduk: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jenisKelamin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalLahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    agama: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kewarganegaraan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statusPerkawinan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pekerjaan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomorKTP: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Penduduk;
