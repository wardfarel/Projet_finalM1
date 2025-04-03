const express = require('express');
const router = express.Router();
const Marque = require('../models/Marque');

router.post('/Creation', async (req, res) => {
    try {
    const marque = new Marque(req.body);
    await marque.save();
    res.status(201).json(marque);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.get('/Recuperation', async (req, res) => {
    try {
    const marques = await Marque.find();
    res.json(marques);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const marque = await Marque.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(marque);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Marque.findByIdAndDelete(req.params.id);
    res.json({ message: "Marque supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
module.exports = router;