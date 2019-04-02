

module.exports = (req, cb) => {
  cb(forbidden())
}

function forbidden () {
  const error = new Error('forbidden')
  error.status = 403
  return error
}
