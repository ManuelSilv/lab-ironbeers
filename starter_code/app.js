const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// view engine setup
app.set('view engine', 'hbs');// telling express were using hbs
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));



// app.set(PunkAPIWrapper);
// app.set(punkAPI);

// app.set('view engine', 'hbs'); 
// app.set('views', './views');
// app.engine( 'hbs', hbs( {
//   extname: 'hbs',
//   defaultView: 'default',
//   layoutsDir: __dirname + '/views/layouts/',
//   partialsDir: __dirname + '/views/partials/'
// }));

//routing pages
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get ('/beers', (req, res) => {
  punkAPI.getBeers()
   .then(beers => {
     console.log('beers', beers)
     res.render('beers', {beers});
   })
   .catch(error => {
     console.log(error)
   })
 })

app.get ('/randombeer', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeers => {
     console.log('randomBeers', randomBeers) 
     res.render('randombeer', {randomBeers});
  })
  .catch(error => {
    console.log(error)
  })
});

// //punkAPI.getRandom()
// .then(beers => {

// })
// .catch(error => {
//   console.log(error)
// })

app.listen(3000, () =>{
console.log("It's 3000 bay!")
});
