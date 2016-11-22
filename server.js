// Requerindo o express dos node_modules
const express = require('express');

// Requerindo o arquivo principal dos models
const models = require('./models/index.js')

// Criação do app a partir de uma instância do express
const app = express();

// Chamar a função para aguardar que o banco de dados seja sincronizado com os models
// Aqui as tabelas serão criadas e as colunas alteradas seguindo os models
models.sequelize.sync().then(() => {
  // Em caso de sucesso:
  // Chamar função para inicializar o servidor na porta 3000
  app.listen(3000, () => {
    // Função que será executada após a inicialização do servidor
    console.log('Iniciando applicação na porta 3000');
  });
}).catch((error) => {
  // Em caso de erro:
  // Apresentar o erro retornado
  console.log(error);
});

// Criação da rota GET /students (Index)
app.get('/students', (request, response) => {
  // Obter todos os Student e quando acabar:
  models.Student.all().then((students) => {
    // Em caso de sucesso:
    // Responde com os students
    response.send(students)
  }).catch((error) => {
    // Em caso de erro:
    // Responde com o status 500 e apresenta o erro
    response.status(500).send(error)
  });
});
