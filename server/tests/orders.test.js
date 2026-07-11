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

const registerAndLogin = async () => {
  await request(app)
    .post('/api/v1/auth/register')
    .send({ name: 'Order User', email: 'order@example.com', password: 'password123' });

  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'order@example.com', password: 'password123' });

  return res.body.token;
};

const createTestProduct = async () => {
  const Category = require('../models/Category');
  const Product = require('../models/Product');
  const cat = await Category.create({ name: 'Order Cat', description: 'Test', isActive: true, sortOrder: 1 });
  const product = await Product.create({
    name: 'Order Product',
    description: 'A product for order testing',
    shortDescription: 'Short',
    category: cat._id,
    price: 200,
    stock: 10,
    images: [{ public_id: 'test', url: 'https://example.com/img.jpg' }],
    isActive: true,
    slug: 'order-product',
  });
  return product._id;
};

describe('Orders API', () => {
  test('creates an order from cart', async () => {
    const token = await registerAndLogin();
    const productId = await createTestProduct();

    await request(app)
      .post('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });

    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        shippingAddress: {
          fullName: 'Order User',
          phone: '9999999999',
          addressLine1: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456',
        },
        paymentMethod: 'razorpay',
        notes: 'Leave at door',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.order.totalPrice).toBeDefined();
    expect(res.body.order.orderStatus).toBe('pending');
  });

  test('gets my orders', async () => {
    const token = await registerAndLogin();
    const productId = await createTestProduct();

    await request(app)
      .post('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1 });

    await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        shippingAddress: {
          fullName: 'Order User',
          phone: '9999999999',
          addressLine1: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456',
        },
        paymentMethod: 'razorpay',
      });

    const res = await request(app)
      .get('/api/v1/orders/my-orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.orders.length).toBe(1);
  });
});
