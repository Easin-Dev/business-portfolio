const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define minimal schemas for seeding to avoid importing Mongoose models which might use ES modules
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

const BlogSchema = new mongoose.Schema({
  slug: String,
  title: String,
  category: String,
  tag: String,
  excerpt: String,
  thumbnail: String,
  author: String,
  readTime: String,
  date: String,
  featured: Boolean,
  accentColor: String,
  content: String,
  status: { type: String, default: 'published' }
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  featured: Boolean,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const blogsData = [
  {
    slug: "how-to-rank-on-google-first-page",
    category: "SEO",
    tag: "seo",
    title: "How to Rank on Google's First Page in 2025 — Complete Roadmap",
    excerpt: "Google-এর 1st page-এ rank করতে হলে শুধু keyword দিলেই হয় না। Technical SEO, content authority, এবং backlink strategy সব মিলিয়ে একটা complete roadmap দরকার।",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "8 min read",
    date: "Apr 10, 2025",
    featured: true,
    accentColor: "#3b82f6",
    content: "## Google 1st Page Rank করার সম্পূর্ণ গাইড...", // Truncated for script
  },
  // Add other blogs here or import them if environment allows
];

const projectsData = [
  { title: "Plenty Pay: Redefining Smart Personal Finance", category: "Landing-Page", image: "https://i.postimg.cc/K8pZMYgn/Chat-GPT-Image-Jan-16-2026-07-25-20-PM.png" },
  { title: "Skillophy: Smarter Learning Experience", category: "Portfolio", image: "https://i.postimg.cc/85FHBrvT/Chat-GPT-Image-Jan-16-2026-03-31-49-PM.png" },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // 1. Seed Admin User
    const adminEmail = 'admin@scaleupweb.xyz';
    const existingUser = await User.findOne({ email: adminEmail });

    if (!existingUser) {
      console.log('Creating admin user...');
      const hashedPassword = await bcrypt.hash('rCjOPolmO68T4N40', 10); // Using the DB password as initial admin password for simplicity
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'ScaleUp Admin',
        role: 'admin'
      });
      console.log('Admin user created: ', adminEmail);
    } else {
      console.log('Admin user already exists.');
    }

    // 2. Seed Blogs (Simple check to avoid duplicates)
    console.log('Seeding blogs...');
    for (const blog of blogsData) {
      await Blog.findOneAndUpdate({ slug: blog.slug }, blog, { upsert: true });
    }
    console.log('Blogs seeded.');

    // 3. Seed Projects
    console.log('Seeding projects...');
    for (const project of projectsData) {
      await Project.findOneAndUpdate({ title: project.title }, project, { upsert: true });
    }
    console.log('Projects seeded.');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
