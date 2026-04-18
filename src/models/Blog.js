import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  tag: {
    type: String,
    required: [true, 'Please provide a tag'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Please provide a thumbnail URL'],
  },
  author: {
    type: String,
    default: 'Easin Arafat',
  },
  readTime: {
    type: String,
    required: [true, 'Please provide read time'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  accentColor: {
    type: String,
    default: '#3b82f6',
  },
  content: {
    type: String,
    required: [true, 'Please provide content in Markdown'],
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
  },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
