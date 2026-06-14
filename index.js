require('dotenv').config()
const express = require('express');
const Database = require('./configs/mongodb')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const authRoute = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const app = express()

app.use(express.json())
Database()

// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Swagger Demo API Docs'
}))

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerSpec)
})

app.use('/auth', authRoute)
app.use('/product', productRouter)


PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running port: http://localhost:${PORT}`)
    console.log(`API Docs at http://localhost:${PORT}/api-docs`)
})