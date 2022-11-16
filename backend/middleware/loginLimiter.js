const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP address to 5 login requests per window per minute
  message: { message: 'Too many login attempts from this IP address, please try again in 60 seconds'},
  handler: (req, res, next, options) => {
    logEvents(`Too Many Requests: ${options.message.message}\t${req.mthod}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    res.status(options.statusCode).send(options.message)
  },
  standardHeaders: true, // return rate limit info in `RateLimit` headers
  legacyHeaders: false, // disable the `X-RateLimit` headers
})

module.exports = loginLimiter