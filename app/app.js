const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/route');

app.use((req, res, next) => { 
	if(req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    	res.redirect('https://'+req.hostname+req.url)
	} else {
		next()
	}
})

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cookieParser());

app.use('/api', routes);


if(true || process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')))

  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}

module.exports = app;