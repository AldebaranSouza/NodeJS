var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var validator = require('express-validator');
//para carregar o App podemos utilizar o comando abaixo...
////var app = require('express')();
module.exports = function () {
    var app = express();
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    
    //use() recebe funções que serão aplicadas ao request na ordem que definirmos
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(validator());

    load('routes', {cwd : 'app'})
        .then('infra')
        .into(app);

    return app;
}