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
    const voitures = await Voiture.find().populate('marque_id');
    res.json(voitures);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.get('/Recuperation/:marque_id', async (req, res) => {
    try {
    const voitures = await Voiture.find({marque_id : req.params.marque_id});
    console.log(voitures);
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