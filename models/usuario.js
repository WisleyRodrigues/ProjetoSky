const mongoose = require('../services/mongoose');

const usuarioSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefones: [
    {
      numero: {
        type: Number,
        required: true,
      },
      ddd: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
  lastLogin: { type: Date, required: true, default: new Date() },
});

let Usuario;

try {
  Usuario = mongoose.model('Usuario');
} catch (e) {
  Usuario = mongoose.model('Usuario', usuarioSchema);
}

module.exports = Usuario;
