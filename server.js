const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));
 // Routes pppppp
app.use('/client', require('./routes/clientRoutes'));
app.use('/manager', require('./routes/managerRoutes'));
app.use('/marque', require('./routes/marqueRoutes'));
app.use('/mecanicien', require('./routes/mecanicienRoutes'));
app.use('/piece', require('./routes/pieceRoutes'));
app.use('/voiture', require('./routes/voitureRoutes'));
app.use('/reservation', require('./routes/reservationRoutes'));
app.listen(PORT, () => console.log(`Serveur démarré sur le port
${PORT}`));
