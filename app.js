const express = require('express')
const ExpressError = require('./expressError')
const app = express();
const itemsRoutes = require("./routes/items")
app.use(express.json());
app.use("/items", itemsRoutes);

// remove this
app.get('/', (req, res) => {
      res.status(200).send('<h1>Home Page!</h1>')
  })

  
// From Colt's video lecture
// If no other route matches, respond with a 404
app.use((req, res, next) => {
    return new ExpressError("Page Not Found", 404);    
  });
  
  // Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

module.exports = app;