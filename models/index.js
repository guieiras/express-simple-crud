// Requerindo o FileSystem (módulo do NodeJS)
const fileSystem = require('fs');
// Requerindo o Path (módulo do NodeJS)
const path = require('path');
// Requerindo o Sequelize (node_modules)
const Sequelize = require('sequelize');
// Usando a função basename do módulo path para pegar o nome de arquivo do módulo atual
const basename = path.basename(module.filename);

// Definindo uma nova instância do Sequelize usando Postgres no localhost
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Criação do objeto que será exportado como módulo
let db = {};

/*
  Ler todos os arquivos do diretório atual(/models) usando a variável global __dirname
  A partir do array retornado, aplicar um filter
*/
fileSystem.readdirSync(__dirname).filter((file) => {
  /*
    O filter só permitirá arquivos que:
      - Não comecem por '.'
      - Não tenham o mesmo nome que esse (index.js)
      - Sejam arquivos '*.js'
  */
  let isVisible = file.indexOf('.') !== 0;
  let isAnotherFile = file !== basename;
  let isJs = file.slice(-3) === '.js'

  return isVisible && isAnotherFile && isJs
}).forEach((file) => {
  /*
    Aplicar a função join do módulo path para juntar o diretório atual,
    usando o __dirname, com o nome do arquivo, que é o 'file' do forEach.
  */
  let absolutePath = path.join(__dirname, file);

  // Usar a função import da instância atual do Sequelize para importar os models
  let model = sequelize['import'](absolutePath);

  // Incluir o model recém importado no objeto com a chave sendo o nome do model
  db[model.name] = model;
});

// Ler todas as chaves do objeto e para cada aplicar a seguinte função
Object.keys(db).forEach((modelName) => {
  /*
    Se o model tiver associações, a gente passa os models
    para que o Sequelize crie as relações
  */
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Disponibilizando a nossa instância do Sequelize e a classe toda
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportando o objeto 'db' como um módulo
module.exports = db;
