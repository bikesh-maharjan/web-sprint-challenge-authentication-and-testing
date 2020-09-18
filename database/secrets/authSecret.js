module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    "This is the super secret you can ever be secure from",
};
