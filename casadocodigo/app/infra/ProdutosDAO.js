/*function ProdutosDAO() {
    console.log(">>>>>>>>>>>>>  new ProdutosDAO");
}*/
function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function (callback) {
    this._connection.query('select * from produtos', callback);
    console.log("chamando o END..");
    //this._connection.end();
}

ProdutosDAO.prototype.salvar = function (produto, callback) {
    this._connection.query('insert into produtos set ?', produto, callback);
    //this._connection.end();
}

/*module.exports = function (app) {
    this._connection = app.infra.connectionFactory();
    return ProdutosDAO;
}*/
module.exports = function () {
    return ProdutosDAO;
}