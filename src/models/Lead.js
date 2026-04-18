import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  whatsapp: String,
  budget: String,
  details: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved', 'ignored'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
