export default function (sequelize, DataTypes) {
  const appStock = sequelize.define(
    "appStock",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "title"
      },
      idProduct: {
        type: DataTypes.INTEGER(11),
        field: "idProduct",
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        field: "quantity",
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
      tableName: "app_stock",
    }
  );



  return appStock;
};
