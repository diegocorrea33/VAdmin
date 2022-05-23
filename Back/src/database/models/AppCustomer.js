export default function (sequelize, DataTypes) {
  const appCustomer = sequelize.define(
    "appCustomer",
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
        field: "title",
      },
      address: {
        type: DataTypes.STRING(255),
        field: "address",
      },
      idLocation: {
        type: DataTypes.INTEGER(11),
        field: "idLocation"
      },
      idUser: {
        type: DataTypes.INTEGER(11),
        field: "idUser",
        allowNull: true,
        defaultValue: ""
      },
      due: {
        type: DataTypes.INTEGER(11),
        field: "due",
        defaultValue: 0
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
      tableName: "app_customer",
    }
  );



  return appCustomer;
};
