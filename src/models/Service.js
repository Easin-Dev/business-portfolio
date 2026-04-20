import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
  bullets: [String],
});

const BenefitSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const ProcessSchema = new mongoose.Schema({
  step: String,
  title: String,
  description: String,
});

const ServiceNoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const ServiceTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
}, { _id: true });

const ServiceResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'application/octet-stream',
  },
  size: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    enum: ['image', 'file'],
    default: 'file',
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const ServiceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  shortDescription: String,
  description: String,
  image: String,
  features: [FeatureSchema],
  benefits: [BenefitSchema],
  process: [ProcessSchema],
  status: {
    type: String,
    enum: ['draft', 'active', 'paused'],
    default: 'active',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  priceFrom: {
    type: String,
    default: '',
  },
  timeline: {
    type: String,
    default: '',
  },
  targetAudience: {
    type: String,
    default: '',
  },
  internalNotes: {
    type: [ServiceNoteSchema],
    default: [],
  },
  checklist: {
    type: [ServiceTaskSchema],
    default: [],
  },
  resources: {
    type: [ServiceResourceSchema],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
