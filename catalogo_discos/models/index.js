// index.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express(); 
const port = 3000;

// Configuração do Sequelize para SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Definir os modelos (Disco, Artista, Genero)
const Disco = sequelize.define('Disco', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capa: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Artista = sequelize.define('Artista', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Genero = sequelize.define('Genero', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relacionamentos (muitos para muitos entre disco e gênero, e entre disco e artista)
Disco.belongsToMany(Genero, { through: 'DiscoGenero' });
Genero.belongsToMany(Disco, { through: 'DiscoGenero' });

Disco.belongsToMany(Artista, { through: 'DiscoArtista' });
Artista.belongsToMany(Disco, { through: 'DiscoArtista' });

// Sincronizar o banco de dados
sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados sincronizado.");
}).catch((error) => {
  console.error("Erro ao sincronizar o banco de dados:", error);
});

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json());

// Rota para criar um disco
app.post('/disco', async (req, res) => {
  const { titulo, ano, capa } = req.body;

  try {
    const disco = await Disco.create({ titulo, ano, capa });
    res.status(201).json(disco);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o disco' });
  }
});

// Rota para listar todos os discos
app.get('/discos', async (req, res) => {
  try {
    const discos = await Disco.findAll();
    res.status(200).json(discos);
  } catch (error) {S
    res.status(500).json({ error: 'Erro ao listar discos' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
S