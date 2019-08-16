// https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216

class AppError extends Error {
  constructor(message, status) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status || 500;
  }
}

class GenericError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class TokenExpired extends AppError {
  constructor(message) {
    super(message || 'Sessão inválida', 401);
  }
}

class ForbiddenAccess extends AppError {
  constructor(message) {
    super(message || 'Não autorizado.', 401);
  }
}

class LoginFailed extends AppError {
  constructor(message) {
    super(message || 'Usuário e/ou senha inválidos.', 401);
  }
}

class NotFound extends AppError {
  constructor(message) {
    super(message || 'Método não encontrado.', 404);
  }
}

class UsuarioAlreadyExists extends AppError {
  constructor(message) {
    super(message || 'E-mail já existente.', 409);
  }
}

class DefaultError extends AppError {
  constructor(message) {
    super(message || 'Algo deu errado.', 500);
  }
}

module.exports = {
  AppError,
  NotFound,
  LoginFailed,
  DefaultError,
  GenericError,
  TokenExpired,
  ForbiddenAccess,
  UsuarioAlreadyExists,
};
