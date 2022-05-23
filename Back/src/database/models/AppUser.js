export default function (sequelize, DataTypes) {
  const appUser = sequelize.define(
    "appUser",
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
        field: "name",
        defaultValue: "name",
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "status",
        defaultValue: "0",
      },
      document: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "document",
      },
      typeUser: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "typeUser",
        defaultValue: "1",
      },
      phone: {
        type: DataTypes.STRING(180),
        allowNull: true,
        field: "phone",
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: true,
        field: "email",
      },
      profit: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: "profit",
        defaultValue: "0",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password",
      },
      code: {
        type: DataTypes.STRING(180),
        allowNull: true,
        field: "code",
        defaultValue: "",
      },
      signInMethod: {
        type: DataTypes.STRING(180),
        allowNull: true,
        field: "signInMethod",
        defaultValue: "normal",
      },
      lastlogin: {
        type: DataTypes.STRING(180),
        allowNull: true,
        field: "lastlogin",
        defaultValue: "0",
      },
      device: {
        type: DataTypes.STRING(180),
        allowNull: true,
        field: "device",
        defaultValue: "0",
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
      tableName: "app_user",
    }
  );



  return appUser;
};
