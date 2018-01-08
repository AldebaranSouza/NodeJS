module.exports = function (app) {
    app.get("/produtos", function (req, res) {
        connection = app.infra.connectionFactory();
        var produtoBD = new app.infra.ProdutosDAO(connection);
        produtoBD.lista(function (error, results){
            if (error) {
                console.log(error);
            }

            res.format({
                html: function(){
                    res.render("produtos/lista", { produtos : results });
                },
                json: function(){
                    res.json(results);
                },
            });
            connection.end();
        });
    });

    app.get("/produtos/form", function (req, res) {
        res.render("produtos/form", {error: '',
                                    produto: {}});
    });

    app.post("/produtos", function (req, res) {
        var produto = req.body;
        
        req.assert('titulo','Titulo é obrigatório').notEmpty();
        //req.assert('preco','Preço é obrigatório').notEmpty();
        req.assert('preco','Formator inválido').isFloat();
        
        var errors = req.validationErrors();
        var error = {};
        if(errors){
            for(var i=0; i < errors.length; i++){
                var field = errors[i].param;
                error[field] = errors[i].msg;
                //console.log(error);
            }

            res.format({
                html: function(){
                    res.status(400);
                    res.render('produtos/form', {error: error, 
                                                produto: produto});
                },
                json: function(){
                    res.status(400);
                    res.json(error);
                }
            });
            return;
        }

        connection = app.infra.connectionFactory();
        var produtoBD = new app.infra.ProdutosDAO(connection);
        produtoBD.salvar(produto, function(error,result){
            if (error) {
                console.log(error);
            }
            res.redirect("/produtos");
            connection.end();
        });
    });

    app.delete("/produtos", function (req, res) {
        console.log("chegou no DELETE");
        res.format({
            html: function(){
                res.redirect("/");
            },
            json: function(){
                res.json("Produto excluído com sucesso!!");
            }
        })
    });
}