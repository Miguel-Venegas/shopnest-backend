const rateLimit = require("express-rate-limit");

exports.authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20,                 // 20 attempts
  message: {
    error: "Too many attempts. Please try again later.",
  },
});

exports.generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  message: {
    error: "Too many attempts. Please try again later",
  },
});
