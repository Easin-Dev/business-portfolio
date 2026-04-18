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
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
