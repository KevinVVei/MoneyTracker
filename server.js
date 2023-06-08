import express, { json } from 'express';
import cors from 'cors';
import Spending from './src/Model/spending.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const { connect, connection } = mongoose;
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());

const uri = process.env.DATABASE_URL;
connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.post('/api/spending', (req, res) => {
  const { date, amount, category } = req.body;

  const newSpending = new Spending({
    date,
    amount,
    category,
  });

  newSpending.save()
  .then(() => res.json('Spending added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/spending', (req, res) => {
  Spending.find()
  .then(spending => res.json(spending))
  .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
