var http = require('http');
var configuracoes = {
    hostname: 'localhost',
    port:3000,
    path: '/produtos',
    method : "POST",
    headers : {
        'Accept' : 'application/json', //recebendo dados como JSON
        'Content-Type' : 'application/json' //envia dados JSON
    }
};

var client = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log("Corpo " + body);
    });
});

var produto = {
    titulo : '',
    descricao: 'node, javascript e um pouco sobre http',
    preco: ''
}

client.end(JSON.stringify(produto));