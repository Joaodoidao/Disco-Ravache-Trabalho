module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Genero', {
        nome: { type: DataTypes.STRING, allowNull: false, unique: true },
    });
};
