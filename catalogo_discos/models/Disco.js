module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Disco', {
        titulo: { type: DataTypes.STRING, allowNull: false },
        ano: { type: DataTypes.INTEGER, allowNull: false },
        capa: { type: DataTypes.STRING }, 
        faixas: { type: DataTypes.JSON }, 
    });
};
