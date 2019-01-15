const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append file');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello, express!</h1>');
  // res.send({
  //   name: 'Olha',
  //   likes: [
  //     'Skiing',
  //     'Home'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

 app.get('/about', (req, res) => {
   res.render('about.hbs',{
     pageTitle: 'About Page'
   });
 });

 app.get('/bad', (req, res) => {
   res.send({
     errorMessage: 'Bad Request'
   });
 })

 app.get('/projects', (req, res) => {
   res.render('projects.hbs',{
     pageTitle: 'Projects Page'
   });
 });

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
