import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCategories = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/categories');
    return data.categories;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const createCategory = createAsyncThunk('categories/create', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/categories', formData);
    return data.category;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/categories/${id}`, formData);
    return data.category;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/categories/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { categories: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createCategory.fulfilled, (state, action) => { state.categories.push(action.payload); })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.categories[idx] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
