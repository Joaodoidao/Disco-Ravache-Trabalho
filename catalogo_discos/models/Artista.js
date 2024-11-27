module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Artista', {
        nome: { type: DataTypes.STRING, allowNull: false },
    });
};
