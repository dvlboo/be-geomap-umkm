require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./src/routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Geomap UMKM API Documentation"
}));

app.use('/api', routes);

app.use((req, res) => {

  const response = {
    data : null,
    message : "Route Not Found!!!"
  }

  res.status(404).json(response)
})

// Error Middleware
app.use((err, req, res, next) => {
  let statusCode = 500
  let message = "Internal Server Error"

  if (err.statusCode) {
    statusCode = err.statusCode
  }
  if (err.message) {
    message = err.message
  }

  res.status(statusCode).json({
    data : null,
    message
  })
})

app.listen(port, () => {
  console.log(`Listening Server on Port : ${port}`);
});
