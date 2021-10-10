/* Importando o Express */
var express = require('express');
var app = express();
app.use(express.json());

/* GETS */
app.get('/aplicativo', function(req, resp) {
    resp.send("Aplicativo Exemplo")
});

app.get('/html', function(req, resp) { 
    resp.send("<!DOCTYPE html>\n<head>\n<title>Hello World</title>\n</head>\n<body>\n<h1>Lista 03 – Tecnologias Web</h1>\n</body>\n</html>");
});

/* POST */
app.post('/imagens', function(req, resp) {
    resp.send("Imagem 1 - Imagem 2 - Imagem 3")
});

/* DELETE*/
app.delete('/cliente/:clienteId', function(req, resp) {
    var clienteId = req.params.clienteId;
    resp.send("O Cliente número " + clienteId + " foi removido com sucesso")
});

app.listen(3000, function () {
    console.log('Aplicacao Web rodando na porta 3000!');
});