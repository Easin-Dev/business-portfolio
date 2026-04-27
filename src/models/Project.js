import mongoose from 'mongoose';

const ProjectNoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const ProjectTaskSchema = new mongoose.Schema({
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

const ProjectAttachmentSchema = new mongoose.Schema({
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
    default: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
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
  clientName: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'review', 'completed'],
    default: 'planning',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  deadline: {
    type: Date,
    default: null,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  notes: {
    type: [ProjectNoteSchema],
    default: [],
  },
  tasks: {
    type: [ProjectTaskSchema],
    default: [],
  },
  attachments: {
    type: [ProjectAttachmentSchema],
    default: [],
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
