const mongoose = require('mongoose');
const MecanicienSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    mdp: { type: String, required: true },
    datedenaissannce: { type: Date, required: true },
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
    salaire: {type: mongoose.Schema.Types.Decimal128, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Mecanicien', MecanicienSchema);