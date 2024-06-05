"use client"

import style from "@/styles/buildings.module.scss";
import {useEffect, useMemo, useRef, useState} from "react";
import {fetchBuildings, selectRoom} from '@/lib/slices/buildingsSlice';
import {useDispatch, useSelector} from 'react-redux';
import Rooms from "@/components/Rooms";
import {selectBuilding} from "@/lib/slices/roomsSlice";
import Computers from "@/components/Computers";
import SkeletonHome from "@/components/skeletons/SkeletonHome";
import BuildingSubmit from "@/components/BuildingSubmit";

export default function Page() {

	const dispatch = useDispatch();

	const dataRef = useRef(null);
	const [curBuilding, setCurBuilding] = useState(1);

	const data = useSelector(state => {
		const newData = state.buildingsSlice.entities;
		if (!dataRef.current || newData !== dataRef.current) {
			dataRef.current = newData;
		}
		return newData;
	});

	const loading = useSelector(state => state.buildingsSlice.loading);
	let status = useSelector(state => state.buildingsSlice.roomOpen);

	useEffect(() => {
		dispatch(fetchBuildings());
	}, [dispatch]);

	function onSelectBuilding(id) {
		dispatch(selectBuilding(id));
		dispatch(selectRoom(true));
		setCurBuilding(id);
	}

	function createElements(arr) {
		return arr.map(({Id, Name, Location}) => {
			return <div className={curBuilding === Id ? style.buildings__item_active : style.buildings__item} key={Id} onClick={() => onSelectBuilding(Id)}>
				<p>{Name}</p>
				<BuildingSubmit id={Id} location={Location}/>
			</div>
		});
	}

	const elements = useMemo(() => createElements(data || []), [data, curBuilding]);

	return (
		<main className={style.maps}>
			<div className={style.buildings}>
				{loading ? <SkeletonHome/> : elements}
			</div>
			{status ? <Rooms/> : <Computers/>}
		</main>
	)
};