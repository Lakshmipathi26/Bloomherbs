import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProductReviews = createAsyncThunk('reviews/product', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/reviews/product/${productId}`);
    return data.reviews;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchAllReviews = createAsyncThunk('reviews/all', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reviews');
    return data.reviews;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const createReview = createAsyncThunk('reviews/create', async ({ productId, ...reviewData }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/reviews/product/${productId}`, reviewData);
    return data.review;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateReview = createAsyncThunk('reviews/update', async ({ id, ...reviewData }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/reviews/${id}`, reviewData);
    return data.review;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const deleteReview = createAsyncThunk('reviews/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/reviews/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: { productReviews: [], allReviews: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProductReviews.fulfilled, (state, action) => { state.loading = false; state.productReviews = action.payload; })
      .addCase(fetchProductReviews.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllReviews.fulfilled, (state, action) => { state.allReviews = action.payload; })
      .addCase(createReview.fulfilled, (state, action) => { state.productReviews.push(action.payload); })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.productReviews = state.productReviews.filter((r) => r._id !== action.payload);
        state.allReviews = state.allReviews.filter((r) => r._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
