const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


// handle all unknown routes
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

//global error handler 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  if (err.type === 'redirect') {
    res.redirect(err.url)
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})