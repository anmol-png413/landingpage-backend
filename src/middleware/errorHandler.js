function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ success: false, error: 'Something went wrong' })
}

module.exports = errorHandler
