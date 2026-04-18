import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: '#',
  },
  description: {
    type: String,
    default: 'A premium digital solution developed with cutting-edge technology and creative design.',
  },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
