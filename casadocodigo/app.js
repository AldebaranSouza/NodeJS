var PORTA = 3000;
var app = require ('./config/express')();

app.listen(PORTA, function(){
    console.log("servidor rodando");
});