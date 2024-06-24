module.exports = (sequelize, DataTypes) => {
  const GridCharacter = sequelize.define(
    "GridCharacter",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      selectedChar: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      placedIndexOfTheCharacter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      row: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return GridCharacter;
};
