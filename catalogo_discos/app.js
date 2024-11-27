const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const discoRoutes = require('./routes/discoRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/discos', discoRoutes);

db.sequelize.sync({ force: true }).then(() => {
    console.log('Banco de dados completamente sincronizado e pronto pra partir!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000, aí sim hein!'));
}).catch(err => console.log(err));
