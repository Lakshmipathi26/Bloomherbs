import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getRazorpayKey = createAsyncThunk('payment/key', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/payments/razorpay-key');
    return data.key;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const createRazorpayOrder = createAsyncThunk('payment/createOrder', async (amount, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/payments/create-order', { amount });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const verifyPayment = createAsyncThunk('payment/verify', async (paymentData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/payments/verify', paymentData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState: { key: null, currentOrder: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayKey.fulfilled, (state, action) => { state.key = action.payload; })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => { state.currentOrder = action.payload; })
      .addCase(verifyPayment.fulfilled, (state, action) => { state.currentOrder = action.payload; });
  },
});

export default paymentSlice.reducer;
