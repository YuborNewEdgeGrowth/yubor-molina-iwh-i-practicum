const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.HUBSPOT_PRIVATE_APP;


const headers = {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${PRIVATE_APP_ACCESS}`
}

app.get("/", async(req, res) =>{
    try{
        let games = await axios.get("https://api.hubapi.com/crm/v3/objects/games?properties=name,notes,value", {headers});
        let data = games.data.results;
        res.render("homepage", {data})
    }catch(error){
        console.log(error)
    }
})

app.get("/update-cobj", async(req, res) =>{
    res.render('updates')
})

app.post("/update-cobj", async(req, res) =>{
    try{
        const {name, notes, value} = req.body;

        const body = {
            properties:{
                name: name,
                notes: notes,
                value: value
            }
        }
        const endpoint = "https://api.hubapi.com/crm/v3/objects/transactions"
        const response = await axios.post(endpoint, body, {headers});
        res.redirect("/");
    }catch(error){
        console.log(error)
    }
})




app.listen(3000, () => console.log('Listening on http://localhost:3000'));