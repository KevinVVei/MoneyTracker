// models for spending
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const spendingSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'transport', 'entertainment', 'other'] // Assuming these are the only possible categories
  }
}, {
  timestamps: true // This will automatically add fields for 'createdAt' and 'updatedAt'
});

export default model('spending', spendingSchema);
