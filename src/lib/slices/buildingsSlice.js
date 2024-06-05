import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
	loading: true,
	roomOpen: true,
	entities: []
}

export const fetchBuildings = createAsyncThunk(
	'buildings/fetchBuildings',
	async (thunkAPI) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/buildings/`, {next: { revalidate: 60 }, method: 'GET'}).then(
			(data) => data.json()
		)
		return res
	}
)

const buildingsSlice = createSlice({
	name: 'buildings',
	initialState,
	reducers: {
		selectRoom: (state, action) => {
			state.roomOpen = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchBuildings.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchBuildings.fulfilled, (state, {payload}) => {
			state.loading = false
			state.entities = payload
		})
		builder.addCase(fetchBuildings.rejected, (state) => {
			state.loading = false
		})
	}
})

export const {selectRoom} = buildingsSlice.actions
export default buildingsSlice.reducer