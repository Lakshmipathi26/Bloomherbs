import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMyOrders = createAsyncThunk('orders/myOrders', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/orders/my-orders', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchOrderById = createAsyncThunk('orders/detail', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/orders/${id}`);
    return data.order;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const createOrder = createAsyncThunk('orders/create', async (orderData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/orders', orderData);
    return data.order;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const cancelOrder = createAsyncThunk('orders/cancel', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/orders/${id}/cancel`);
    return data.order;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchAllOrders = createAsyncThunk('orders/all', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/orders', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status, note, trackingNumber }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/orders/${id}/status`, { status, note, trackingNumber });
    return data.order;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchOrderStats = createAsyncThunk('orders/stats', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/orders/admin/stats');
    return data.stats;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { myOrders: [], allOrders: [], currentOrder: null, stats: null, loading: false, error: null },
  reducers: {
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.loading = false; state.myOrders = action.payload.orders; })
      .addCase(fetchMyOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.currentOrder = action.payload; })
      .addCase(createOrder.fulfilled, (state, action) => { state.currentOrder = action.payload; })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const idx = state.myOrders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.myOrders[idx] = action.payload;
        if (state.currentOrder?._id === action.payload._id) state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.allOrders = action.payload.orders; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const idx = state.allOrders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.allOrders[idx] = action.payload;
      })
      .addCase(fetchOrderStats.fulfilled, (state, action) => { state.stats = action.payload; });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
