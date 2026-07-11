process.env.NODE_ENV = 'test';
process.env.PORT = '5000';
process.env.MONGO_URI = 'mongodb://localhost:27017/bloomherbs-test';
process.env.JWT_SECRET = 'test-jwt-secret-key-1234567890';
process.env.JWT_COOKIE_EXPIRE = '7';
process.env.CLIENT_URL = 'http://localhost:5173';

const { connectDB, closeDB, clearDB } = require('./setup');
const app = require('../app');

const request = require('supertest');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

beforeEach(async () => {
  await clearDB();
});

describe('Health API', () => {
  test('GET /api/v1/health returns 200 with health status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.services.mongodb).toBeDefined();
  });
});

describe('Auth API', () => {
  test('POST /api/v1/auth/register creates a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.token).toBeDefined();
  });

  test('POST /api/v1/auth/login returns token for valid credentials', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Login User',
        email: 'login@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test('POST /api/v1/auth/login returns 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrongpass',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

describe('Products API', () => {
  beforeEach(async () => {
    const Category = require('../models/Category');
    const Product = require('../models/Product');

    const cat = await Category.create({
      name: 'Test Category',
      description: 'A test category',
      isActive: true,
      sortOrder: 1,
    });

    await Product.create({
      name: 'Test Product',
      description: 'A test product',
      shortDescription: 'Short desc',
      category: cat._id,
      price: 100,
      comparePrice: 150,
      stock: 50,
      images: [{ public_id: 'test', url: 'https://example.com/img.jpg' }],
      isActive: true,
      slug: 'test-product',
    });
  });

  test('GET /api/v1/products returns product list', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.products.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/v1/products/:id returns single product', async () => {
    const Product = require('../models/Product');
    const product = await Product.findOne();
    const res = await request(app).get(`/api/v1/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.product.name).toBe('Test Product');
  });
});
