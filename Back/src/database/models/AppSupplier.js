export default function (sequelize, DataTypes) {
  const appSupplier = sequelize.define(
    "appSupplier",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "name"
      },
      contact: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "contact"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updatedAt",
      },
    },
    {
      tableName: "app_supplier",
    }
  );



  return appSupplier;
};
