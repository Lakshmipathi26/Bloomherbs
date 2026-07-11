import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import orderReducer from './slices/orderSlice';
import reviewReducer from './slices/reviewSlice';
import couponReducer from './slices/couponSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    categories: categoryReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    coupons: couponReducer,
    user: userReducer,
    payment: paymentReducer,
    ui: uiReducer,
  },
});
