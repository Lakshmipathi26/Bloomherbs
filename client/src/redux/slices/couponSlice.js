import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCoupons = createAsyncThunk('coupons/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/coupons');
    return data.coupons;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const createCoupon = createAsyncThunk('coupons/create', async (couponData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/coupons', couponData);
    return data.coupon;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateCoupon = createAsyncThunk('coupons/update', async ({ id, ...couponData }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/coupons/${id}`, couponData);
    return data.coupon;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const deleteCoupon = createAsyncThunk('coupons/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/coupons/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const couponSlice = createSlice({
  name: 'coupons',
  initialState: { coupons: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCoupons.fulfilled, (state, action) => { state.loading = false; state.coupons = action.payload; })
      .addCase(fetchCoupons.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createCoupon.fulfilled, (state, action) => { state.coupons.push(action.payload); })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const idx = state.coupons.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.coupons[idx] = action.payload;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((c) => c._id !== action.payload);
      });
  },
});

export default couponSlice.reducer;
