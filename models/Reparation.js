const mongoose = require('mongoose');
const ReparationSchema = new mongoose.Schema({
    voiture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'voiture', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
    mecanicien_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'mecanicien', required: true },
    piece_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'piece', required: true }],
    fincontra:{type: Date, required: true},
}, { timestamps: true });
module.exports = mongoose.model('Reparation', ReparationSchema); 