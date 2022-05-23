export default function (sequelize, DataTypes) {
  const appProduct = sequelize.define(
    "appProduct",
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
        field: "name",
      },
      description: {
        type: DataTypes.STRING(255),
        field: "description",
      },
      price: {
        type: DataTypes.INTEGER(11),
        field: "price",
      },
      priceSale: {
        type: DataTypes.INTEGER(11),
        field: "priceSale",
      },
      priceDist: {
        type: DataTypes.INTEGER(11),
        field: "priceDist",
      },
      priceSupplier: {
        type: DataTypes.INTEGER(11),
        field: "priceSupplier",
      },
      priceCredit: {
        type: DataTypes.INTEGER(11),
        field: "priceCredit",
      },
      priceCount: {
        type: DataTypes.INTEGER(11),
        field: "priceCount",
      },
      available: {
        type: DataTypes.INTEGER(11),
        field: "available",
      },
      assigned: {
        type: DataTypes.INTEGER(11),
        field: "assigned",
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
      tableName: "app_product",
    }
  );



  return appProduct;
};
