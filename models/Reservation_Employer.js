const mongoose = require('mongoose');
const Reservation_EmployerSchema = new mongoose.Schema({
    reservation_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'reservation', required: true },
    mecanicien_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mecanicien', required: true },
    rendezVous:{type: Date,required:true},
    etat:{type:Number ,required: true, validate:{
        validator: function(v){
            return Number.isInteger(v);
        }
    }}//0==>en attente 1==> terminer
}, { timestamps: true });
module.exports = mongoose.model('Reservation_Employer', Reservation_EmployerSchema);