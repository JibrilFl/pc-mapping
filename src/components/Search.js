"use client"

import Image from "next/image";
import search from "@/../public/search.svg";

import style from "@/styles/rooms.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {roomSearch} from "@/lib/slices/roomsSlice";

const Search = () => {

	const dispatch = useDispatch();

	const value = useSelector(state => state.roomsSlice.roomSearch);

	function setValue(str) {
		dispatch(roomSearch(str))
	}

	return (
		<form className={style.rooms__search} action="#" onSubmit={(e) => e.preventDefault()}>
			<input
				className={style.rooms__search_input}
				type="text"
				placeholder="Поиск..."
				value={value}
				onChange={(e) => {
					setValue(e.target.value.toLowerCase())
				}}
			/>
			<button className={style.rooms__search_btn}><Image src={search} alt="search"/></button>
		</form>
	)
};

export default Search;