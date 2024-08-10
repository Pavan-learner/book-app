import { configureStore } from '@reduxjs/toolkit'
import sliceCart from './slice'

export default  configureStore({
  reducer: {
        cart : sliceCart,
  },
})