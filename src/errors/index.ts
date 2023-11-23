export function conflictError(message: any) {
  return {
    name: "ConflictError",
    message,
  };
}

export function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

export function badRequestError() {
  return {
    name: "BadRequestError",
    message: "Bad Request",
  };
}

export function duplicatedEmailError() {
  return {
    name: "DuplicatedEmailError",
    message: "This email already has an account",
  };
}

export function duplicatedUserNameError() {
  return {
    name: "DuplicatedUserNameError",
    message: "This username already has an account",
  };
}

export function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

export function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}
