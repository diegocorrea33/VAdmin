export default function (sequelize, DataTypes) {
  const appSale = sequelize.define(
    "appSale",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      idCustomer: {
        type: DataTypes.INTEGER(11),
        field: "idCustomer",
      },
      referenceSale:{
        type: DataTypes.STRING(255),
        field: "referenceSale"
      },
      products: {
        type: DataTypes.TEXT,
        field: "products",
      },
      date: {
        type: DataTypes.STRING(255),
        field: "date"
      },
      deposit: {
        type: DataTypes.INTEGER(11),
        field: "deposit"
      },
      idUser: {
        type: DataTypes.INTEGER(11),
        field: "idUser"
      },
      idRoute: {
        type: DataTypes.INTEGER(11),
        field: "idRoute"
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "status",
        default: 1
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
      tableName: "app_sale",
    }
  );



  return appSale;
};
