import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
  cartList: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartList: (state, data) => {
      state.cartList = data.payload
    },
  },
})

export const { setCartList } = cartSlice.actions
export default cartSlice.reducer
