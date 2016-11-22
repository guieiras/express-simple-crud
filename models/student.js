/*
  Exportando uma função para definir o nosso model.
  A função 'import' que está sendo chamada no index passa como parâmetros:
    - A instância do Sequelize
    - A classe do Sequelize
*/
module.exports = function(sequelize, Sequelize) {
  /*
    Definição do model Student com 3 campos
    id: Integer, Primary Key e auto-incrementável
    name: String, não nula
    course: String

    Como opções adicionais, o nome da tabela que será 'students'
  */
  return sequelize.define('Student', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    course: {
      type: Sequelize.STRING
    }
  },{
    tableName: 'students'
  })
}
