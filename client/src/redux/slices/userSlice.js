import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProfile = createAsyncThunk('user/profile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users/profile');
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.put('/users/profile', userData);
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchAddresses = createAsyncThunk('user/addresses', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users/addresses');
    return data.addresses;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const addAddress = createAsyncThunk('user/addAddress', async (addressData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/users/addresses', addressData);
    return data.address;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateAddress = createAsyncThunk('user/updateAddress', async ({ id, ...addressData }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/users/addresses/${id}`, addressData);
    return data.address;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const deleteAddress = createAsyncThunk('user/deleteAddress', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/users/addresses/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchAllUsers = createAsyncThunk('user/all', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateUserStatus = createAsyncThunk('user/updateStatus', async ({ id, isActive }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/users/${id}/status`, { isActive });
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, addresses: [], users: [], usersTotal: 0, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.profile = action.payload; })
      .addCase(fetchAddresses.fulfilled, (state, action) => { state.addresses = action.payload; })
      .addCase(addAddress.fulfilled, (state, action) => { state.addresses.push(action.payload); })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const idx = state.addresses.findIndex((a) => a._id === action.payload._id);
        if (idx !== -1) state.addresses[idx] = action.payload;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => { state.addresses = state.addresses.filter((a) => a._id !== action.payload); })
      .addCase(fetchAllUsers.fulfilled, (state, action) => { state.users = action.payload.users; state.usersTotal = action.payload.total || 0; })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      });
  },
});

export default userSlice.reducer;
