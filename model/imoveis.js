var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imoveisSchema = new Schema({
    date: {type: String},
    rua: { type: String },
    numero: { type: String },
    bairro: { type: String },
    condominio: { type: String },
    price: { type: String },
    area: { type: String },
    price_by_sqm: { type: String },
    condominium_fee: { type: String },
    iptu: { type: String },
    rooms: { type: String },
    bathrooms: { type: String },
    garage: { type: String },
    agent: { type: String },
    agent_number: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    property_d: { type: String },
    url: { type: String }
})

var Imovel = module.exports = mongoose.model('Imoveis', imoveisSchema);

module.exports.getAllValidImoveis = function (callback) {
    Imovel.find({ latitude: { $ne: null },  longitude: { $ne: null }}, 'rua endereco numero bairro latitude longitude', function (err, res) {
        if (err) throw err;
        callback(err, res);
    }).select('-_id');
}