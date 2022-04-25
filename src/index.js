const express = require('express');
const app = express();

const productRoutes = require('./routes/product');

require('./database.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //AccessControlAllowHeaders : 'auth-token',
    //AccessControlAllowOrigin: '*',
    //AccessControlExposeHeaders: 'auth-token'

   

}
app.use(cors(corsOptions));


//static files
app.use(express.static('./uploads'));


app.use('/api/products', productRoutes);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);
