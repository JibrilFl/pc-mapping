import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
	loading: true,
	currentBuilding: 1,
	roomFilter: 'All',
	roomSearch: '',
	entities: [],
	filtered: []
}

const filterRooms = (entities, building, filter, roomSearch) => {
	return entities.filter(({Floor, Id_Buildings, Name}) => {

		if (!roomSearch.trim()) {
			return (filter === 'All' || Floor === +filter) && Id_Buildings === building;
		}

		return (filter === 'All' || Floor === +filter) && Name.toLowerCase().includes(roomSearch.toLowerCase()) && Id_Buildings === building;
	});
};

export const fetchRooms = createAsyncThunk(
	'rooms/fetchRooms',
	async (thunkAPI) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rooms/`, {next: { revalidate: 60 }, method: 'GET'}).then(
			(data) => data.json()
		)
		return res
	}
)

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		floorFilter: (state, action) => {
			state.roomFilter = action.payload;
			state.filtered = filterRooms(state.entities, state.currentBuilding, action.payload, state.roomSearch);
		},
		selectBuilding: (state, action) => {
			state.currentBuilding = action.payload;
			state.filtered = filterRooms(state.entities, action.payload, state.roomFilter, state.roomSearch);
		},
		roomSearch: (state, action) => {
			state.roomSearch = action.payload;
			state.filtered = filterRooms(state.entities, state.currentBuilding, state.roomFilter, state.roomSearch);
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchRooms.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchRooms.fulfilled, (state, {payload}) => {
			state.loading = false
			state.entities = payload;
			state.filtered = filterRooms(payload, state.currentBuilding, state.roomFilter, state.roomSearch);
		})
		builder.addCase(fetchRooms.rejected, (state) => {
			state.loading = false
		})
	}
})

export const {floorFilter, selectBuilding, roomSearch} = roomsSlice.actions
export default roomsSlice.reducer