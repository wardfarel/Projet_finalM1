const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    nom: user.username,
    prenom: user.prenom,
    // Ajoutez d'autres informations nécessaires au token
  };

  // Générez le token avec une clé secrète
  const token = jwt.sign(payload, 'tokenManager', { expiresIn: '2h' });

  return token;
};