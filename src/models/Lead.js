import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
  },
  email: {
    type: String,
    default: '',
  },
  whatsapp: String,
  company: String,
  address: String,
  source: {
    type: String,
    default: 'manual',
  },
  agreementId: String,
  projectTitle: String,
  services: {
    type: [String],
    default: [],
  },
  timeline: String,
  budget: String,
  details: String,
  visitorId: String,
  ipAddress: String,
  userAgent: String,
  sourcePage: String,
  referrer: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'customer', 'resolved', 'ignored'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
