const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Penduduk = require("./penduduk");

const RiwayatPerubahan = sequelize.define(
  "RiwayatPerubahan",
  {
    idRiwayat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPenduduk: {
      type: DataTypes.INTEGER,
      references: {
        model: Penduduk,
        key: "idPenduduk",
      },
    },
    perubahan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tanggalPerubahan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

Penduduk.hasMany(RiwayatPerubahan, { foreignKey: "idPenduduk" });
RiwayatPerubahan.belongsTo(Penduduk, { foreignKey: "idPenduduk" });

module.exports = RiwayatPerubahan;
