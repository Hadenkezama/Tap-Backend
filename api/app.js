const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const beers = require('./DrinkRoutes/beerRoutes')
const coolers_ciders = require('./DrinkRoutes/cider-coolerRoutes')
const liqueurs = require('./DrinkRoutes/liqueursRoutes')
const spirits = require('./DrinkRoutes/spiritsRoutes')
const wines = require('./DrinkRoutes/wineRoutes')
const other = require('./DrinkRoutes/otherRoutes')
const beerCatagories = require('./CatagorieRoutes/beerCatagoriesRoute')
const spiritCatagories = require('./CatagorieRoutes/spiritCatagoriesRoute')
const coolers_cidersCatagories = require('./CatagorieRoutes/cooler_ciderCatagoriesRoute')
const liqueurCatagories = require('./CatagorieRoutes/liqueurCatagoriesRoute')
const wineColourRoute = require('./CatagorieRoutes/wineColourRoute')
const wineRegionRoute = require('./CatagorieRoutes/wineRegionRoute')
const User = require('./Users/UserRoutes/UserRoutes');




const app = express();
const port = 9000



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))


app.use(expressSession({key: 'userID' , 
secret: process.env.TOKEN_SECRET, 
resave: false,
saveUninitialized: false,
cookie:{
  expires: 60 * 60 * 24,
}}))



app.use('/drinks/beers', beers)
app.use('/drinks/coolers_ciders', coolers_ciders)
app.use('/drinks/liqueurs', liqueurs)
app.use('/drinks/spirits', spirits)
app.use('/drinks/wines', wines)
app.use('/drinks/other', other)


app.use('/catagories/wine_colour', wineColourRoute)
app.use('/catagories/wine_region', wineRegionRoute)
app.use('/catagories/spirits', spiritCatagories)
app.use('/catagories/coolers_ciders', coolers_cidersCatagories)
app.use('/catagories/beers', beerCatagories)
app.use('/catagories/liqueurs', liqueurCatagories)

app.use('/admin', User)


// catch 404 and forward to error handler

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app;
