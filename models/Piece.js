const mongoose = require('mongoose');
const PieceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    voiture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Voiture', required: true },
    prix:{type: mongoose.Schema.Types.Decimal128, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Piece', PieceSchema);