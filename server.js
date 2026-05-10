const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ DATABASE CONNECTED!'))
    .catch(err => console.log('❌ CONNECTION ERROR:', err.message));

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

const Calculation = mongoose.model('calculations', new mongoose.Schema(
    {
        fuelType: String,
        distance: Number,
        consumption: Number,
        pricePerLiter: Number,
        totalCost: Number,
    }
));

app.get('/api/history', async (req, res) => {
  const history = await Calculation.find().sort({ _id: -1 });
  res.send(history);
  console.log("Fetched All History!");
});

app.post('/api/history', async (req, res) => {
  const record = new Calculation(req.body);
  await record.save();
  res.send(record);
  console.log("Added record:", record._id);
});

app.delete('/api/history/:id', async (req, res) => {
  await Calculation.findByIdAndDelete(req.params.id);
  res.status(204).send();
  console.log("Deleted record:", req.params.id);
});

app.put('/api/history/:id', async (req, res) => {
  const updated = await Calculation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
  console.log("Updated record:", req.params.id);
});