const { Disco, Artista, Genero } = require('../models');

exports.listarDiscos = async (req, res) => {
    const discos = await Disco.findAll({
        include: [{ model: Artista }, { model: Genero }],
    });
    res.render('index', { discos });
};

exports.adicionarDisco = async (req, res) => {
    const { titulo, ano, generoNome, artistaNome, faixas } = req.body;

    const [genero] = await Genero.findOrCreate({ where: { nome: generoNome } });
    const [artista] = await Artista.findOrCreate({ where: { nome: artistaNome } });

    await Disco.create({
        titulo,
        ano,
        generoId: genero.id,
        artistaId: artista.id,
        faixas: faixas.split(','), 
    });

    res.redirect('/discos');
};

exports.removerDisco = async (req, res) => {
    const { id } = req.params;
    await Disco.destroy({ where: { id } });
    res.redirect('/discos');
};
