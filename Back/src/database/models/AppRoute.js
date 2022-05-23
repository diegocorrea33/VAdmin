export default function (sequelize, DataTypes) {
  const appRoute = sequelize.define(
    "appRoute",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      idCustomers: {
        type: DataTypes.STRING(255),
        field: "idCustomers",
        allowNull: true,
        defaultValue: ""
      },
      inventory: {
        type: DataTypes.TEXT,
        field: "inventory"
      },
      inventoryInitial: {
        type: DataTypes.TEXT,
        field: "inventoryInitial"
      },
      idUser: {
        type: DataTypes.INTEGER(11),
        field: "idUser"
      },
      date: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "date",
      },
      state: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "state",
        defaultValue: 0
      },
      percentaje: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "percentaje",
        defaultValue: 0
      },
      totalValue: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "totalValue",
        defaultValue: 0
      },
      totalDeposit: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "totalDeposit",
        defaultValue: 0
      },
      totalExtraExpense: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "totalExtraExpense",
        defaultValue: 0
      },
      profit: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "profit",
        defaultValue: 0
      },
      valueDeliver: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "valueDeliver",
        defaultValue: 0
      },
      duplicate: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "duplicate",
        defaultValue: 0
      },
      previousRoute: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "previousRoute",
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
      tableName: "app_route",
    }
  );



  return appRoute;
};
