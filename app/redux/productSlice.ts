import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
  productList: [],
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, data) => {
      state.productList = data.payload
    },
  },
})

export const { setProductList } = productSlice.actions
export default productSlice.reducer
