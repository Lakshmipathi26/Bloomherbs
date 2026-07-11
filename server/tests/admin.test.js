process.env.NODE_ENV = 'test';
process.env.PORT = '5000';
process.env.MONGO_URI = 'mongodb://localhost:27017/bloomherbs-test';
process.env.JWT_SECRET = 'test-jwt-secret-key-1234567890';
process.env.JWT_COOKIE_EXPIRE = '7';
process.env.CLIENT_URL = 'http://localhost:5173';
process.env.RAZORPAY_KEY_ID = 'test_key_id';
process.env.RAZORPAY_KEY_SECRET = 'test_key_secret';

const { connectDB, closeDB, clearDB } = require('./setup');
const app = require('../app');
const User = require('../models/User');

const request = require('supertest');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

beforeEach(async () => {
  await clearDB();
});

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@test.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true,
  });
  return admin;
};

const loginAsAdmin = async () => {
  await createAdmin();
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@test.com', password: 'admin123' });
  return res.body.token;
};

describe('Admin API', () => {
  test('admin can view all orders', async () => {
    const token = await loginAsAdmin();

    const res = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.orders).toBeDefined();
  });

  test('admin can view order stats', async () => {
    const token = await loginAsAdmin();

    const res = await request(app)
      .get('/api/v1/orders/admin/stats')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toBeDefined();
  });

  test('admin can create a product', async () => {
    const token = await loginAsAdmin();
    const Category = require('../models/Category');
    await Category.create({ name: 'Admin Cat', description: 'Test', isActive: true, sortOrder: 1 });

    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Admin Product',
        description: 'Created by admin',
        shortDescription: 'Short',
        category: (await Category.findOne())._id,
        price: 100,
        stock: 50,
        images: [{ public_id: 'test', url: 'https://example.com/img.jpg' }],
        isActive: true,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.product.name).toBe('Admin Product');
  });
});

describe('Payments API', () => {
  test('returns Razorpay key', async () => {
    const res = await request(app).get('/api/v1/payments/razorpay-key');
    expect(res.statusCode).toBe(200);
    expect(res.body.key).toBe('test_key_id');
  });
});
