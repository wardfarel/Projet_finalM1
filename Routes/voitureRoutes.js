const express = require('express');
const router = express.Router();
const Voiture = require('../models/Voiture');


router.post('/Creation', async (req, res) => {
    try {
    const voiture = new Voiture(req.body);
    await voiture.save();
    res.status(201).json(voiture);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.get('/Recuperation', async (req, res) => {
    try {
    const voitures = await Voiture.find();
    res.json(voitures);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const voiture = await Voiture.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(voiture);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Voiture.findByIdAndDelete(req.params.id);
    res.json({ message: "Voiture supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
module.exports =router;