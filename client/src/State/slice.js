import { createSlice } from "@reduxjs/toolkit";

const sliceCart = createSlice({
    name: "cart",
    initialState: {
        cart:[],
        buy:[]
    },

    reducers: {
        // ! All actions should be defined here
        addToCart:(state,action) =>{
            state.cart.push(action.payload);
        }
        ,
        removeFromCart: (state,action) =>{
            state.cart = state.cart.filter(x => x.id !== action.payload.id);
        },

        changeQty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
              item.qty = action.payload.qty;
            }
         },

         increaseQty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
              item.qty += 1;
            }
          },
          decreaseQty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item && item.qty > 1) {
              item.qty -= 1;
            }
          },

          buyNow: (state,action) =>{
              state.buy.push(action.payload);
          },

          removeFromBuy: (state,action) =>{
            state.buy = state.buy.filter(x => x.id !== action.payload.id);
          },
    },
})

export default sliceCart.reducer;
export const {addToCart,removeFromCart,changeQty,increaseQty,decreaseQty,buyNow,removeFromBuy} = sliceCart.actions

export const buy = (state) => state.cart.buy