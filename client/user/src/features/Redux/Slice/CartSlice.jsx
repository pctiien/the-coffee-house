import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items : [],
  total : 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item=>item.product._id === action.payload.product._id)
      if(existingItem)
      {
        existingItem.quantity += action.payload.quantity 
        existingItem.total += action.payload.total
      }else{
        state.items.push(action.payload); 
      }
      state.total += action.payload.total 
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item=>item.product._id === action.payload._id);
      state.items = state.items.filter(p => p.product._id !== action.payload._id); 
      state.total -= existingItem.total
    },
    removeAllFromCart:(state)=>{
      state.items = [],
      state.total = 0
    }
  },
});

export const { addToCart, removeFromCart,cartSize,removeAllFromCart } = cartSlice.actions;

export default cartSlice.reducer;
