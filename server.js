// Requerindo o express e o body-parser dos node_modules
const express = require('express');
const bodyParser = require('body-parser');

// Requerindo o arquivo principal dos models
const models = require('./models/index.js')

// Criação do app a partir de uma instância do express
const app = express();

// Usando o bodyParser de JSON na aplicação
app.use(bodyParser.json());

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

// Criação da rota POST /students (Create)
app.post('/students', (request, response) => {
  // Obter o body da requisição(já parseado)
  let params = request.body;

  // Definir o objeto para ser criado
  let newStudent = {
    name: params['name'],
    course: params['course']
  };

  // Criar um novo Student e quando acabar:
  models.Student.create(newStudent).then((student) => {
    // Em caso de sucesso:
    // Responde com o Student criado
    response.send(student)
  }).catch((error) => {
    // Em caso de erro:
    // Responde com o status 422 e apresenta o erro
    response.status(422).send(error)
  });
});
