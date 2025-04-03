const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
    client_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
    voiture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'voiture', required: true },
    adresse:{ type: String, required: true },
    description:{ type: String, required: true },
    etat:{type:Number ,required: true, validate:{
        validator: function(v){
            return Number.isInteger(v);
        }
    }}//0==> en attente, 1==>mecanicien
}, { timestamps: true });
module.exports = mongoose.model('Reservation', ReservationSchema);