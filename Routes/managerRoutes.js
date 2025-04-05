const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
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
router.get('/protected', verifyToken, (req, res) => {
  res.json({ isAuthenticated: true, manager: req.user });
});


router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;
  console.log(req.body);
  try {
    const manager = await Manager.findOne({ email, mdp });
    
    if (!manager) {
      return res.status(404).json({ message: 'Manager non trouvé ou mot de passe incorrect' });
    }
    const token = jwt.sign( { _id: manager._id, email: manager.email , nom: manager.nom , prenom: manager.prenom },SECRET_KEY,{ expiresIn: '1h' });
    console.log(token)
    res.json({ success: true, message: 'Bienvenue',token: token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
  });
  router.post('/Creation', async (req, res) => {
    console.log(req.body);
    try {
      if(req.body.mdp==req.body.mdp1){
        const manager = new Manager(req.body)
        await manager.save();
        res.status(201).json(manager);
      }
      else res.json({message: "Verifier votre mot de passe."})
    } catch (error) {
      console.log(error);
    res.status(400).json({ message: error.message });
    }
  });
router.get('/Recuperation', async (req, res) => {
    try {
    const managers = await Manager.find();
    res.json(managers);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const manager = await Manager.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(manager);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Manager.findByIdAndDelete(req.params.id);
    res.json({ message: "Manager supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    
    }
});
module.exports = router;