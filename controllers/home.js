exports.home = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Home",
  });
};

exports.health = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Healthy",
  });
};
