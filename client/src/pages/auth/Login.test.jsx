import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/slices/authSlice';
import Login from '../Login';

const renderWithProviders = (ui, { preloadedState = {}, store = configureStore({
  reducer: {
    auth: authReducer,
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

describe('Login Page', () => {
  it('renders email and password inputs', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText('you@example.com')).toBeDefined();
    expect(screen.getByPlaceholderText('••••••••')).toBeDefined();
  });

  it('renders submit button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDefined();
  });

  it('renders register and forgot password links', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/create one/i)).toBeDefined();
    expect(screen.getByText(/forgot password/i)).toBeDefined();
  });

  it('shows error when submitting empty form', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeDefined();
    });
  });
});
