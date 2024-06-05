"use client"

import style from "@/styles/computers-room.module.scss";
import Image from "next/image";
import copy from "@/../public/copy.svg";
import {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchComputers} from "@/lib/slices/computersSlice";
import BackButton from "@/components/BackButton";
import SkeletonComputers from "@/components/skeletons/SkeletonComputers";
import Complete from "@/components/Complete";
import Input from "@/components/Input";

export default function Computers() {
	const dispatch = useDispatch();
	const [accept, setAccept] = useState(false);
	const [currentComputer, setCurrentComputer] = useState();

	useEffect(() => {
		dispatch(fetchComputers());
	}, [dispatch]);

	async function copyText(text) {
		if (accept) {
			return
		}

		try {
			await navigator.clipboard.writeText(text);
			setAccept(true);
			setTimeout(() => {
				setAccept(false);
			}, 600)
		} catch (err) {
			console.log(err);
		}
	}

	const dataRef = useRef(null);

	const data = useSelector(state => {
		const newData = state.computersSlice.filtered;

		if (!dataRef.current || newData !== dataRef.current) {
			dataRef.current = newData;
		}

		return newData;
	})

	const loading = useSelector(state => state.computersSlice.loading);

	function createElements(arr) {

		if (arr.length === 0) {
			return <h1 style={{color: '#ececec'}}>Тут пусто :(</h1>
		}

		return arr.map(({Id, Ip, OS, Comments}) => {

			OS = OS ? OS : 'Неизвестно';

			return (
				<div className={currentComputer !== Id ? style.room__computers_item : style.room__computers_item_active} key={Id} onClick={() => {setCurrentComputer(Id)}}>
					<p className={style.room__computers_ip}>{Ip}</p>
					<Image className={style.room__computers_copy} src={copy} alt="copy" onClick={() => copyText(String(Ip))}/>
					<p className={style.room__computers_os}>{OS}</p>
					<Input text={Comments} id={Id}/>
				</div>
			)
		})
	}

	const elements = useMemo(() => createElements(data || []), [data, currentComputer]);

	return (
		<div className={style.room}>
			<div className={style.room__inner}>
				<BackButton action={'room'}/>
				{accept ? <Complete/> : ''}
			</div>
			<div className={style.room__wrapper} style={{opacity: `${accept ? .3 : 1}`}}>
				{loading ? <SkeletonComputers/> : elements}
			</div>
		</div>
	)
};