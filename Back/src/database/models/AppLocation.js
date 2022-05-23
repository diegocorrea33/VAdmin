export default function (sequelize, DataTypes) {
  const appLocation = sequelize.define(
    "appLocation",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      latitude: {
        type: DataTypes.STRING(255),
        field: "latitude",
        allowNull: true,
        defaultValue: ""
      },
      longitude: {
        type: DataTypes.STRING(255),
        field: "longitude",
        allowNull: true,
        defaultValue: ""
      },
      title: {
        type: DataTypes.STRING(255),
        field: "title",
      },
      contact: {
        type: DataTypes.TEXT,
        field: "contact",
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
      tableName: "app_location",
    }
  );



  return appLocation;
};
