const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { generateToken, getToken } = require('../services/jwt');
const { UsuarioAlreadyExists, LoginFailed } = require('../classes/Errors');

/**
 * Função que chega a existencia de um email,
 * caso o parametro register seja true, retorna um erro caso o usuario ja exista.
 * @param {string} email
 * @param {boolean} register
 */
async function checkUserEmailExists(email, register = false) {
  const usuarioFinded = await Usuario.findOne({ email: { $regex: new RegExp(email, 'ig') } });

  if (usuarioFinded && register) {
    throw new UsuarioAlreadyExists();
  }

  return usuarioFinded;
}

/**
 * Função que gera encripta a senha do usuario.
 * @param {string} senha
 */
async function encryptPassword(senha) {
  const hashPassword = await bcrypt.hash(senha, 10);

  return hashPassword;
}

exports.signUp = async (req) => {
  const {
    nome,
    email,
    senha,
    telefones,
  } = req.body;

  const objUsuario = {
    uuid: uuid(),
    nome,
    email,
    telefones,
  };

  await checkUserEmailExists(email, true);

  const novoUsuario = new Usuario(objUsuario);

  novoUsuario.senha = await encryptPassword(senha);

  novoUsuario.save();

  const token = await generateToken(novoUsuario);

  return { novoUsuario, token };
};

exports.signIn = async (req) => {
  const { email, senha } = req.body;

  const user = await checkUserEmailExists(email);

  // Caso não exista esse usuario retorna o erro previsto.
  if (!user) {
    throw new LoginFailed();
  }

  // Faz a comparação da senha passada e a salva no usuario.
  if (!await bcrypt.compare(senha, user.senha)) {
    throw new LoginFailed();
  }

  user.lastLogin = new Date();
  user.save();

  const token = await getToken(user);

  return { user, token };
};
