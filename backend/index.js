const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const routerPlaces = require('./routes/placesRoute');
const routerUsers = require('./routes/usersRoute');
const pageNotFound = require('./routes/pageNotFound');
const errorHandler = require('./util/errorHandler');

mongoose.set('strictQuery', 'true');
mongoose.connect(process.env.DB_URL).then(()=>{
    app.listen(5000, ()=> {console.log("Server is running")})
}).catch(error => {
    console.log({message: error })
})


const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PATCH, DELETE',
    credentials: true
}))

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use('/api/places', routerPlaces);

app.use('/api/users', routerUsers);

app.use(pageNotFound);

app.use(errorHandler);


