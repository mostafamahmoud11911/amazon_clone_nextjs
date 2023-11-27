import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  favoriteData: [],
  allProducts: [],
  userInfo: null ,
};

const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const existProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existProduct) {
        existProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    addTofavorite: (state, action) => {
      const existProduct = state.favoriteData.find(
        (item) => item._id === action.payload._id
      );
      if (existProduct) {
        existProduct.quantity += action.payload.quantity;
      } else {
        state.favoriteData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreamentQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteFavorite: (state, action) => {
      state.favoriteData = state.favoriteData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    resetFavoriteData: (state) => {
      state.favoriteData = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProduct: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {
  addCart,
  addTofavorite,
  increaseQuantity,
  decreamentQuantity,
  deleteProduct,
  deleteFavorite,
  resetCart,
  resetFavoriteData,
  addUser,
  removeUser,
  setAllProduct,
} = nextSlice.actions;
export default nextSlice.reducer;
