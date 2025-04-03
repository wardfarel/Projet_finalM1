
const mongoose = require('mongoose');
const VoitureSchema = new mongoose.Schema({
    model: { type: String, required: true },
    marque_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Marque', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Voiture', VoitureSchema);