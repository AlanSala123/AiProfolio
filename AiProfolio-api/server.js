const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const app = express();
const authRouter = require('./routes/auth.js');
const productRouter = require('./routes/product.js')
const { NotFoundError } = require("./utilities/error.js");
const port = process.env.PORT || 3001

app.use(morgan("tiny"))
app.use(cors());
app.use(express.json());
app.use('/product', productRouter)
app.use('/auth', authRouter)
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
})



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError)
  })
  
  /** Generic error handler; anything unhandled goes here. */


module.exports = app