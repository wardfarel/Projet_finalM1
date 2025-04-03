const express = require('express');
const router = express.Router();
const Mecanicien = require('../models/mecanicien');
const Reparation = require('../models/reparation');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Token';
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token manquant' });
    }
  
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Token invalide' });
      }
      req.user = decoded;
      next();
    });
  };
  // voiture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'voiture', required: true },
  //   client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
  //   mecanicien_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'mecanicien', required: true },
  //   piece_id: { type: mongoose.Schema.Types.ObjectId, ref: 'piece', required: true },
  //   prix:{type: mongoose.Schema.Types.Decimal128, required: true }
  router.post('/InsererReparation',verifyToken, async (req, res) => {
    const { voiture_id, client_id, piece_id ,fincontra} = req.body;
    if (!piece_id) {
      return res.send('Veuillez sélectionner une pièce.');
    }
    const mecanicien_id=req.user._id;
    const selectedPieces = Array.isArray(piece_id) ? piece_id : [piece_id];
    try {
      const reparation = new Reparation({
        voiture_id,
        client_id,
        mecanicien_id,
        piece_id: selectedPieces, 
        fincontra
      });
    await reparation.save();
    res.status(201).json(reparation);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});
  router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;

  try {
    const mecanicien = await Mecanicien.findOne({ email, mdp });
    
    if (!mecanicien) {
      return res.status(404).json({ message: 'mecanicien non trouvé ou mot de passe incorrect' });
    }
    const token = jwt.sign( { _id: mecanicien._id, email: mecanicien.email , nom: mecanicien.nom , prenom: mecanicien.prenom },SECRET_KEY,{ expiresIn: '1h' });
    res.json({ success: true, message: 'Bienvenue',token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
  });
router.post('/Creation',verifyToken, async (req, res) => {
    console.log(req.user._id)
    req.body.manager_id=req.user._id;
    try {
        if(req.body.mdp==req.body.mdp1){
            const mecanicien = new Mecanicien(req.body);
            await mecanicien.save();
            res.status(201).json(mecanicien);
        }
        else res.json({message: "Verifier votre mot de passe."})
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});
router.get('/Recuperation', async (req, res) => {
    try {
    const mecaniciens = await Mecanicien.find();
    res.json(mecaniciens);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const mecanicien = await Mecanicien.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(mecanicien);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Mecanicien.findByIdAndDelete(req.params.id);
    res.json({ message: "Mecanicien supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
module.exports = router;