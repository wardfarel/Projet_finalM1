const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    adresse: { type: String, required: true },
    datedenaissance: { type: Date, required: true },
    mdp: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Client', ClientSchema);