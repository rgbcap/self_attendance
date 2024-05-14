const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost/locationTimeDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// 위치 정보를 저장할 모델 정의
const locationTimeSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  time: Date
});
const LocationTime = mongoose.model('LocationTime', locationTimeSchema);

// POST 요청을 처리하여 위치 정보 저장
app.post('/appendData', async (req, res) => {
  const data = req.body;

  const locationTime = new LocationTime({
    latitude: data.latitude,
    longitude: data.longitude,
    time: new Date(data.time)
  });

  try {
    await locationTime.save();
    console.log('Data saved successfully');
    res.sendStatus(200);
  } catch (err) {
    console.error('Error saving data:', err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});