const mongoose = require('mongoose');
const ManagerSchema = new mongoose.Schema({
nom: { type: String, required: true },
prenom: { type: String, required: true },
email: { type: String, required: true },
datedenaissannce: { type: Date, required: true },
mdp: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Manager', ManagerSchema);