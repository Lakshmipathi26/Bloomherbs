import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../redux/slices/cartSlice';
import wishlistReducer from '../../redux/slices/wishlistSlice';
import ProductCard from '../ProductCard';

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  slug: 'test-product',
  price: 100,
  comparePrice: 150,
  images: [{ public_id: 'test', url: 'https://example.com/img.jpg' }],
  category: { name: 'Herbal Tea' },
  ratings: 4.5,
  numReviews: 10,
};

const renderWithProviders = (ui, { preloadedState = {}, store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
}) } = {}) => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </Provider>
    ),
    store,
  };
};

describe('ProductCard', () => {
  it('renders product name and price', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeDefined();
    expect(screen.getByText('$100.00')).toBeDefined();
  });

  it('shows discount badge when comparePrice is higher', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('-33%')).toBeDefined();
  });

  it('renders category name', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Herbal Tea')).toBeDefined();
  });

  it('renders rating', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('4.5')).toBeDefined();
  });

  it('links to product detail page', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/product/test-product');
  });
});
