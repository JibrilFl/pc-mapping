import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
	loading: true,
	currentRoom: null,
	filtered: [],
	entities: []
}

const filterComputers = (entities, room) => {
	return entities.filter(({idRoom}) => idRoom === room);
};

export const fetchComputers = createAsyncThunk(
	'computers/fetchComputers',
	async (thunkAPI) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/computers/`, {next: { revalidate: 60 }, method: 'GET'}).then(
			(data) => data.json()
		)
		return res
	}
)

const computersSlice = createSlice({
	name: 'computers',
	initialState,
	reducers: {
		openCurrentRoom: (state, action) => {
			state.currentRoom = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchComputers.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchComputers.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.entities = payload;
			state.filtered = filterComputers(payload, state.currentRoom);
		})
		builder.addCase(fetchComputers.rejected, (state) => {
			state.loading = false
		})
	}
})

export const {openCurrentRoom} = computersSlice.actions
export default computersSlice.reducer