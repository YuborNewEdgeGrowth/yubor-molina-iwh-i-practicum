const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.HUBSPOR_PRIVATE_APP;


const header = {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${PRIVATE_APP_ACCESS}`
}




app.listen(3000, () => console.log('Listening on http://localhost:3000'));