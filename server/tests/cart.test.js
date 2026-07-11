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

const authRequest = request(app);

const registerAndLogin = async () => {
  await authRequest
    .post('/api/v1/auth/register')
    .send({ name: 'Cart User', email: 'cart@example.com', password: 'password123' });

  const res = await authRequest
    .post('/api/v1/auth/login')
    .send({ email: 'cart@example.com', password: 'password123' });

  return res.body.token;
};

const createTestProduct = async () => {
  const Category = require('../models/Category');
  const Product = require('../models/Product');
  const cat = await Category.create({ name: 'Test Cat', description: 'Test', isActive: true, sortOrder: 1 });
  const product = await Product.create({
    name: 'Cart Product',
    description: 'A product for cart testing',
    shortDescription: 'Short',
    category: cat._id,
    price: 100,
    stock: 20,
    images: [{ public_id: 'test', url: 'https://example.com/img.jpg' }],
    isActive: true,
    slug: 'cart-product',
  });
  return product._id;
};

describe('Cart API', () => {
  test('adds item to cart', async () => {
    const token = await registerAndLogin();
    const productId = await createTestProduct();

    const res = await request(app)
      .post('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.cart.items.length).toBe(1);
    expect(res.body.cart.items[0].quantity).toBe(2);
  });

  test('gets cart contents', async () => {
    const token = await registerAndLogin();
    await createTestProduct();

    await request(app)
      .post('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: await createTestProduct(), quantity: 1 });

    const res = await request(app)
      .get('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.cart.items.length).toBeGreaterThan(0);
  });

  test('updates cart item quantity', async () => {
    const token = await registerAndLogin();
    const productId = await createTestProduct();

    const addRes = await request(app)
      .post('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1 });

    const itemId = addRes.body.cart.items[0]._id;

    const res = await request(app)
      .put(`/api/v1/cart/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items[0].quantity).toBe(5);
  });

  test('removes item from cart', async () => {
    const token = await registerAndLogin();
    const productId = await createTestProduct();

    await request(app)
      .post('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1 });

    const res = await request(app)
      .delete(`/api/v1/cart/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items.length).toBe(0);
  });
});
