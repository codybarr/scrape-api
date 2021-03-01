const Ajv = require('ajv').default
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const schema = require('./schema.json')

const validate = ajv.compile(schema)

module.exports = (req, res) => {
  const { body } = req

  const valid = validate(body)
  if (!valid) {
    return res
      .status(400)
      .json({ message: `Request validation failed.`, errors: validate.errors })
  }

  return res.status(200).json({ message: 'Validation success!' })

  // if (status === 'random') {
  //   const codes = [200, 400, 404, 500]
  //   const randomNum = Math.floor(Math.random() * Math.floor(codes.length))

  //   const code = codes[randomNum]

  //   return res
  //     .status(code)
  //     .json({ message: `Random status code retrieved was: ${code}` })
  // }

  // const statusCode = parseInt(status, 10)

  // if (isNaN(statusCode)) {
  //   return res.status(500).json({ message: `Invalid status code received` })
  // }

  // res.status(statusCode).json({
  //   message: `Retrieved the following status code: ${statusCode}`,
  // })
}
