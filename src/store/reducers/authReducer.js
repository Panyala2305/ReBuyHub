import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/api';


// Async thunk for customer login
export const customer_login = createAsyncThunk(
  'auth/customer_login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', userData); 
      localStorage.setItem('userToken',response.data.token)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for customer registration
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/register', userData); // Adjust endpoint if needed
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
      }
    }
  );
  

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loader: false,
    errorMessage: '',
    successMessage: '',
    userInfo: null
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_login.pending, (state) => {
        state.loader = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(customer_login.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload;
        state.successMessage = 'Login successful';
      })
      .addCase(customer_login.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload || 'Something went wrong';
      })
      .addCase(customer_register.pending, (state) => {
        state.loader = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(customer_register.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = 'Registration successful';
        state.userInfo = action.payload; // Save registered user data if needed
      })
      .addCase(customer_register.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload || 'Something went wrong during registration';
      });
  }
});

export const { messageClear } = authSlice.actions;
export default authSlice.reducer;
