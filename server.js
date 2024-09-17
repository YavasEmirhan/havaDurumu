const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = 5002;
const apiKey = '50b0a40773890aed1802ad617939c7ac';

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hava Durumu API Sunucusu Çalışıyor!');
});


app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'Lütfen bir şehir adı girin.' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Hava durumu verisi alınamadı.' });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
