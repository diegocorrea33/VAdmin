export default function (sequelize, DataTypes) {
  const appExtraExpense = sequelize.define(
    "appExtraExpense",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      description: {
        type: DataTypes.STRING(255),
        field: "description",
        default: "",
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER(11),
        field: "price",
        default: "",
        allowNull: false
      },
      idRoute: {
        type: DataTypes.INTEGER(11),
        field: "idRoute",
        default: "",
        allowNull: false
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
      tableName: "app_extraexpense",
    }
  );



  return appExtraExpense;
};
