const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Penduduk = require("./penduduk");

const ServiceRequest = sequelize.define(
  "ServiceRequest",
  {
    idRequest: {
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
    jenisLayanan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusPermohonan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalPermohonan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

Penduduk.hasMany(ServiceRequest, { foreignKey: "idPenduduk" });
ServiceRequest.belongsTo(Penduduk, { foreignKey: "idPenduduk" });

module.exports = ServiceRequest;
