import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 5001;
const app = express();

app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000'
}
const fetchOptions = {
    method: 'GET'
}

async function getData(url) {
    let jsonResponse;
    try {
        const response = await fetch(url, fetchOptions);
        jsonResponse = await response.json();
    } 
    catch(err) {
        console.error(err);
    }
    return jsonResponse;
}

app.get('/comics', cors(corsOptions), (req, res) => {
    const current = 'https://xkcd.com/info.0.json';
    const jsonResponse = getData(current);
    jsonResponse.then(
        data => res.json(data)
    )
});


app.get('/comics/:id', cors(corsOptions), (req, res) => {
    const id = req.params.id;
    const specific = `https://xkcd.com/${id}/info.0.json`;
    const jsonResponse = getData(specific);
    jsonResponse.then(
        data => res.json(data)
    )});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});