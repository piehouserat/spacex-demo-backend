import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Ships', 'year_built', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('Ships', 'home_port', {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Ships', 'type', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Ships', 'year_built');
    await queryInterface.removeColumn('Ships', 'home_port');
    await queryInterface.removeColumn('Ships', 'type');
  },
};