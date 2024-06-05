import { configureStore } from '@reduxjs/toolkit'
import buildingsSlice from "@/lib/slices/buildingsSlice";
import roomsSlice from "@/lib/slices/roomsSlice";
import computersSlice from "@/lib/slices/computersSlice";

export const store = configureStore({
	reducer: {
		buildingsSlice,
		roomsSlice,
		computersSlice
	}
})