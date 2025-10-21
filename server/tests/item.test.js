const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  // require app after setting env
  app = require('../server');
  // connect mongoose (server.js will also connect but ensure connected for tests)
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Items API', () => {
  test('should create, read, update, and delete an item', async () => {
    // Create
    const createRes = await request(app)
      .post('/api/items')
      .send({
        title: 'Test Item',
        description: 'desc',
        price: 9.99,
        imageUrl: '',
      })
      .expect(201);

    expect(createRes.body._id).toBeDefined();
    const id = createRes.body._id;

    // Read list
    const listRes = await request(app).get('/api/items').expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBe(1);

    // Read single
    const single = await request(app).get(`/api/items/${id}`).expect(200);
    expect(single.body.title).toBe('Test Item');

    // Update
    const update = await request(app)
      .put(`/api/items/${id}`)
      .send({ price: 19.99 })
      .expect(200);
    expect(update.body.price).toBe(19.99);

    // Delete
    await request(app).delete(`/api/items/${id}`).expect(200);
    await request(app).get(`/api/items/${id}`).expect(404);
  });
});
