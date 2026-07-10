import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/wishlist');
    return data.wishlist;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const toggleWishlist = createAsyncThunk('wishlist/toggle', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/wishlist/${productId}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { wishlist: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => { state.wishlist = action.payload; })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (!state.wishlist) return;
        const { action: act, productId } = action.payload;
        if (act === 'added') {
          state.wishlist.products.push(productId);
        } else {
          state.wishlist.products = state.wishlist.products.filter(
            (p) => (p._id || p) !== productId
          );
        }
      });
  },
});

export default wishlistSlice.reducer;
