export default function (sequelize, DataTypes) {
  const appInventoryInitial = sequelize.define(
    "appInventoryInitial",
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
        allowNull: true,
        field: "title",
        default: ""
      },
      products: {
        type: DataTypes.TEXT,
        field: "products",
      },
      state: {
        type: DataTypes.INTEGER(11),
        field: "state",
        default: 0
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
      tableName: "app_inventory_initial",
    }
  );



  return appInventoryInitial;
};
