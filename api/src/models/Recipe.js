const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(1500),
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          withinTheScale(value) {
            if (value < 1 && value > 100) {
              throw new Error("The Health Score should be between 1 and 100");
            }
          },
        },
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.STRING(25000)),
      },
      image: {
        type: DataTypes.STRING(35000),
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
