var Imoveis = require('../model/imoveis');
var csv = require("fast-csv");
var fs = require('fs');

module.exports = function (app) {

    var csvData = "test";

    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.post('/', function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        var loadData = req.files.csv;

        loadData.mv('./uploads/' + req.files.csv.name, function (err) {
            if (err) return res.status(500).send(err);
        });

        var stream = fs.createReadStream('./uploads/' + req.files.csv.name);

        csv.fromStream(stream, {headers: true, delimiter:';'})
            .on("data", function (data) {
                var newImoveis = new Imoveis({
                    date: data.date,
                    rua: data.rua,
                    numero: data.numero,
                    bairro: data.bairro,
                    condominio: data.condominio,
                    price: data.price,
                    area: data.area,
                    price_by_sqm: data.price_by_sqm,
                    condominium_fee: data.condominium_fee,
                    iptu: data.iptu,
                    rooms: data.rooms,
                    bathrooms: data.bathrooms,
                    garage: data.garage,
                    agent: data.agent,
                    agent_number: data.agent_number,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    property_d: data.property_d,
                    url: data.url
                });
                newImoveis.save(function (err, data) {
                    if (err) console.log(err);
                    else {
                        console.log('Dados salvos ', data)
                    }
                })
        })
    });

    app.get('/dataImoveis', function (req, res) {
        Imoveis.getAllValidImoveis(function (err, docs) {
            if (err) throw err;
            console.log(docs);
            res.jsonp(docs);
        });
    });
}