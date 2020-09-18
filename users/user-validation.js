function validateUser(user) {
  return user.username && user.password ? true : false;
}

function validateCredentials(creds) {
  return creds.username && creds.password ? true : false;
}

module.exports = {
  validateUser,
  validateCredentials,
};
