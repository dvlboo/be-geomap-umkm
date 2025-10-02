const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const routes = require('./src/routes');

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
