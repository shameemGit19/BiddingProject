const express = require('express')
const app= express()
require('dotenv').config()
require('./config/config')()
const cors = require('cors')
const port = 4000
const mainrouter = require('./routes/mainrouter')
const bodyParser = require('body-parser')
console.log('dotenv',process.env.MONGO_URL)


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/user',mainrouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  