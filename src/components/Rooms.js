"use client"

import style from "@/styles/rooms.module.scss";
import {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRooms} from "@/lib/slices/roomsSlice";
import Search from "@/components/Search";
import Floors from "@/components/Floors";
import {selectRoom} from "@/lib/slices/buildingsSlice";
import {openCurrentRoom} from "@/lib/slices/computersSlice";
import SkeletonRooms from "@/components/skeletons/SkeletonRooms";
import RoomInput from "@/components/RoomInput";

export default function Rooms() {
	const dispatch = useDispatch();

	const [value, setValue] = useState('');
	const [count, setCount] = useState('All');
	const [currentRoom, setCurrentRoom] = useState();

	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch]);

	const dataRef = useRef(null);

	const data = useSelector(state => {
		const newData = state.roomsSlice.filtered;

		if (!dataRef.current || newData !== dataRef.current) {
			dataRef.current = newData;
		}

		return newData;
	})

	const loading = useSelector(state => state.roomsSlice.loading);

	function onOpenRoom(Id) {
		dispatch(openCurrentRoom(Id))
		dispatch(selectRoom(false))
	}

	function createElements(arr) {

		if (arr.length === 0) {
			return <h1 style={{color: '#ececec'}}>Комнат не найдено</h1>
		}

		return arr.map(({Id, Name, Comments}) => {
			return (
				<li className={currentRoom === Id ? style.rooms__item_active : style.rooms__item} key={Id} onClick={() => setCurrentRoom(Id)}>
					<p className={style.rooms__item_name} onClick={() => onOpenRoom(Id)}>{Name}</p>
					<RoomInput id={Id} Comments={Comments}/>
				</li>
			)
		});
	}

	const elements = useMemo(() => createElements(data || []), [data, currentRoom]);

	return (
		<div className={style.rooms}>
			<div className={style.rooms__inner}>
				<Floors setCount={setCount} count={count}/>
				<Search value={value} setValue={setValue}/>
			</div>
			<div className={style.rooms__wrapper}>
				{loading ? <SkeletonRooms/> : elements}
			</div>
		</div>
	)
};
