module.exports = {
  up(query, DataTypes) {
    return Promise.resolve()
      .then(() =>
        query.addColumn(
          'Ships',
          'year_built',
          {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          { query },
        ),
      )
      .then(() =>
        query.addColumn(
          'Ships',
          'home_port',
          {
            type: DataTypes.STRING,
            allowNull: true,
          },
          { query },
        ),
      )
      .then(() =>
        query.addColumn(
          'Ships',
          'type',
          {
            type: DataTypes.STRING,
            allowNull: true,
          },
          { query },
        ),
      );
  },

  down(query) {
    return Promise.resolve()
      .then(() => query.removeColumn('Ships', 'year_built', { query }))
      .then(() => query.removeColumn('Ships', 'home_port', { query }))
      .then(() => query.removeColumn('Ships', 'type', { query }));
  },
};
