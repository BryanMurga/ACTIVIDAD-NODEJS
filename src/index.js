const { json } = require('express');
const express = require('express');
const morgan = require('morgan');

//inicializamos
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index.js'));
app.use('/candies', require('./routes/candies.js'));

//starting ejecutar servidor
app.listen(app.get('port'), () =>{
    console.log("Server on port", app.get('port'));
});