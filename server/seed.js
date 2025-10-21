const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const items = [
  {
    title: 'Vintage Lamp',
    description: 'Warm glow lamp',
    price: 45.0,
    imageUrl: '',
  },
  {
    title: 'Wooden Chair',
    description: 'Comfortable and sturdy',
    price: 85.5,
    imageUrl: '',
  },
  { title: 'Ceramic Vase', description: 'Handmade', price: 30.0, imageUrl: '' },
  {
    title: 'Canvas Art',
    description: 'Abstract art',
    price: 120.0,
    imageUrl: '',
  },
  {
    title: 'Coffee Table',
    description: 'Solid oak',
    price: 250.0,
    imageUrl: '',
  },
  { title: 'Desk Plant', description: 'Succulent', price: 12.0, imageUrl: '' },
  { title: 'Throw Pillow', description: 'Soft', price: 20.0, imageUrl: '' },
  { title: 'Wall Clock', description: 'Minimal', price: 40.0, imageUrl: '' },
];

const seed = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rn_web_app';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to Mongo for seeding');
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log('Seeded items');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
