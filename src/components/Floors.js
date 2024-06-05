import style from "@/styles/rooms.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {floorFilter} from "@/lib/slices/roomsSlice";
import {createSelector} from "@reduxjs/toolkit";
import SkeletonFloors from "@/components/skeletons/SkeletonFloors";

const Floors = () => {
	const dispatch = useDispatch();
	const filter = useSelector(state => state.roomsSlice.roomFilter);
	const loading = useSelector(state => state.roomsSlice.loading);
	const building = useSelector(state => state.roomsSlice.currentBuilding);
	const rooms = useSelector(state => state.roomsSlice.entities);

	function filterFloor(build, rooms) {
		const floor = [];
		rooms.filter(({Floor, Id_Buildings}) => {
			if (!floor.includes(Floor) && Id_Buildings === build) {
				floor.push(String(Floor));
			}
		});
		floor.push('All');
		floor.sort();
		return floor;
	}

	const data =  filterFloor(building, rooms);

	function setFiler(floor) {
		dispatch(floorFilter(floor))
	}

	function createFloors(arr) {
		return arr.map((item, i) => {
			return (
				<button className={filter === item ? style.rooms__floor_active : style.rooms__floor} key={i} onClick={() => setFiler(String(item))}>{item !== 'All' ? item + 'F': item}</button>
			)
		})
	}

	const elements = createFloors(data);

	return (
		<>
			{loading ? <SkeletonFloors/> : (
				<div className={style.rooms__floors}>
					{elements}
				</div>
			)}
		</>
	)
};

export default Floors;