const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Voiture = require('../models/Voiture');
const Reservation_Employer = require('../models/Reservation_Employer');
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
  router.put('/ValidationRendezvous/:id',async (req, res) => {
    try {
        const reservation_Employer = await Reservation_Employer.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(reservation_Employer);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
});
  router.post('/DonnezEmployer',async (req, res) => {
    try {
    const reservation_Employer = new Reservation_Employer(req.body);
    await reservation_Employer.save();
    res.status(201).json(reservation_Employer);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});
router.post('/Creation', verifyToken,async (req, res) => {
    try {
    req.body.client_id=req.user._id;
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});
router.get('/RecuperationByid_Client',verifyToken, async (req, res) => {
    try {
        const reservation = await Reservation.find({client_id : req.user._id}).populate(
            {
              path: 'voiture_id',        // Peupler la voiture associée à la carrosserie
              populate: {
                path: 'marque_id',       // Peupler la marque associée à la voiture
                model: 'Marque'          // Définir que la référence de voiture_id est liée à la collection 'Marque'
              }
            });
        res.json(reservation);
    } catch (error) {
        console.log()
    res.status(500).json({ message: error.message });
    }
});
router.get('/Recuperation', async (req, res) => {
    try {
    const reservation = await Reservation.find();
    res.json(reservation);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(reservation);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
module.exports = router;