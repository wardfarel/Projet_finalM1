const express = require('express');
const router = express.Router();
const Piece = require('../models/Piece');

router.post('/Creation', async (req, res) => {
    try {
    const piece = new Piece(req.body);
    await piece.save();
    res.status(201).json(Piece);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.get('/Recuperation', async (req, res) => {
    try {
    const pieces = await Piece.find();
    res.json(pieces);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
    const piece = await Piece.findByIdAndUpdate(req.params.id,
    req.body, { new: true });
    res.json(piece);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    await Piece.findByIdAndDelete(req.params.id);
    res.json({ message: "Piece supprimé" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});
module.exports = router;