export default function (sequelize, DataTypes) {
  const appCustomerList = sequelize.define(
    "appCustomerList",
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
        defaultValue: ""
      },
      customers: {
        type: DataTypes.TEXT,
        field: "customers",
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
      tableName: "app_customer_list",
    }
  );



  return appCustomerList;
};
