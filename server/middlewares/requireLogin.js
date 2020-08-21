module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'Debe estar logeado antes de entrar!' });
  }
  next();
};
