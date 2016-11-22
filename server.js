// Requerindo o express dos node_modules
const express = require('express');

// Criação do app a partir de uma instância do express
const app = express();

//Chamar função para inicializar o servidor na porta 3000
app.listen(3000, () => {
  // Função que será executada após a inicialização do servidor
  console.log('Iniciando applicação na porta 3000');
});
