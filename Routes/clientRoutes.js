const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
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
  res.json({ isAuthenticated: true, client: req.user });
});


router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;

    try {
        const client = await Client.findOne({ email, mdp });
        
        if (!client) {
        return res.status(404).json({ message: 'Client non trouvé ou mot de passe incorrect' });
        }
        const token = jwt.sign( { _id: client._id, email: client.email , nom: client.nom , prenom: client.prenom },SECRET_KEY,{ expiresIn: '1h' });
        res.json({ success: true, message: 'Bienvenue',token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
  });


router.post('/Creation', async (req, res) => {
    try {
        if(req.body.mdp==req.body.mdp1){
            const client = new Client(req.body);
            await client.save();
            res.status(201).json(client);
        }
        else{
            res.json({message: "Verifier votre mot de passe."})
        }
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.get('/Recuperation', async (req, res) => {
    try {
    const clients = await Client.find();
    res.json(clients);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const client = await Client.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(client);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
module.exports = router;