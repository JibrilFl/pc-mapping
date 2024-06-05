"use client"

import Image from "next/image";
import style from "@/styles/btn.module.scss";

import blackBtn from "@/../public/back_btn-black.svg";
import lightBtn from "@/../public/back_btn-light.svg";
import {selectRoom} from "@/lib/slices/buildingsSlice";
import {useDispatch} from "react-redux";

const BackButton = ({action}) => {
	const dispatch = useDispatch();

	function back() {
		if (action === 'room') {
			dispatch(selectRoom(true));
		}
	}

	return (
		<button className={style.btn} onClick={() => back()}>
			<Image className={style.btn_imgBlack} src={blackBtn} alt="back_btn"/>
			<Image className={style.btn_imgLight} src={lightBtn} alt="back_btn"/>
		</button>
	)
};

export default BackButton;