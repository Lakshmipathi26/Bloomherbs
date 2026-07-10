import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isMobileMenuOpen: false, isCartOpen: false, isSearchOpen: false },
  reducers: {
    toggleMobileMenu: (state) => { state.isMobileMenuOpen = !state.isMobileMenuOpen; },
    closeMobileMenu: (state) => { state.isMobileMenuOpen = false; },
    toggleCart: (state) => { state.isCartOpen = !state.isCartOpen; },
    closeCart: (state) => { state.isCartOpen = false; },
    toggleSearch: (state) => { state.isSearchOpen = !state.isSearchOpen; },
    closeSearch: (state) => { state.isSearchOpen = false; },
  },
});

export const { toggleMobileMenu, closeMobileMenu, toggleCart, closeCart, toggleSearch, closeSearch } = uiSlice.actions;
export default uiSlice.reducer;
