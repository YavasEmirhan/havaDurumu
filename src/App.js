import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');


  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.error);
      }
    } catch (error) {
      setWeather(null);
      setError('Veri alınırken bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hava Durumu Uygulaması</h1>
      <input
        type="text"
        placeholder="Şehir girin"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', width: '200px' }}
      />
      <button onClick={fetchWeather} style={{ padding: '10px 20px', marginLeft: '10px' }}>
        Hava Durumunu Getir
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2>
          <p>Sıcaklık: {weather.main.temp} °C</p>
          <p>Durum: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
