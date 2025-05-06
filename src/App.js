import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    distance_km: '',
    elevation_gain_m: '',
    vehicle_weight_kg: '',
    extra_load_kg: '',
    consumption_rate_wh_per_km: '',
    battery_capacity_kwh: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="App">
      <h2>EVRoute Hesaplama</h2>
      <form onSubmit={handleSubmit}>
        <input name="distance_km" placeholder="Mesafe (km)" onChange={handleChange} required />
        <input name="elevation_gain_m" placeholder="Yükseklik Kazancı (m)" onChange={handleChange} required />
        <input name="vehicle_weight_kg" placeholder="Araç Ağırlığı (kg)" onChange={handleChange} required />
        <input name="extra_load_kg" placeholder="Ek Yük (kg)" onChange={handleChange} required />
        <input name="consumption_rate_wh_per_km" placeholder="Tüketim (Wh/km)" onChange={handleChange} required />
        <input name="battery_capacity_kwh" placeholder="Batarya Kapasitesi (kWh)" onChange={handleChange} required />
        <button type="submit">Hesapla</button>
      </form>

      {result && (
        <div className="result">
          <h3>Sonuçlar</h3>
          <p>🔋 Gerekli Enerji: <strong>{result.energy_needed_wh} Wh</strong></p>
          <p>✅ Batarya Yeterli mi: <strong>{result.battery_ok ? 'Evet' : 'Hayır'}</strong></p>
          <p>📉 Kalan Batarya: <strong>{result.battery_remaining_percent} %</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
