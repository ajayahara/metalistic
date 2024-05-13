const distributeValidation = (req, res, next) => {
  const { toBeDistribute } = req.query;
  if (!toBeDistribute || toBeDistribute < 0) {
    return res.status(400).json({
      error:
        "toBeDistribute are required and toBeDistribute must be a positive number.",
    });
  }

  next();
};

module.exports = {
  distributeValidation,
};
